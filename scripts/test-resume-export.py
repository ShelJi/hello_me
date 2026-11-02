"""Browser regression: run after resume:build with resume:serve on port 4173.
Requires playwright and pypdf; uses installed Microsoft Edge.
"""
import io
import re
from playwright.sync_api import sync_playwright
from pypdf import PdfReader

with sync_playwright() as pw:
    browser = pw.chromium.launch(channel="msedge", headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 720})
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.goto("http://127.0.0.1:4173/build-resume/#/dashboard")
    page.locator("button.resume-card").first.click()
    editor = page.get_by_role("textbox", name="Resume Markdown")
    editor.wait_for()
    page.evaluate("window.print = () => { window.exportCalled = true; }")

    cases = {
        "short": "# Short resume\n\nSingle page content.",
        "long": "# Long resume\n\n" + "\n\n".join(f"Item{i:03d} Experience and achievements in engineering." for i in range(120)),
        "oversized": "# Skills\n\n" + "\n".join(f"- Skill{i:03d} engineering experience" for i in range(120)),
        "page-breaks": '<div class="md-it-newpage extra"></div>\n\n# First page\n\nFirst content.\n\n<div class="md-it-newpage"></div>\n\n# Second page\n\nSecond content.\n\n<div class="md-it-newpage"></div>',
    }
    for name, markdown in cases.items():
        page.emulate_media(media="screen")
        editor.fill(markdown)
        # Export immediately: exercise the debounced preview flush.
        page.evaluate("window.exportCalled = false")
        page.get_by_role("button", name="Export PDF", exact=False).click()
        page.wait_for_function("window.exportCalled === true")
        assert not page.locator("[data-pagination-measure]").count()
        page.emulate_media(media="print")
        assert page.locator("#preview-pane").evaluate("e => getComputedStyle(e).overflow") == "visible"
        pdf_bytes = page.pdf(prefer_css_page_size=True, print_background=True)
        pdf = PdfReader(io.BytesIO(pdf_bytes))
        texts = [p.extract_text() for p in pdf.pages]
        assert all(text.strip() for text in texts), (name, "blank page", texts)
        text = "\n".join(texts)
        assert "Resume Markdown" not in text
        if name == "short": assert len(texts) == 1, len(texts)
        if name == "page-breaks": assert len(texts) == 2, len(texts)
        if name in ("long", "oversized"):
            prefix = "Item" if name == "long" else "Skill"
            missing = [i for i in range(120) if f"{prefix}{i:03d}" not in text]
            assert not missing, (name, missing)
        print(f"{name}: {len(texts)} PDF pages, no blank pages or missing content")
    # Printing must also escape the mobile splitter and screen zoom constraints.
    page.emulate_media(media="screen")
    page.get_by_role("button", name="Zoom in", exact=True).click()
    page.set_viewport_size({"width": 390, "height": 844})
    page.emulate_media(media="print")
    mobile = PdfReader(io.BytesIO(page.pdf(prefer_css_page_size=True)))
    assert len(mobile.pages) == 2
    assert all(p.extract_text().strip() for p in mobile.pages)
    print("Mobile viewport and zoom: same two complete PDF pages")
    assert not errors, errors
    browser.close()

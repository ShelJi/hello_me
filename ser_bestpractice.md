# Search and answer-engine best practices

## Scope and scoring

These changes address the supplied homepage report. The user-provided baseline was SEO 61, GEO 58, AEO 39 and AI View 80. No new Sage score has been measured. A 100% score is a target, not a verified result or a ranking guarantee. Other routes, hosting behavior and live performance require separate audits.

## Content and navigation used

- One H1 names Sheljin S.A and his IoT engineering focus. About, Projects, Experience, Tech Stack, FAQ and Contact use section headings.
- The introduction explains existing embedded, robotics and backend work in plain language. It links to relevant sections, the existing notes catalog and resume PDF.
- FAQs provide direct answers about work, projects and contact. Their text is present in HTML and matches the structured answers.
- Existing project interactions and work-history edits are preserved. Core introductory content remains readable without JavaScript.
- Icon links include visible destination labels. Image alternatives describe the linked destination, and the resume uses a single link instead of a button nested inside a link.

## Metadata and identity used

- A concise homepage description is shared across description, Open Graph, Twitter and structured data.
- The existing HTTPS canonical, English language declaration, descriptive title, social image, author and indexing directives remain in place.
- The schema graph connects the Person, WebSite and homepage through stable URL identifiers. The ProfilePage identifies the Person as its main entity. A separate FAQPage node identifies the questions in the FAQ section.
- A visible last-updated date, dateModified, og:updated_time and sitemap lastmod reflect this edit on 31 October 2026. An original datePublished is deliberately absent because the actual first public publication date is unverified. A Git commit date alone is not proof of publication.
- SpeakableSpecification points to the visible profile summary and first FAQ answer. Google's speakable feature has specific news and Assistant eligibility; this portfolio is not promised that feature. See [Google's speakable documentation](https://developers.google.com/search/docs/appearance/structured-data/speakable).
- FAQ markup describes the visible answers. Google Search retired FAQ rich results in May 2026. See [Google Search documentation updates](https://developers.google.com/search/updates).

## Media and performance used

- Initial profile icons load eagerly. Contact icons load lazily because they are below the initial viewport. All homepage images have alternative text, explicit dimensions and asynchronous decoding.
- The external GitHub calendar is replaced with a descriptive GitHub profile link. This removes its script, stylesheet, generated table and uncontrolled images rather than modifying remote third-party HTML after it appears.
- All executable homepage scripts use defer. GSAP plugins follow GSAP core; home.js follows those plugins; the game script follows its dependencies. JSON-LD is a data block and does not need defer.
- The former inline animation initializer lives in home.js so it executes after deferred libraries. Adding defer to an inline classic script would not solve dependency timing.
- Google Fonts use stylesheet links instead of CSS imports, preconnect to the font hosts and request swap rendering. Stylesheets can still block rendering; this does not claim a fully non-blocking page.
- See [MDN script loading behavior](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script) and [Google's lazy-loading guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/lazy-loading).

## Ongoing practices

1. Keep claims, role dates, project descriptions and schema synchronized. Add content because it answers a real question, not to reach a keyword density.
2. Update dateModified and sitemap lastmod only when meaningful content changes. Add datePublished only after verifying the original publication date.
3. Give each indexable page a distinct title, description, canonical and main heading. Review privacy and indexing intent before adding unrelated tools or personal routes to a sitemap.
4. Use real anchors for navigation and buttons for actions. Give all controls accessible names. Preserve keyboard access, readable contrast, mobile layouts and reduced-motion behavior.
5. Give genuine data tables captions and scoped header cells. Do not introduce tables or schema types solely to increase audit counts.
6. Keep image dimensions accurate, compress large imagery, use responsive sources where appropriate, and keep the main visible image eager. Measure layout shift and actual loading behavior.
7. Retain ordered deferred dependencies and pin third-party versions. Review external code availability and remove unused libraries only after checking all features that depend on them.
8. Ensure hosting returns successful page and asset responses, serves HTTPS consistently, redirects duplicate URLs to their canonical destination, and exposes robots.txt and sitemap.xml.
9. Validate JSON-LD against Schema.org and test supported search features with Google's Rich Results Test. Check deployed URLs in Search Console; request reindexing after deployment when appropriate.
10. Run mobile and desktop PageSpeed/Lighthouse checks and the original Sage audit on the deployed homepage. Investigate results individually, including external assets and network failures. Keep measured scores separate from implementation checks.
11. Do not add fictional Article, Organization or breadcrumb entities. Do not fabricate agent tools: the public portfolio currently offers content and links, not a workflow requiring WebMCP.

## Verification limits

Local static checks cover the main heading, description length, schema parsing and FAQ parity, media attributes, script deferral, local link targets and sitemap XML. JavaScript syntax checks cover the extracted initializer and existing project interaction. Deployment, live Sage scoring, search indexing, rich results and field performance are not established by those checks.

Run `python scripts/check-seo.py`, `node --check home.js`, `node --check projects.js` and `git diff --check` from the repository root. The completed static check reports 729 visible words, a 136-character description, nine labeled images, 32 links with readable text and 11 deferred executable scripts. The repeated contact line-break IDs were also converted to a shared class, with the initializer updated to match. Browser layout and interaction testing remain necessary before deployment.

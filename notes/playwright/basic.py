###################################################
"""
Open the give website in playwright headless browser
"""
# from playwright.sync_api import sync_playwright
# import time


# URL = "https://unsplash.com/s/photos/flower"

# playwright = sync_playwright().start()

# browser = playwright.firefox.launch(headless=False)

# page = browser.new_page(
#     java_script_enabled=True,
#     viewport={'width' : 600, 'height' : 400},
# )
# page.goto(URL, wait_until='load')

# time.sleep(10)

# page.close()
# browser.close()
# playwright.stop()
###################################################

"""
save the content in a html file
"""
from playwright.sync_api import sync_playwright
import time


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("https://unsplash.com/s/photos/flower")
    # print(page.content())
    
    time.sleep(10)
    
    with open("flowers.html", "w", encoding="utf-8") as f:
        f.write(page.content()) 
    
    browser.close()
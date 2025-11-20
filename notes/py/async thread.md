# Async Thread

```py
import time
import asyncio
import aiohttp

# ## Task 1

# ### Async HTTP client

# Your task in this Bite is to create an http client that will asynchronously send http requests and process responses.

# This Bite is focused on using asyncio, so you are expected to write async function.

# To demonstrate power of asynchronous requests you will have to implement function that is able to send 100 requests and get results in 0.5 seconds, despite the fact that each request will take around 0.1 second for the server to respond to!

# This is impossible without concurrent requests. (The test server is able to handle concurrent requests.)

# For a detailed task description read the docstrings of the function that you are supposed to implement: get_results_from_urls.

# Useful links

# - Python docs: asyncio — Asynchronous I/O
# - AIOHTTP docs
# - Async IO in Python: A Complete Walkthrough


async def fetch_datas(session, url):
    async with session.get(url) as response:
        return await response.text()


async def get_results(urls):
    async with aiohttp.ClientSession() as session:
        tasks = [asyncio.create_task(fetch_datas(session, url)) for url in urls]
        results = await asyncio.gather(*tasks)
    return results


async def main():
    urls = ["https://httpbin.org/delay/0.1"] * 100
    start = time.perf_counter() # Perfect counter
    results = await get_results(urls)
    end = time.perf_counter()
    # print(results)
    print(f"Fetched {len(results)} URLs in {end - start:.2f} seconds")

asyncio.run(main())
```

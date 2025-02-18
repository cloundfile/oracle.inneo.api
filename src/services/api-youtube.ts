import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { Request, Response } from 'express';

export class Video {
  async search(req: Request, res: Response): Promise<Response> {
    const query = req.query.search_query;
    const youtube= `https://www.youtube.com/results?search_query=${query}`;

    let browser;

    
    try {
      browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: true,
      });

      const page = await browser.newPage();
      await page.goto(youtube);

      const autoScroll = async () => {
        await page.evaluate(() => {
            return new Promise<void>((resolve) => {
                const distance = 200;
                let scrolledAmount = 0;
                const timer = setInterval(() => {
                    window.scrollBy(0, distance);
                    scrolledAmount += distance;
                    if (scrolledAmount >= document.body.scrollHeight) {
                        clearInterval(timer);
                        resolve();
                    }
                }, 5000);
            });
        });
    };


      const data = await page.evaluate(() => {
        const elements = document.querySelectorAll('.style-scope.ytd-item-section-renderer.style-scope.ytd-item-section-renderer a');
        const posts = Array.from(elements);

        return posts.map(item => {
          return {
            title:  item.querySelector("#title-wrapper h3 a yt-formatted-string")?.textContent || 'NULL',
            watch: "https://www.youtube.com" + item.getAttribute('href') || 'NULL',
            tumbnail: item.querySelector('ytd-thumbnail img')?.getAttribute("src") || 'NULL',
          };
        });
      });

      return res.json(data);
    } catch (error) {
      console.error('Error fetching YouTube data:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }
}

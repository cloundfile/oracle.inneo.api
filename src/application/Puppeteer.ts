import { Request, Response } from 'express';
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

export class Youtube {
    async search(req: Request, res: Response): Promise<Response> {
        const query = req.query.search_query;
        const youtube = `https://www.youtube.com/results?search_query=${query}`;
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

            const TIMEOUT = 30000; // Timeout in milliseconds (30 seconds)

            const timeoutPromise = new Promise<never>((_, reject) =>
                setTimeout(() => reject(new Error('Request timed out')), TIMEOUT)
            );
            
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
                    }, 100);
                });
            });


            const data = await page.evaluate(() => {
                const elements = document.querySelectorAll('.style-scope.ytd-item-section-renderer.style-scope.ytd-item-section-renderer a');
                const posts = Array.from(elements);

                return posts.map(item => {
                    return {
                        title: (item as HTMLElement).innerText ||  "Novo",
                        watch: "https://www.youtube.com" + item.getAttribute('href') || 'NULL',
                    };
                });
            });

            const response = data.filter((item, index) => item.watch  && item.watch.indexOf('https://www.youtube.com/shorts/') > -1);
            return res.json(response);
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

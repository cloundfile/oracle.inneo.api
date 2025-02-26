import { Request, Response } from 'express';
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

export class Prefeitura {
    async castramovel(req: Request, res: Response): Promise<Response> {
        const url = `https://pmp.pr.gov.br/website/views/castrometro.php`;
        let browser;

        try {
            browser = await puppeteer.launch({
                args: chromium.args,
                defaultViewport: chromium.defaultViewport,
                executablePath: await chromium.executablePath(),
                headless: true,
            });

            const page = await browser.newPage();
            await page.goto(url);

            const TIMEOUT = 30000;

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
                const elements = document.querySelectorAll('.card-body.center-covid-mobile');
                const posts = Array.from(elements);

                return posts.map(item => {
                    return {
                        dados: item.querySelector('a')?.innerText,
                    };
                });
            });

            const normalizado = normalizacao(data);
            return res.json(normalizado);
         
         
        } catch (error) {
            console.error('Internal Server Error:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            if (browser) {
                await browser.close();
            }
        }
    }
}

interface ResponseItem {
    description: string;
    procedures: number;
    date:  string;
    time:  string;
}

interface Item {
    dados: string | any;
}


function normalizacao(data: Item[]): ResponseItem[] {
    const response: ResponseItem[] = [];

    data.forEach(item => {
        try {
            if (!item.dados) return;
            
            const [dados, timestamp] = item.dados.split("\nATUALIZADO EM: ");
            const [date, time] = timestamp.split(' ');
            const [procedures, description] = dados.match(/\D+|\d+/g);
            response.push({ description: description.trim(), procedures: procedures, date: date, time: time });
        } catch (error) {
            console.error('Error during normalization:', error);
        }
    });

    return response;
}
  
  

/*
item.watch.indexOf('https://www.youtube.com/shorts/') > -1
*/

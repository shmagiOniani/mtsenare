import { Request, Response, Router } from 'express';
const axios = require('axios');
const cheerio = require('cheerio');

const blogsRouter = Router();

const articles = [];

blogsRouter.get('/',(req: Request, res: Response)=>{
    axios.get('https://www.theguardian.com/uk/environment')
        .then((response: any) => {
            const html = response.data;
            const $ = cheerio.load(html);

            // $('a:contains("climate")', html).each(function () {
            //     const title = $(this).text()
            //     const url = $(this).attr("href")
            //     articles.push({
            //         title,
            //         url
            //     })
            // })
            // res.json(articles)
        }).catch((err)=> console.log(err))
});

export default blogsRouter;

import HttpException from '../exceptions/HttpException';
import { Crawl } from '../interfaces/crawl.interface';
import crawlModel from '../models/crawl.model';
import { isEmpty } from '../utils/util';
import cheerio from 'cheerio';
import axios from 'axios';
import { CreateCrawlDto } from '../dtos/crawl.dto';

class CrawlService {
  public crawlData = crawlModel;
  public url = 'https://adconnector.com/';

  public async getAllWebsiteDataService(): Promise<Crawl[]> {
    const crawlData: Crawl[] = await this.crawlData.find();
    return crawlData;
  }

  public async createWebsiteDataService(): Promise<Crawl> {
    try {
      // Check data is available or not 
      const crawlData: Crawl[] = await this.crawlData.find();
      if (crawlData.length > 0) {
        throw new HttpException(204, 'Data alreay created.');
      }
      // make http call to url
      let crawlDatas: any = await axios(this.url);
      let head: String[] = [];
      let footer: Array<string> = [];

      const $ = cheerio.load(crawlDatas.data);
      const title = $('title').text();
      const description = $('meta[name="description"]').attr('content');
      const heading = $('h2, h3, h4, h5, h6');

      heading.each(function () {
        if ($(this).text() !== '') {
          head.push($(this).text());
        }
      });

      $('#text-5 .textwidget p a').each(function () {
        footer.push($(this).attr('href'));
      });

      let body: CreateCrawlDto = {
        url: this.url,
        title: title,
        description: description,
        headings: head,
      };

      if (isEmpty(body)) throw new HttpException(204, 'Not able to get data.');
      const createData: Crawl = await this.crawlData.create({ ...body });
      //get data of other pages.
      this.createFooterData(footer);
      return createData;
    } catch (err) {
      //need to handle error here.
      console.log(err);
    }
  }

  public async createFooterData(urls: Array<string>) {
    try {
      // make http call to url
      return urls.map(async url => {
        let crawlDatas: any = await axios(url);
        let head: Array<String> = [];

        const $ = cheerio.load(crawlDatas.data);
        const title = $('title').text();
        const description = $('meta[name="description"]').attr('content');
        const heading = $('h1, h2, h3, h4, h5, h6');

        heading.each(function () {
          if ($(this).text() !== '') {
            head.push($(this).text());
          }
        });

        let body: CreateCrawlDto = {
          url: url,
          title: title,
          description: description,
          headings: head,
        };

        if (isEmpty(body)) throw new HttpException(204, 'Not able to get data.');
        const createData: Crawl = await this.crawlData.create({ ...body });
        return createData;
      });
    } catch (err) {
      //need to handle error here.
      console.log(err);
    }
  }
}

export default CrawlService;

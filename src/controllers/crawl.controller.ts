import { NextFunction, Request, Response } from 'express';
import { Crawl } from '../interfaces/crawl.interface';
import CrawlService from '../services/crawl.service';

class CrawlController {
  public crawlService = new CrawlService();

  public getAllWebsiteData = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const findAllData: Crawl[] = await this.crawlService.getAllWebsiteDataService();
      response.status(200).json({ data: findAllData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public createWebsiteData = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const createData: Crawl = await this.crawlService.createWebsiteDataService();
      response.status(201).json({ data: createData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}

export default CrawlController;

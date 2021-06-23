import { Router } from 'express';
import CrawlController from '../controllers/crawl.controller';
import Route from '../interfaces/routes.interface';

class CrawlRoute implements Route {
  public router = Router();
  public crawlController = new CrawlController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/crawl', this.crawlController.getAllWebsiteData);
    this.router.post('/crawl', this.crawlController.createWebsiteData);
  }
}

export default CrawlRoute;

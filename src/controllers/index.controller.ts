import { NextFunction, Request, Response } from 'express';
import IndexRoute from '../routes/index.route';
import CrawlRoute from '../routes/crawl.routes';

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };

  /**
   * initializeAllRoutes
   */
  public initializeAllRoutes() {
    return [new IndexRoute(), new CrawlRoute()];
  }
}

export default IndexController;

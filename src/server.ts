import 'dotenv/config';
import App from './app';
import IndexController from './controllers/index.controller';
import validateEnv from './utils/validateEnv';

validateEnv();
const indexController = new IndexController()
const app = new App(indexController.initializeAllRoutes());

app.listen();

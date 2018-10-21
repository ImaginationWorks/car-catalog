import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import Loadable from 'react-loadable';
import cookieParser from 'cookie-parser';

import loader from './loader';
import apiRoutes from './apis/routes';
import winston from './config/winston';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('combined', { stream: winston.stream }));

// Handle all data apis.
app.use('/api/', apiRoutes);

// Set up homepage, static assets, and capture everything else
app.use(express.Router().get('/', loader));
app.use(express.static(path.resolve(__dirname, '../build')));
app.use(loader);


Loadable.preloadAll().then(() => {
  app.listen(PORT, () => {
    winston.info(`App listening on port ${PORT}`);
  });
});


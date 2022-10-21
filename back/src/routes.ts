import express from 'express';
import { Express, Response, Request, NextFunction } from 'express';
import path from 'path';
import config from './config/environment';
import logger from './helpers/logger';
import * as auth from './auth';
import * as locator from './helpers/locator';
import { AppError } from './errors';

import fileRouter from './api/files';
import userRouter from './api/users';
import blogsRouter from './api/blogs';
import metaRouter from './api/metas';
import appLogsRouter from './api/appLogs';

import { getMetaTags } from './helpers/metaTagsHelper';
import commonsRouter from './api/commons';
import categoryRouter from './api/categories';
import deliveryRouter from './api/delivery';
import productRouter from './api/products';
import reviewRouter from './api/reviews';
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const router = require('express').Router();

export function initRoutes(app: Express) {
  app.use(express.static(path.join(config.paths.uploads)));

  app.get('/admin', renderAdminHtml);
  app.get('/', renderClientHtml);

  app.use(auth.setUser);
  app.use(locator.setLocation);
  
  router.use('/api-docs', swaggerUi.serve);
  router.get('/api-docs', swaggerUi.setup(swaggerDocument));
  console.log("in route");
  app.use('/api/blogs', blogsRouter);
  app.use('/api/users', userRouter);
  app.use('/api/files', fileRouter);
  app.use('/api/metas', metaRouter);
  app.use('/api/appLogs', appLogsRouter);
  app.use('/api/commons', commonsRouter);
  app.use('/api/products', productRouter);
  app.use('/api/reviews', reviewRouter);
  app.use('/api/delivery', deliveryRouter);
  app.use('/api/categories', categoryRouter);

  app.get('/admin/*', renderAdminHtml);
  app.get('/*', renderClientHtml);
  
  app.use(handleError);
}

function renderClientHtml(req: Request, res: Response) {
  res.render(path.join(config.root, '../front/public/index.html'));
}

function renderAdminHtml(req: Request, res: Response) {
  console.log("admin");
  
  res.render(path.join(config.root, '../admin/public/index.html'));
}

async function setMetaTags(req: any, res: Response, next: NextFunction) {
  try {
    const { originalUrl: url } = req;
    req.metaTags = await getMetaTags(url);
    next();
  } catch (e) {
    next(e);
  }
}

function handleError(err: Error, req: Request, res: Response, next: NextFunction) {
  try {
    const status = Object(err).httpStatusCode || 500;
    const data = Object(err).data;
    if (data) {
      res.json(data);
    } else {
      res.sendStatus(status);
    }
    if (err instanceof AppError) {
      logger.error(err.message);
    } else {
      logger.error(err);
    }
  } catch (error) {
    logger.error(error);
  }
}

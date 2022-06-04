import { Router, Request, Response, NextFunction } from 'express';
import * as reviewDao from './review.dao';
import * as reviewParser  from './review.parser';
import * as auth from '../../auth';
import * as _ from 'lodash';


const reviewRouter = Router();

reviewRouter.get('/', reviewParser.parseGetByQuery, getByQuery);
reviewRouter.get('/avarage', reviewParser.parseGetByQuery, getAavarageByProduct);
reviewRouter.post('/', auth.isAdmin, reviewParser.parseCreate, create);
reviewRouter.put('/:id', auth.isAdmin, reviewParser.parseUpdate, update);
reviewRouter.delete('/:id', auth.isAdmin, destroy);

export default reviewRouter;

// =============== GET ===============

async function getByQuery(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.query;
    const reviewData = await reviewDao.getByQuery(query);
    res.json(reviewData);
  } catch (e) {
    next(e);
  }
}

async function getAavarageByProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.query;
    const reviewData = await reviewDao.getByQuery(query);
    const sumData = _.reduce(reviewData.items, (prev: any, next: any) => {prev.score + next.score}, 0);
    const avarage = Math.round(sumData / reviewData.numTotal);
    res.json(avarage);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await reviewDao.create({
      ...payload,
      user: req.user._id,
      date: new Date(),
    });
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const payload = req.body;
    await reviewDao.update(id, payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await reviewDao.destroy(id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}
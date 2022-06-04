import { Router, Request, Response, NextFunction } from 'express';
import * as deliveryDao from './delivery.dao';
import * as deliveryParser  from './delivery.parser';
import * as auth from '../../auth';


const deliveryRouter = Router();

deliveryRouter.get('/', deliveryParser.parseGetByQuery, getByQuery);
deliveryRouter.post('/', auth.isAdmin, deliveryParser.parseCreate, create);
deliveryRouter.put('/:id', auth.isAdmin, deliveryParser.parseUpdate, update);
deliveryRouter.delete('/:id', auth.isAdmin, destroy);

export default deliveryRouter;

// =============== GET ===============

async function getByQuery(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.query;
    const categoriessData = await deliveryDao.getByQuery(query);
    res.json(categoriessData);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await deliveryDao.create(payload);
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const payload = req.body;
    await deliveryDao.update(id, payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await deliveryDao.destroy(id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}
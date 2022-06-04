import { Router, Request, Response, NextFunction } from 'express';
import * as categoryDao from './category.dao';
import * as categoryParser  from './category.parser';
import * as auth from '../../auth';


const categoryRouter = Router();

categoryRouter.get('/', categoryParser.parseGetByQuery, getByQuery);
categoryRouter.post('/', auth.isAdmin, categoryParser.parseCreate, create);
categoryRouter.put('/:id', auth.isAdmin, categoryParser.parseUpdate, update);
categoryRouter.delete('/:id', auth.isAdmin, destroy);

export default categoryRouter;

// =============== GET ===============

async function getByQuery(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.query;
    const categoriessData = await categoryDao.getByQuery(query);
    res.json(categoriessData);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await categoryDao.create(payload);
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const payload = req.body;
    await categoryDao.update(id, payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await categoryDao.destroy(id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}
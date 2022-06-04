import { Router, Request, Response, NextFunction } from 'express';
import * as commonDao from './common.dao';
import * as commonParser  from './common.parser';
import * as auth from '../../auth';

const commonRouter = Router();

commonRouter.get('/one', getOne);
commonRouter.put('/one', auth.isAdmin, commonParser.parseUpdate, update);


export default commonRouter;

// =============== GET ===============

async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await commonDao.getOne();
    res.json(data);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await commonDao.update(payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}
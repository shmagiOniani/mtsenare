import { Router, Request, Response, NextFunction } from 'express';
import * as librariesDao from './libraries.dao';
import * as librariesParser  from './libraries.parser';
import * as auth from '../../auth';


const librariesRouter = Router();

librariesRouter.get('/', librariesParser.parseGetByQuery, getByQuery);
librariesRouter.post('/',test, librariesParser.parseCreate, create);

librariesRouter.put('/:category',  librariesParser.parseUpdate, update);
librariesRouter.delete('/:id',  destroy);

function test(req: Request, res: Response, next: NextFunction) {
  console.log("test",req.body);
  next()
  
}
export default librariesRouter;

// =============== GET ===============

async function getByQuery(req: Request, res: Response, next: NextFunction) {
  
  try {
    const query = req.query;
    const librariessData = await librariesDao.getByQuery(query);
    res.json(librariessData);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

async function create(req: Request, res: Response, next: NextFunction) {
  console.log("libraries", req.body);
  try {
    const payload = req.body;
    // console.log(req.body);
    
    await librariesDao.create({
      ...payload,
      // author: req.user._id,
      createdAt: new Date(),
    });
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  
  try {
    const { category } = req.params;
    const payload = req.body;
    await librariesDao.update(category, payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await librariesDao.destroy(id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}
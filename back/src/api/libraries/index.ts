import { Router, Request, Response, NextFunction } from 'express';
import * as librariesDao from './libraries.dao';
import * as librariesParser  from './libraries.parser';
import * as auth from '../../auth';


const librariesRouter = Router();

librariesRouter.get('/', librariesParser.parseGetByQuery, getByQuery);
librariesRouter.post('/',test, librariesParser.parseCreate, create);

librariesRouter.put('/:id/add-sublibrary',  librariesParser.parseUpdate, addSubLibrary);
librariesRouter.delete('/:id/sublibrary/:subId',  librariesParser.parseUpdate, destroySubLibrary);
librariesRouter.put('/:id',  librariesParser.parseUpdate, update);
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

// =============== PUT ===============

async function addSubLibrary(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const payload = req.body;
    const libraryInst  = await librariesDao.getById(id);
    
    let exists = libraryInst.library.find((i)=> i.name === payload.name);
    if(!exists) {
      libraryInst.library.push(payload);
      await librariesDao.update(id, libraryInst);
      res.sendStatus(200);
    }else {
      res.status(400).json({errorMessage: "sublibrary with same name already exists!"});
    }
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const payload = req.body;
    await librariesDao.update(id, payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

// =============== DELETE ===============

async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await librariesDao.destroy(id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function destroySubLibrary(req: Request, res: Response, next: NextFunction) {
  try {
    const { id, subId } = req.params;
    let libraryInst  = await librariesDao.getById(id);
    
    libraryInst.library.filter((item: any) => item._id !== subId);
    console.log("libraryInst",libraryInst);
    
    await librariesDao.update(id, libraryInst);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}
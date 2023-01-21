import { Router, Request, Response, NextFunction } from 'express';
import * as productDao from './product.dao';
import * as productParser  from './product.parser';
import * as auth from '../../auth';
import { next } from 'cheerio/lib/api/traversing';


const productRouter = Router();

productRouter.get('/', productParser.parseGetByQuery, getByQuery);
productRouter.post('/', productParser.parseCreate, create);

productRouter.put('/:id',  productParser.parseUpdate, update);
productRouter.delete('/:id',  destroy);
// productRouter.get('/', productParser.parseGetByQuery, getByQuery);
// productRouter.post('/', auth.isAdmin, productParser.parseCreate, create);
// productRouter.put('/:id', auth.isAdmin, productParser.parseUpdate, update);
// productRouter.delete('/:id', auth.isAdmin, destroy);

export default productRouter;

// =============== GET ===============

async function getByQuery(req: Request, res: Response, next: NextFunction) {
  
  try {
    const query = req.query;
    const productsData = await productDao.getByQuery(query);
    res.json(productsData);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

async function create(req: Request, res: Response, next: NextFunction) {
  // console.log("product", req.body);
  try {
    const payload = req.body;
    // console.log(req.body);
    
    await productDao.create({
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
    const { id } = req.params;
    const payload = req.body;
    await productDao.update(id, payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    console.log("delete", id);
    
    await productDao.destroy(id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}
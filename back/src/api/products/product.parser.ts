import * as _ from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { parseOffsetAndLimit } from '../../helpers/parser-utils';

// =============== GET ===============

export function parseGetByQuery(req: Request, res: Response, next: NextFunction) {
  const { query } = req;
  req.query = {
    ...parseOffsetAndLimit(query),
    find: {
      ...parseId(query),
      ...parseAuthor(query),
      ...parseCategory(query),
      ...parsePriceRange(query),
    },
    ...parseSearch(query),
  };
  next();
}

function parseId({ _id }: { _id?: any }) {
  return _id ? { _id } : {};
}

function parseAuthor({ author }: { author?: any }) {
  return author ? { author } : {};
}

function parseCategory({ category }: { category?: any }) {
  return category ? { category } : {};
}

function parsePriceRange({ priceFrom, priceTo }: { priceFrom?: any, priceTo?: any }) {
  if (!priceFrom && !priceTo) return {};

  const q: any = { price: {} };

  priceFrom && (q.price.$gte = priceFrom);
  priceTo && (q.price.$lte = priceTo);

  return q;
}

function parseSearch({ keyword }: { keyword?: string }) {
  return keyword ? {
    or: [
      { 'name.ge': { $regex: keyword, $options: 'i' } },
      { 'name.en': { $regex: keyword, $options: 'i' } },
      { 'description.ge': { $regex: keyword, $options: 'i' } },
      { 'description.en': { $regex: keyword, $options: 'i' } },
    ],
  } : {};
}

// =============== POST ===============

export function parseCreate(req: Request, res: Response, next: NextFunction) {
  req.body = parseBaseProps(req.body);
    next();
}

export function parseUpdate(req: Request, res: Response, next: NextFunction) {
  req.body = parseBaseProps(req.body);
  next();
}

function parseBaseProps(body: any) {
  return _.pick(body, [
    'name',
    'description',
    'price',
    'deliveryTime',
    'deliveryType',
    'quantity',
    'images',
    'isActive',
  ]);
}
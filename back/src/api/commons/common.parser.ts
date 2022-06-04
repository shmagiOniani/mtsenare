import * as _ from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { parseOffsetAndLimit } from '../../helpers/parser-utils';

// =============== GET ===============

export function parseGetByQuery(req: Request, res: Response, next: NextFunction) {
  const { query } = req;
  // @ts-ignore
  req.query = {
    // @ts-ignore
    ...parseOffsetAndLimit(query),
    find: {
      // @ts-ignore
      ...parseId(query),
    },
    // @ts-ignore
    ...parseSearch(query),
  };
  next();
}

function parseId({ _id }: { _id: any }) {
  return _id ? { _id } : {};
}

function parseSearch({ keyword }: { keyword: string }) {
  return keyword ? {
    or: [
      { hostFee: { $regex: keyword, $options: 'i' } },
    ],
  } : {};
}

export function parseSendEmail(req: Request, res: Response, next: NextFunction) {
  req.body = _.pick(req.body, ['name', 'email', 'message']);
  next();
}

// =============== POST ===============

export function parseCreate(req: Request, res: Response, next: NextFunction) {
  req.body = parseBaseProps(req.body),
    next();
}

export function parseUpdate(req: Request, res: Response, next: NextFunction) {
  req.body = parseCommon(req.body);
  next();
}

function parseBaseProps(body: any) {
  return _.pick(body, [
    'statusReceiversEmails',
  ]);
}

function parseCommon(body: any) {
  const parsedBody: any = {};
  if (body.statusReceiversEmails) parsedBody.statusReceiversEmails = body.statusReceiversEmails;

  return parsedBody;
}
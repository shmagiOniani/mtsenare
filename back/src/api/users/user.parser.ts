import * as _ from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { parseOffsetAndLimit } from '../../helpers/parser-utils';
import { roles } from '../../constants/user';

export function parseGetByQuery(req: Request, res: Response, next: NextFunction) {
  const { query } = req;
  console.log("req.query", query);

  // @ts-ignore
  req.query = {
    // @ts-ignore
    ...parseOffsetAndLimit(query),
    find: {
      ...parseRole(query),
    },
  };
  next();
}

function parseRole({ role }: { role?: any }) {
  return role ? { role } : {};
}

export function parseSignIn(req: Request, res: Response, next: NextFunction) {
  req.body = _.pick(req.body, ['email', 'password']);
  next();
}

export function parseSignUp(req: Request, res: Response, next: NextFunction) {
  console.log("parseSignUp", req.body);
  
  req.body = {
    ...parseBaseProps(req.body),
    password: req.body.password
  };
  next();
}

export function parseForgotPassword(req: Request, res: Response, next: NextFunction) {
  req.body = _.pick(req.body, ['email']);
  next();
}

export function parseResetPassword(req: Request, res: Response, next: NextFunction) {
  req.body = _.pick(req.body, ['newPassword', 'confirmPassword', 'email', 'token']);
  next();
}

export function parseUpdate(req: Request, res: Response, next: NextFunction) {
  req.body = parseBaseProps(req.body);
  next();
}

export function parseUpdatePassword(req: Request, res: Response, next: NextFunction) {
  req.body = _.pick(req.body, ['currentPassword', 'newPassword']);
  next();
}

export function parseUpdatePositions(req: Request, res: Response, next: NextFunction) {
  req.body = Object.assign(
    { items: req.body.items }
  );
  next();
}

function parseBaseProps(body: any) {
  return _.pick(body, [
    'email',
    'firstName',
    'lastName',
    'phoneNumber',
    // 'userName',
    // 'role',
    // 'isActive',
    // 'address',
  ]);
}

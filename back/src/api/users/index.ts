import { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import * as User from './user.dao';
import * as parser from './user.parser';
import * as validator from './user.validator';
import config from '../../config/environment';
import { roles } from '../../constants/user';
import * as auth from '../../auth';
import { dot } from 'dot-object';
import * as _ from 'lodash';


const usersRouter = Router();

usersRouter.get('/me', getMe);
usersRouter.get('/', parser.parseGetByQuery, getByQuery);

usersRouter.get('/email/:email/validate', validator.validateUniqueEmail, sendOk);
usersRouter.post('/sign-in', parser.parseSignIn, setSignedUser, signIn);
usersRouter.post('/sign-up', parser.parseSignUp, validator.validateSignUp, signUp);
usersRouter.put('/positions', auth.isAdmin, parser.parseUpdatePositions, updatePositions);
usersRouter.put('/:id', auth.isAdmin, parser.parseUpdate, update);
usersRouter.put('/:id', auth.isAdmin, update);
usersRouter.delete('/:id', auth.isAdmin, destroy);

export default usersRouter;


// =============== GET ===============

function sendOk(req: Request, res: Response) {
  res.json({});
}

function getMe(req: Request, res: Response) {
  res.json(req.user);
}

async function getByQuery(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.query;
    const usersData = await User.getByQuery(query);
    res.json(usersData);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

async function setSignedUser(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.body.email) {
      req.body.email = req.body.email.toLowerCase();
      req.user = await User.getByEmail(req.body.email);
    }
    next();
  } catch (e) {
    next(e);
  }
}

function signIn(req: Request, res: Response, next: NextFunction) {
  const user = req.user;
  if (!user.isActive) {
    res.json({authError: 'UserDeactivated'});
  } else if (user.isBlocked) {
    res.json({authError: 'UserBlocked'});
  } else {
    const token = auth.signToken(user);
    res.cookie('token', token, config.cookie);
    res.json({user, token});
  }
}

async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await User.create({
      ...payload,
      role: payload.role || roles.USER,
      joinedAt: Date.now(),
    });
    res.json({});
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const _id = req.params.id;
    const data = dot( req.body );
    await User.update(_id, data);
    const user = await User.getById(_id);
    res.json(user);
  } catch (e) {
    next(e);
  }
}


async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await User.destroy(id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function updatePositions(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await payload.items.map((item: any) => {
      User.update(item._id, { position: item.position });
    });
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}
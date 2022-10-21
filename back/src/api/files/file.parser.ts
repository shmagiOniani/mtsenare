import { Request, Response, NextFunction } from 'express';
import { parseArray } from '../../helpers/parser-utils';

export function parseCreateAndDestroy(req: Request, res: Response, next: NextFunction) {
  console.log("file", req.body);
  
  req.body = {
    fileNamesToDestroy: parseArray(req.body.fileNamesToDestroy),
    imageHeight: req.body.imageHeight,
    imageWidth: req.body.imageWidth,
  };
  next();
}

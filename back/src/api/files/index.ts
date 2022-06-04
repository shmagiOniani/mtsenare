import { Router, Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import sharp from 'sharp';
import { imageSize } from 'image-size';
import config from '../../config/environment';
import * as fileParser  from './file.parser';
import * as multerConfig from '../../config/multer';
import { imageConfig } from '../../constants/common';


const upload = multer(multerConfig);

const fileRouter = Router();

fileRouter.post('/', upload.array('filesToAdd', 20), fileParser.parseCreateAndDestroy, destroy, resizeAndCompressImage);

fileRouter.post('/editor', upload.single('upload'), returnEditorFile);

export default fileRouter;

function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const {fileNamesToDestroy} = req.body;
    for (const filename of fileNamesToDestroy) {
      const filepath = path.join(config.paths.uploads, filename || '');
      fs.unlink(filepath, () => {});
    }

    next();
  } catch (e) {
    next(e);
  }
}

function returnEditorFile(req: Request, res: Response, next: NextFunction) {
  try {
    res.json({
      'uploaded': 1,
      'fileName': req.file.filename,
      'url': config.resourceUrl + '/' + req.file.filename,
    });
  } catch (e) {
    next(e);
  }
}

async function resizeAndCompressImage(req: Request, res: Response, next: NextFunction) {
  try {
    const files: any = req.files;
    const { imageHeight, imageWidth } = req.body;

    if (!imageHeight && !imageWidth) {
      res.sendStatus(200);
      return;
    }

    const fileNames = [];
    for (const file of files) {
      const splitFilename = file.originalname.split('.');
      const extension = splitFilename[splitFilename.length - 1];
      const fileName = file.originalname.split(`.${extension}`);
      const filePath = getLocalFilePath(file.originalname);
      const {width, height} = imageSize(filePath);
      const factor = Math.max(Math.min(width / (Number(imageHeight) || imageConfig.desiredPrintWidth), height / (Number(imageWidth) || imageConfig.desiredPrintHeight)), 1);
      const finalWidth = Math.round(width / factor);
      const finalHeight = Math.round(height / factor);
      const resizedFilePath = getLocalFilePath(fileName[0] + '-resized.jpeg');
      await sharp(filePath).rotate().resize(finalWidth, finalHeight).toFile(resizedFilePath);
      fileNames.push({
        url: fileName[0] + '-resized.jpeg',
        originalUrl: file.originalname,
      });
    }
    res.json(fileNames);
  } catch (e) {
    const files: any = req.files;
    const fileNames = [
      {
        url: files[0].originalname,
        originalUrl: files[0].originalname,
      }
    ];
    res.json(fileNames);
    next(e);
  }
}

function getLocalFilePath(fileName: any) {
  return path.join(config.paths.uploads, fileName);
}
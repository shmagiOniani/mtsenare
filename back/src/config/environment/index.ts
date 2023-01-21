import moment from 'moment';
import * as path from 'path';
import devConfig from './development';
import prodConfig from './production';

const dataRoot = path.join(process.env.HOME, 'Shmagi/doc/mtsenare/.plant-data');

const date = new Date();
console.log("date", moment(date).format( "DD-MM-YYYY"));



const config: any = {
  env: process.env.NODE_ENV || 'development',

  root: path.normalize(path.join(__dirname, '/../')),



  paths: {
    root: dataRoot,
    log: path.join(dataRoot, 'logs'),
    uploads: path.join(dataRoot, 'uploads'),
  },

  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  },

  jwt: {
    secret: '7b7dc72d-7c93-4772-90ed-f2dd65f123ef',
    expiresIn: 30 * 24 * 60 * 60, // 30 days
  },

  company: {
    email: {
      service: 'gmail',
      user: '',
      password: ''
    },
  },

};


export default {
  ...config,
  ...(config.env === 'development' ? devConfig : prodConfig)
};

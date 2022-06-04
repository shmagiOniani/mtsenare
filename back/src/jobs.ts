import { CronJob } from 'cron';
import logger from './helpers/logger';

import { modules } from './constants/appLog';

let cronJob: CronJob = undefined;

export function initJobs() {
  try {
    cronJob = new CronJob('0 9 * * *', async function() {
    });
  } catch (error) {
    logger.error('Jobs: initJobs error', { error, module: modules.JOBS });
  }
}

export function startJobs() {
  setTimeout(() => {
    try {
      cronJob.start();
    } catch (error) {
      logger.error('Jobs: startJobs error', { error, module: modules.JOBS });
    }
  }, 3000);
}

export function stopJobs() {
  try {
    cronJob.stop();
  } catch (error) {
    logger.error('Jobs: stopJobs error', { error, module: modules.JOBS });
  }
}


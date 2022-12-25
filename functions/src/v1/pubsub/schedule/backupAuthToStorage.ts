import * as fs from 'fs';
import functions from '../../../utils/firebase/baseFunction';
import { logger } from '../../../utils/firebase/logger';
import { storage } from '../../../utils/firebase';

const firebaseTools = require('firebase-tools');

export const backupAuthToStorage = () =>
  functions()
    .runWith({ memory: '1GB' })
    .pubsub.schedule('0 3 * * *')
    .timeZone('Asia/Tokyo')
    .onRun(async (context) => {
      logger.debug(context);
      try {
        const projectID =
          process.env.GCLOUD_PROJECT || process.env.GCLOUD_PROJECT;
        if (!projectID) {
          throw Error('No project ID found');
        }

        const bucketName = `gs://${projectID}-auth-backups`;

        logger.debug(`Backing up ${projectID} auth to ${bucketName}`);

        const now = new Date();
        const timestamp =
          now.getFullYear() +
          ('0' + (now.getMonth() + 1)).slice(-2) +
          ('0' + now.getDate()).slice(-2) +
          '-' +
          ('0' + now.getHours()).slice(-2) +
          ('0' + now.getMinutes()).slice(-2) +
          ('0' + now.getSeconds()).slice(-2);
        logger.debug('timestamp', { timestamp });

        const tmpDir = '/tmp';
        const plainCsvFileName = `auth-backup-${timestamp}.csv`;
        logger.debug('plainCsvFileName', { plainCsvFileName });
        const plainCsvFilePath = `${tmpDir}/${plainCsvFileName}`;
        logger.debug('plainCsvFilePath', { plainCsvFilePath });

        logger.debug(`Downloading auth backup to ${plainCsvFilePath}...`);
        await firebaseTools.auth.export(plainCsvFilePath, {
          project: projectID,
        });
        logger.debug('Download complete');

        logger.debug(`Uploading ${plainCsvFilePath} to ${bucketName}...`);
        const bucket = storage.bucket(bucketName);
        const destination = `${now.getFullYear()}/${(
          '0' +
          (now.getMonth() + 1)
        ).slice(-2)}/${plainCsvFileName}`;
        await bucket.upload(plainCsvFilePath, { destination });
        logger.debug('Upload complete');

        logger.debug(`Deleting ${plainCsvFilePath}...`);
        fs.unlinkSync(plainCsvFilePath);
        logger.debug('Delete complete');

        logger.debug('Backup operation complete');
      } catch (err) {
        logger.warn('Backup operation failed', { err });
      }
    });

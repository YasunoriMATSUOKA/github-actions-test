import functions from '../../../utils/firebase/baseFunction';
import { logger } from '../../../utils/firebase/logger';
import { FirestoreAdminClient } from '../../../utils/firebase';

const firestoreAdminClient = new FirestoreAdminClient();

export const backupFirestoreToStorage = () =>
  functions()
    .runWith({ memory: '1GB', timeoutSeconds: 120 })
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
        const bucketName = `gs://${projectID}-firestore-backups`;
        const databaseName = firestoreAdminClient.databasePath(
          projectID,
          '(default)'
        );
        logger.debug(`Backing up ${databaseName} to ${bucketName}`);
        const response = await firestoreAdminClient.exportDocuments({
          name: databaseName,
          outputUriPrefix: bucketName,
          collectionIds: [],
        });
        logger.debug('Backup operation complete', { response });
      } catch (err) {
        logger.warn('Backup operation failed', { err });
      }
    });

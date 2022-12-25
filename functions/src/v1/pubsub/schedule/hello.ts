import { logger } from '../../../utils/firebase/logger';
import functions from '../../../utils/firebase/baseFunction';

export const hello = () =>
  functions()
    .runWith({ memory: '1GB' })
    .pubsub.schedule('0 3 * * *')
    .timeZone('Asia/Tokyo')
    .onRun((context) => {
      logger.debug(context);
      logger.debug('Hello logs from pubsub schedule!');
    });

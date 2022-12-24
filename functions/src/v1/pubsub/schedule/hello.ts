import { logger } from '../../../utils/firebase/logger';
import functions from '../../../utils/firebase/baseFunction';

export const hello = () =>
  functions()
    .pubsub.schedule('0 3 * * *')
    .onRun(async (context) => {
      logger.debug({ context });
      logger.debug('Hello logs from pubsub schedule!');
    });

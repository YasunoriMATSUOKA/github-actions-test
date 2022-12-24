import baseFunctions from '../../../utils/firebase/baseFunction';
import { logger } from '../../../utils/firebase/logger';

export const hello = () =>
  baseFunctions().https.onRequest((request, response) => {
    logger.debug('request', request);
    logger.debug('response', response);
    const responseText = 'Hello from Firebase functions https onRequest!';
    logger.debug('responseText', { responseText });
    response.send(responseText);
  });

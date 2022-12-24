import functions from '../../utils/firebase/baseFunction';
import { triggerOnce } from '../../utils/firebase/hasAlreadyTriggered';
import { logger } from '../../utils/firebase/logger';

export const onFinalize = () =>
  functions()
    .storage.object()
    .onFinalize(
      triggerOnce('v1-storage-onFinalize', async (object, context) => {
        logger.debug({ object, context });
      })
    );

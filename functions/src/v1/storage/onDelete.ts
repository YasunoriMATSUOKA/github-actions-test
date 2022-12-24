import functions from '../../utils/firebase/baseFunction';
import { triggerOnce } from '../../utils/firebase/hasAlreadyTriggered';
import { logger } from '../../utils/firebase/logger';

export const onDelete = () =>
  functions()
    .storage.object()
    .onDelete(
      triggerOnce('v1-storage-onDelete', async (object, context) => {
        logger.debug({ object, context });
      })
    );

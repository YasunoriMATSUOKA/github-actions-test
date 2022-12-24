import functions from '../../utils/firebase/baseFunction';
import { triggerOnce } from '../../utils/firebase/hasAlreadyTriggered';
import { logger } from '../../utils/firebase/logger';

export const onArchive = () =>
  functions()
    .storage.object()
    .onArchive(
      triggerOnce('v1-storage-onArchive', async (object, context) => {
        logger.debug({ object, context });
      })
    );

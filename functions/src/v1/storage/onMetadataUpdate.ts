import functions from '../../utils/firebase/baseFunction';
import { triggerOnce } from '../../utils/firebase/triggerOnce';
import { logger } from '../../utils/firebase/logger';

export const onMetadataUpdate = () =>
  functions()
    .storage.object()
    .onMetadataUpdate(
      triggerOnce('v1-storage-onMetadataUpdate', async (object, context) => {
        logger.debug({ object, context });
      })
    );

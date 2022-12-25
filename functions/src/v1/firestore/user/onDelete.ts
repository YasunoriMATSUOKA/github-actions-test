import functions from '../../../utils/firebase/baseFunction';
import { triggerOnce } from '../../../utils/firebase/triggerOnce';
import { logger } from '../../../utils/firebase/logger';
import { firestorePath } from '../path';
import { snapshotToUser } from './model';

export const onDelete = () =>
  functions()
    .firestore.document(firestorePath.v1.users.path.docOnTrigger)
    .onDelete(
      triggerOnce(
        'v1-firestore-user-onDelete',
        async (changeSnapshot, context) => {
          logger.debug('changeSnapshot, context', { changeSnapshot, context });
          const userId = context.params.userId;
          logger.debug('userId', { userId });
          const beforeUser = await snapshotToUser(changeSnapshot);
          logger.debug('beforeUser', { beforeUser });
        }
      )
    );

import functions from '../../../utils/firebase/baseFunction';
import { triggerOnce } from '../../../utils/firebase/triggerOnce';
import { logger } from '../../../utils/firebase/logger';
import { firestorePath } from '../path';
import { snapshotToUser } from './model';

export const onUpdate = () =>
  functions()
    .firestore.document(firestorePath.v1.users.path.docOnTrigger)
    .onUpdate(
      triggerOnce(
        'v1-firestore-user-onUpdate',
        async (changeSnapshot, context) => {
          logger.debug('changeSnapshot, context', { changeSnapshot, context });
          const userId = context.params.userId;
          logger.debug('userId', { userId });
          const beforeUser = await snapshotToUser(changeSnapshot.before);
          logger.debug('beforeUser', { beforeUser });
          const afterUser = await snapshotToUser(changeSnapshot.after);
          logger.debug('afterUser', { afterUser });
        }
      )
    );

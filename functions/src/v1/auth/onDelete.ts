import functions from '../../utils/firebase/baseFunction';
import { triggerOnce } from '../../utils/firebase/hasAlreadyTriggered';
import { logger } from '../../utils/firebase/logger';
import { deleteUser } from '../firestore/user/model';

export const onDelete = () =>
  functions()
    .auth.user()
    .onDelete(
      triggerOnce('v1-auth-onDelete', async (userRecord, context) => {
        logger.debug({
          userRecord,
          context,
        });
        const userId = userRecord.uid;
        logger.debug({ userId });
        await deleteUser(userId);
      })
    );

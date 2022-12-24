import functions from '../../utils/firebase/baseFunction';
import { triggerOnce } from '../../utils/firebase/hasAlreadyTriggered';
import { logger } from '../../utils/firebase/logger';
import { setUser, User } from '../firestore/user/model';

export const onCreate = () =>
  functions()
    .auth.user()
    .onCreate(
      triggerOnce('v1-auth-onCreate', async (userRecord, context) => {
        logger.debug({
          userRecord,
          context,
        });
        const user: User = {
          id: userRecord.uid,
          name: userRecord.displayName,
          email: userRecord.email,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        logger.debug({ user });
        await setUser(user);
      })
    );

const V1 = '/v/1';
const USERS = '/users';
const USER_ID = '/{userId}';

export const firestorePath = {
  v1: {
    users: {
      path: {
        collection: `${V1}${USERS}`,
        doc: (userId: string) => `${V1}${USERS}/${userId}`,
        docOnTrigger: `/${V1}${USERS}/${USER_ID}`,
      },
    },
  },
};

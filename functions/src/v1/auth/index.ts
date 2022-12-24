import { UserRecord } from 'firebase-functions/lib/providers/auth';
import { CloudFunction } from 'firebase-functions';
import { exportFunction } from '../../utils/firebase/deploy';
import { onCreate } from './onCreate';
import { onDelete } from './onDelete';

// Note: Register functions
const _exportFunction = (name: string, f: () => CloudFunction<UserRecord>) =>
  exportFunction(['v1', 'auth', name], exports, f);

_exportFunction('onCreate', onCreate);
_exportFunction('onDelete', onDelete);

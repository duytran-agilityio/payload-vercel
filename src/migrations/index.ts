import * as migration_20260122_085302 from './20260122_085302';
import * as migration_20260123_145902_user_roles from './20260123_145902_user_roles';

export const migrations = [
  {
    up: migration_20260122_085302.up,
    down: migration_20260122_085302.down,
    name: '20260122_085302',
  },
  {
    up: migration_20260123_145902_user_roles.up,
    down: migration_20260123_145902_user_roles.down,
    name: '20260123_145902_user_roles'
  },
];

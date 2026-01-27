import * as migration_20260123_152953_init from './20260123_152953_init';
import * as migration_20260123_153006_pages from './20260123_153006_pages';
import * as migration_20260123_153057_global_info from './20260123_153057_global_info';
import * as migration_20260123_153114_about from './20260123_153114_about';
import * as migration_20260123_153132_bunker from './20260123_153132_bunker';
import * as migration_20260123_153226_consultation from './20260123_153226_consultation';
import * as migration_20260123_153240_contact from './20260123_153240_contact';
import * as migration_20260123_153254_footer from './20260123_153254_footer';
import * as migration_20260123_153314_homepage from './20260123_153314_homepage';
import * as migration_20260123_153330_ira from './20260123_153330_ira';
import * as migration_20260123_153342_service from './20260123_153342_service';
import * as migration_20260123_153359_menu from './20260123_153359_menu';

export const migrations = [
  {
    up: migration_20260123_152953_init.up,
    down: migration_20260123_152953_init.down,
    name: '20260123_152953_init',
  },
  {
    up: migration_20260123_153006_pages.up,
    down: migration_20260123_153006_pages.down,
    name: '20260123_153006_pages',
  },
  {
    up: migration_20260123_153057_global_info.up,
    down: migration_20260123_153057_global_info.down,
    name: '20260123_153057_global_info',
  },
  {
    up: migration_20260123_153114_about.up,
    down: migration_20260123_153114_about.down,
    name: '20260123_153114_about',
  },
  {
    up: migration_20260123_153132_bunker.up,
    down: migration_20260123_153132_bunker.down,
    name: '20260123_153132_bunker',
  },
  {
    up: migration_20260123_153226_consultation.up,
    down: migration_20260123_153226_consultation.down,
    name: '20260123_153226_consultation',
  },
  {
    up: migration_20260123_153240_contact.up,
    down: migration_20260123_153240_contact.down,
    name: '20260123_153240_contact',
  },
  {
    up: migration_20260123_153254_footer.up,
    down: migration_20260123_153254_footer.down,
    name: '20260123_153254_footer',
  },
  {
    up: migration_20260123_153314_homepage.up,
    down: migration_20260123_153314_homepage.down,
    name: '20260123_153314_homepage',
  },
  {
    up: migration_20260123_153330_ira.up,
    down: migration_20260123_153330_ira.down,
    name: '20260123_153330_ira',
  },
  {
    up: migration_20260123_153342_service.up,
    down: migration_20260123_153342_service.down,
    name: '20260123_153342_service',
  },
  {
    up: migration_20260123_153359_menu.up,
    down: migration_20260123_153359_menu.down,
    name: '20260123_153359_menu'
  },
];

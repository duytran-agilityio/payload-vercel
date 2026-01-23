import { getPayloadClient } from '@/libs/payload/client';
import { migrateAbout } from './about.migrate';
import { migrateBunker } from './bunker.migrate';
import { migrateConsultation } from './consultation.migrate';
import { migrateContact } from './contact.migrate';
import { migrateFooter } from './footer.migrate';
import { migrateGlobalInfo } from './global-info.migrate';
import { migrateHomepage } from './homepage.migrate';
import { migrateIRA } from './ira.migrate';
import { migrateService } from './service.migrate';
import { migrateMenu } from './menu.migrate';
import { migratePages } from './pages.migrate';

async function migrate() {
  try {
    const payload = await getPayloadClient();
    // await migrateAbout(payload);
    // await migrateBunker(payload);
    // await migrateConsultation(payload);
    // await migrateContact(payload);
    // await migrateFooter(payload);
    // await migrateHomepage(payload);
    // await migrateIRA(payload);
    // await migrateService(payload);
    await migrateGlobalInfo(payload);
    // await migrateMenu(payload);
    // await migratePages(payload);
    console.log('Migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed', error);
    process.exit(1);
  }
}

migrate();

import { execSync } from 'child_process';

/**
 * Resets the Payload database by dropping all tables
 * This allows for a fresh migration after updating media provider
 *
 * Uses Docker exec to connect to PostgreSQL and drop all tables
 */
async function resetDatabase() {
  try {
    const containerName = 'battalion-payload-postgres';
    const dbName = 'battalion_payload';
    const dbUser = 'payload';

    console.log('Checking if PostgreSQL container is running...');

    // Check if container exists and is running
    try {
      const containerStatus = execSync(
        `docker ps --filter "name=${containerName}" --format "{{.Names}}"`,
        { encoding: 'utf-8' },
      ).trim();

      if (!containerStatus.includes(containerName)) {
        console.error(`❌ Container ${containerName} is not running.`);
        console.log('Please start it with: docker-compose up -d');
        process.exit(1);
      }
    } catch (error) {
      console.error(`❌ Failed to check container status: ${error}`);
      process.exit(1);
    }

    console.log('✅ Container is running');
    console.log('\nDropping all tables in the database...');

    // Use a simpler approach: get table list first, then drop them
    console.log('Fetching list of tables...');
    const getTablesSQL = `SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;`;
    const tablesOutput = execSync(
      `docker exec -i ${containerName} psql -U ${dbUser} -d ${dbName} -t -c "${getTablesSQL}"`,
      { encoding: 'utf-8' },
    );

    const tables = tablesOutput
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (tables.length === 0) {
      console.log('No tables found. Database is already empty.');
      process.exit(0);
    }

    console.log(`Found ${tables.length} tables to drop:`);
    tables.forEach((table) => console.log(`  - ${table}`));

    // Drop each table
    console.log('\nDropping tables...');
    for (const table of tables) {
      try {
        execSync(
          `docker exec -i ${containerName} psql -U ${dbUser} -d ${dbName} -c "DROP TABLE IF EXISTS \\"${table}\\" CASCADE;"`,
          { encoding: 'utf-8', stdio: 'pipe' },
        );
        console.log(`  ✓ Dropped table: ${table}`);
      } catch (error) {
        console.error(`  ✗ Failed to drop table ${table}:`, error);
      }
    }

    // Drop sequences
    console.log('\nDropping sequences...');
    const getSequencesSQL = `SELECT sequence_name FROM information_schema.sequences WHERE sequence_schema = 'public';`;
    const sequencesOutput = execSync(
      `docker exec -i ${containerName} psql -U ${dbUser} -d ${dbName} -t -c "${getSequencesSQL}"`,
      { encoding: 'utf-8' },
    );

    const sequences = sequencesOutput
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    for (const sequence of sequences) {
      try {
        execSync(
          `docker exec -i ${containerName} psql -U ${dbUser} -d ${dbName} -c "DROP SEQUENCE IF EXISTS \\"${sequence}\\" CASCADE;"`,
          { encoding: 'utf-8', stdio: 'pipe' },
        );
        console.log(`  ✓ Dropped sequence: ${sequence}`);
      } catch (error) {
        console.error(`  ✗ Failed to drop sequence ${sequence}:`, error);
      }
    }

    console.log('\n✅ Database reset completed successfully!');
    console.log('You can now run migrations again with: pnpm strapi:migrate');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database reset failed:', error);
    process.exit(1);
  }
}

resetDatabase();

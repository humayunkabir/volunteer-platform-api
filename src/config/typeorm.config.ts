import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv').config();

// const mongoUser = process.env.MONGO_USER;
// const mongoPassword = encodeURIComponent(process.env.MONGO_PASSWORD);
// const cluster = process.env.MONGO_CLUSTER;
// const db = process.env.MONGO_DB_NAME;
// const retryWrites = JSON.parse(process.env.MONGO_RETRY_WRITES);

// const mongoCloudUrl = `mongodb+srv://${mongoUser}:${mongoPassword}@${cluster}.mongodb.net/${db}?retryWrites=${retryWrites}&w=majority`;
const mongoLocalUrl = 'mongodb://localhost/volunteer-platform';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: mongoLocalUrl,
  synchronize: true,
  useUnifiedTopology: true,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  logging: true,
};

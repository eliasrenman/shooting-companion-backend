import { registerAs } from '@nestjs/config';

export default registerAs('mongo', () => ({
  DB_URI: process.env.MONGO_DB_URI,
  DB_CERT: process.env.MONGO_DB_CERT,
}));

import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  HTTP_PORT: process.env.HTTP_PORT || 8080,
  NODE_ENV: process.env.NODE_ENV  || 'production',
}));
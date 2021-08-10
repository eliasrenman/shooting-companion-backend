import { Connection } from 'mongoose';

export default (connection: Connection, name: string): Connection => {
  return connection;
}
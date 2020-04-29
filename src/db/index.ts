import { query, Client } from 'faunadb';

const secret = process.env.FAUNADB_SECRET!;

export const q = query;

const client = new Client({ secret });

export type DbWrapped<T> = {
  data: T;
  ts: number;
  ref: ReturnType<typeof q.Ref>;
};

export default client;

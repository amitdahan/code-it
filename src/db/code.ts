import client, { DbWrapped, q } from './index';

export interface CodeEntry {
  id: string;
  code: string;
}

export const getCode = async (id: string) => {
  try {
    return (
      await client.query<DbWrapped<CodeEntry>>(
        q.Get(q.Match(q.Index('code_by_id'), id))
      )
    ).data.code;
  } catch {
    return '';
  }
};

export const setCode = async (id: string, code: string) => {
  try {
    await client.query(
      q.Update(q.Select('ref', q.Get(q.Match(q.Index('code_by_id'), id))), {
        data: {
          id,
          code,
        },
      })
    );
  } catch {
    await client.query(
      q.Create(q.Collection('code'), {
        data: {
          id,
          code,
        },
      })
    );
  }
};

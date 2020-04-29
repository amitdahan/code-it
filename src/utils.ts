import { IncomingMessage } from 'http';

export const apiUrl = (req: IncomingMessage, relUrl: string) =>
  `${process.env.NODE_ENV === 'production' ? 'https' : 'http'}://${
    req?.headers.host
  }${relUrl}`;

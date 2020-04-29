import { trigger } from './index';

export const notifyCodeChanged = (id: string, code: string, socketId: string) =>
  trigger(`code-${id}`, 'change', code, socketId);

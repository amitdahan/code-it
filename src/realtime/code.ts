import { trigger } from './index';

export const notifyCodeChanged = (id: string, code: string) =>
  trigger(`code-${id}`, 'change', code);

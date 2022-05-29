import * as bcrypt from 'bcrypt';

const bcryptSalt = 10;

export const hash = async (str: string): Promise<string> =>
  await bcrypt.hash(str, bcryptSalt);

export const compare = async (str: string, hash: string): Promise<boolean> =>
  await bcrypt.compare(str, hash);

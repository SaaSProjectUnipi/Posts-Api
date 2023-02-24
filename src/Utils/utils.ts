import * as bcrypt from 'bcrypt';



export const comparePasswords = async (userPassword: any, currentPassword: any) => {
  return await bcrypt.compare(currentPassword, userPassword);
};

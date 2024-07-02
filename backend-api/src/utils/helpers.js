import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
// import jwt from 'jsonwebtoken';

export const tokenGenerator = (data) => {
  const token = jwt.sign(data, process.env.APP_SECRET, { expiresIn: '1d' });
  return token;
};


export const hashPassword = async (password) => {
    const saltRounds = 10
    return await bcrypt.hash(password, saltRounds)
}

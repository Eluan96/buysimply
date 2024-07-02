import staff from '../../json-data/staffs.json' assert { type: 'json' };
import { loginSchema } from '../utils/validation.js';
import { tokenGenerator } from '../utils/helpers.js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const validator = await loginSchema.validateAsync(req.body);
        
        if (validator.error) {
          return res.status(400).json({
            Error: validator.error.details[0].message,
          });
        }
      
        const user = staff.find(i => i.email === email);
      console.log('user', user)
        if (!user) {
          return res.status(401).json({ message: 'Invalid user' });
        }
      
        if (password !== user.password) {
            return res.status(401).json({ message: 'Invalid password' });
        }
      
        const token = tokenGenerator({ email: user.email, role: user.role });
      
        res.status(200).json({status: "success", message: "Login Successful", token });

    } catch (error) {
        console.log(error.message);
      return res.status(500).json({ message: `Internal Server Error` });
    }

};

export const logout = (req, res) => {
    try {
        res.clearCookie('token');
        res.setHeader('Authorization', '');

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error logging out user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

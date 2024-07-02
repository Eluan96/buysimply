import jwt from 'jsonwebtoken';
// import { APP_SECRET } from '../config';

export const auth = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (authorization === undefined) {
            return res.status(401).send({
                status: "There is an Error",
                message: "Ensure that you are logged in"
            });
        }

        const token = authorization.split(" ")[1];
        if (!token || token === "") {
            return res.status(401).send({
                status: "Error",
                message: "The token can't be used"
            });
        }

        const decoded = jwt.verify(token, process.env.APP_SECRET);
        req.user = decoded;
        return next();
    } catch (err) {
        console.log("ERROR:", err);
        return res.status(401).send({
            status: "Error",
            message: err.message
        });
    }
};


// import jwt from 'jsonwebtoken';
// // import User from '../models/userModel.js';
// import staff from '../../json-data/staffs.json' assert { type: 'json' }

// export const auth = async (req, res, next) => {
//     let token;

//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         token = req.headers.authorization.split(' ')[1];

//         try {
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             const user = staff.find(i => i.id === decoded.id);
//             console.log('json user', user)
//             console.log('decoded', decoded)
//             if (!user) {
//                 return res.status(401).json({ message: 'Invalid token' });
//             }
//             req.user = user; 
//             next();
//         } catch (error) {
//             res.status(401).json({ message: 'Not authorized, Token is not valid' });
//         }
//     }

//     if (!token) {
//         res.status(401).json({ message: 'Not authorized, no token' });
//     }
// };



// import jwt from 'jsonwebtoken';
// import fs from 'fs';
// import path from 'path';

// export const auth = (req, res, next) => {
//     let token;

//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         token = req.headers.authorization.split(' ')[1];

//         try {
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             const staffFilePath = path.join(__dirname, '../../json-data/staffs.json');
//             const staffData = JSON.parse(fs.readFileSync(staffFilePath, 'utf-8'));
//             const user = staffData.find(user => user.id === decoded.id);

//             if (!user) {
//                 return res.status(401).json({ message: 'Invalid token' });
//             }

//             req.user = user;
//             next();
//         } catch (error) {
//             return res.status(401).json({ message: 'Not authorized, Token is not valid' });
//         }
//     }

//     if (!token) {
//         return res.status(401).json({ message: 'Not authorized, no token' });
//     }
// };
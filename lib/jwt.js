import jwt from 'jsonwebtoken';


export function verifyjwttoken(token){
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
   
    } catch (error) {
        return null;
    }
}
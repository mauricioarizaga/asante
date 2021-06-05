const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const AppError = require('../errors/appError');
const logger = require('../loaders/logger');
const config = require('../config');

const login = async(email, password) => {
 
    try {
       
        //Validación de email
        const user = await userService.findByEmail(email);

        if(!user){     
          let createUser = {email: email, password: password}  
          const saveUser =  await userService.save(createUser);

        //Generar JWT
        const token = _encrypt(saveUser._id);

        return {
            token,
            user: saveUser.email,
        }

        }

        //Validación de password
        const validPassword = await bcrypt.compare(password, user.password);
        
        if(!validPassword) {
            throw new AppError('Authentication failed! Email / password does not correct.', 401);
        }

        //Generar JWT
        const token = _encrypt(user._id);

        return {
            token,
            user: user.email
        }

    }catch(error) {
        throw error;
    }

}


const validToken = async (token) => {

    try {

        // validar que token venga como parametro
        if(!token){
            throw new AppError('Authentication failed! Token required', 401);
        }    

        logger.info(`Token received: ${token}`);


        // validar que token sea integro
        let id;
        try {
             const obj = jwt.verify(token, config.auth.secret);
             id = obj.id;
        }catch(verifyError){
            throw new AppError('Authentication failed! Invalid token', 401, token);
        }
    
        logger.info(`User id in the token: ${id}`);

        // validar si hay usuario en bd
        const user = await userService.findById(id);
        if(!user){
            throw new AppError('Authentication failed! Invalid Token - User not found', 401);
        }
    
        //retornar el usaurio
        return user;

    }catch (err) {
        throw err;
    }


}

_encrypt = (id) => {
    return jwt.sign({ id }, config.auth.secret, { expiresIn: config.auth.ttl });
}

module.exports = {
    login,
    validToken,
}
const bcrypt = require('bcrypt');
const UserRepository = require('../repositories/userRepository');
const repository = new UserRepository();

const findById = async(id) => {
    return await repository.findById(id);
}

const findByEmail = async(email) => {
    
    return await repository.findByEmail({email});
}

const save = async (user) => {
    return await repository.save(user);
}


module.exports = {
    findById,
    findByEmail,
    save,
    
}
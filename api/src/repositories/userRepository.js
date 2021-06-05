const bcrypt = require('bcrypt');
const Users = require('../models/user');
class UserRepository {

    constructor(){

    }
    async findById(id) {
        return await Users.findById(id);
    }

    async findByEmail(email) {
       
        return await Users.findOne(email);
    }

    async save(user) {
       
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(user.password, salt);
       
        return await Users.create(user);
    }

}

module.exports = UserRepository;
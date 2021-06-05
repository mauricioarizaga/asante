const mongoose = require('mongoose');
const config = require('../../config');

module.exports = async () => {
  
  try {
  await mongoose.connect(config.databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
    });
    console.log('DB Online');

  } catch ( error ) {
      console.log( error );
      throw new Error('Failed to initialize database');
      
  }

}
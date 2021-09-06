const mongoose = require('mongoose');

const uri = "mongodb+srv://root:root@cluster0.mcd04.mongodb.net/Test?retryWrites=true&w=majority";
// To connect us with our MONGO DB  database we need to use the uri const with our infos
const connectDB = async () => {
  await mongoose.connect(uri, {
    useUnifiedTopology: true, //defaults setting that we have to put
    useNewUrlParser: true //defaults setting that we have to put
  });
  console.log('db connected..!');
};

module.exports = connectDB;

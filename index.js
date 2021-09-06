const express = require('express');
const connectDB = require('./Database/Connection');
const app = express();
var cors = require('cors')


//Using the connection.js function to connect us to our database
connectDB();


app.use((req, res, next) => {
    //that's preventing CORS policy -> The client wil not let acces to our requests if the server doesn't agreed before
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    );
  
    app.use(cors({ credentials: true, origin: true }));
    next();
});
  app.options('*', cors());

app.use(express.json({ extended: false }));
app.use('/', require('./Api/User')); //this is the endpoint of our API
const Port = process.env.Port || 3001; // this is the port used by our server

app.listen(Port, () => console.log('Server started'));

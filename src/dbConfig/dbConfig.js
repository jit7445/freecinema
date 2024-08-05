import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const mongoDBUri = process.env.MONGO_URL


const connectDB = async () => {
  try {
    await mongoose.connect(mongoDBUri);
    const connection=mongoose.connection
    connection.on('connected',()=>{
      console.log('connected to MongoDB')
    })
    connection.on('error',()=>{
      console.log('error connecting to MongoDB:'+err)
      process.exit();
    })
   
  }
  catch(err){
    console.log("something went Wrong");
    console.log(err);
  }
};

export default connectDB;

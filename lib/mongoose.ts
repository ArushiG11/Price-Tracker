// to make a connection to our mongodb database


import mongoose from 'mongoose';
let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(!process.env.MONGODB_URI) return console.log('MONGODB_URI is defined');

    if(isConnected) return console.log('Already connected to the database');

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log('Connected to MongoDB');
    }
    catch (error: any) {
        console.error(`Failed to connect to MongoDB: ${error.message}`);
        process.exit(1);
    }
}

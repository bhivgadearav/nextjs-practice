const mongoose = require('mongoose');

export async function connect() {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error('MONGO_URL is not defined');
        }

        const connection = mongoose.createConnection(process.env.MONGO_URL!)

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        connection.on('error', (err: any) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        })

    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);
        
    }
}
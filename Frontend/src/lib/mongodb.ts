import mongoose from 'mongoose'

const MONGODB_URI = 'mongodb+srv://b18158031:Danish12345@cluster0.atjpdsy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'


if (!MONGODB_URI) {
    throw new Error (" please define mongo environment variable")
}

async function connectToDatabase() {
    if (mongoose.connection.readyState === 1) {
        return mongoose;
    }

    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        bufferCommands: false,
        serverSelectionTimeoutMS: 30000,
    };

    try {
        await mongoose.connect(MONGODB_URI, opts);
        console.log('Database connected successfully');
        return mongoose;
    } catch (error) {
        console.error('Database connection error:', error);
        throw new Error('Failed to connect to the database');
    }
}

export default connectToDatabase;
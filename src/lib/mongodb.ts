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
        bufferCommands: false,
    }
    await mongoose.connect(MONGODB_URI!, opts);
    return mongoose;
}

export default connectToDatabase;
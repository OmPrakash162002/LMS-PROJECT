import mongoose from 'mongoose'

//connect to mongodb database

export const connetDB = async ()=>{
    mongoose.connection.on('connected',()=> console.log('database connected'))
    await mongoose.connect(`${process.env.MONGODB_URI}/LMS`)
}
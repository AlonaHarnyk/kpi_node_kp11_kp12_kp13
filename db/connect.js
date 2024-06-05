import {connect} from 'mongoose'

export const connectDB = async () => {
    try {
       await connect(process.env.DB_URL)
       console.log('DB connected')
    } catch (error) {
        console.log(error)
    }
}
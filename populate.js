require('dotenv').config()

const connectDB = require('./db/connect')
const populate = require('./MOCK_DATA.json')
const Jobs = require('./models/Job')

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        const populat = await Jobs.create(populate)
        console.log('success')
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()

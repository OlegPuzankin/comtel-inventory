import mongoose from 'mongoose'
import '../model/Location'
import '../model/User'
import '../model/Item'
import '../model/History'

async function dbConnect() {

  // check if we have a connection to the database or if it's currently
  // connecting or disconnecting (readyState 1, 2 and 3)
  if (mongoose.connection.readyState >= 1) {
    return
  }


  return mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })

}

export default dbConnect

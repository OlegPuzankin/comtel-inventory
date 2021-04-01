import mongoose from 'mongoose'

async function dbConnect() {
  console.log('invoke dbConnect()');

  // check if we have a connection to the database or if it's currently
  // connecting or disconnecting (readyState 1, 2 and 3)
  if (mongoose.connection.readyState >= 1) {
    console.log('invoke dbConnect() connected');
    return
  }

  console.log('invoke dbConnect() connecting');

  return mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })

}

export default dbConnect

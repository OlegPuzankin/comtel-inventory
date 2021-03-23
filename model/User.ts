import mongoose, { Model } from 'mongoose'


export interface UserDoc extends mongoose.Document {
  name: string,
  email: string,
  image: string,
  admin: boolean,
}

const userSchema: mongoose.Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  image: String,
  admin: {
    type: Boolean,
    required: true
  }

})

// export default mongoose.model<UserDoc>('User', userSchema)
export const User: Model<UserDoc>
  = mongoose.models.User || mongoose.model<UserDoc>('User', userSchema)




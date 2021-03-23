import mongoose, { Model } from 'mongoose'
import { UserDoc } from './User';

export interface HistoryDoc extends mongoose.Document {
  date: Date,
  description: string,
  user: UserDoc
}

const historySchema = new mongoose.Schema({
  date: Date,
  description: String,
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  }
})


export const History: Model<HistoryDoc>
  = mongoose.models.History || mongoose.model<HistoryDoc>('History', historySchema)




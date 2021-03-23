import { ItemType, UnitMeasure } from './../interfaces/common_interfaces';
import { LocationDoc } from './Location';
import mongoose, { Model, Schema } from 'mongoose'
import { UserDoc } from './User';
import { ItemStatus } from '../interfaces/common_interfaces';



export interface ItemDoc extends mongoose.Document {
  name: string,
  imageKey: string,
  location: LocationDoc,
  responsiblePerson: UserDoc,
  status: ItemStatus,
  quantity: number,
  measure: UnitMeasure,
  serialNumber: string,
  desc: string,
  type: ItemType,
  timestamp: Date

}

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imageKey: String,
  location: {
    type: Schema.Types.ObjectId,
    ref: "Location"
  },
  responsiblePerson: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  status: {
    type: String,
    default: ItemStatus.OnStock
  },
  serialNumber: String,
  quantity: {
    type: Number,
    default: 1
  },
  desc: String,
  measure: {
    type: String,
    default: UnitMeasure.Pcs
  },
  type: {
    type: String,
    default: ItemType.Tool
  },
  timestamp: {
    type: Date,
    default: Date.now()
  },
})




export const Item: Model<ItemDoc> = mongoose.models.Item || mongoose.model<ItemDoc>('Item', itemSchema)
// export default mongoose.models.Item || mongoose.model<ItemDoc>('Item', itemSchema) as Model<ItemDoc>

// export const Item: Model<ItemDoc>
//   = mongoose.model<ItemDoc>('Item', itemSchema)



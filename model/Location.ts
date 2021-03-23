import mongoose, { Model } from 'mongoose'
import { LocationType } from '../interfaces/common_interfaces'

export interface LocationDoc extends mongoose.Document {
  name: string,
  timestamp: Date,
  locationType: LocationType,

}

const locationSchema = new mongoose.Schema<LocationDoc>({
  name: {
    type: String,
    required: true
  },
  locationType: {
    type: String,
    default: LocationType.Location
  },
  timestamp: {
    type: Date,
    default: Date.now()
  }

})

// locationSchema.virtual('countItems').get(async function () {
//   const i = await Item.find({ location: this._id })
//   return i.length
// })


// itemSchema.statics.build = async (attrs: ItemProps) => Item.create(attrs)



// export default mongoose.model<LocationDoc>('Location', locationSchema)
export const Location: Model<LocationDoc> =
  mongoose.models.Location || mongoose.model<LocationDoc>('Location', locationSchema)

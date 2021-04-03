import { HistoryDoc } from '../model/History';
import { ItemDoc } from '../model/Item';
import { LocationDoc } from '../model/Location';
import { UserDoc } from '../model/User';

// GET requests
export interface GetLocationsResponse {
  success: boolean
  data: Array<LocationDoc>
}
export interface GetItemsResponse {
  success: boolean
  data: Array<ItemDoc>
}
export interface GetItemResponse {
  success: boolean
  data: ItemDoc
}
export interface GetUsersResponse {
  success: boolean
  data: Array<UserDoc>
}
export interface GetHistoriesResponse {
  success: boolean
  data: Array<HistoryDoc>
}

export interface GetPresignURLResponse {
  key: string
  url: string
}
// PUT (UPDATE) requests
export interface PutLocationResponse {
  success: boolean
  data: LocationDoc
}
export interface PutItemResponse {
  success: boolean
  data: ItemDoc
}







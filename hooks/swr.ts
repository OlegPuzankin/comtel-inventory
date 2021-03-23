import axios from 'axios'
import useSWR from 'swr'
import { GetItemResponse, GetItemsResponse, GetLocationsResponse, GetUsersResponse } from '../interfaces/api_response'

const getFetcher = (url: string) => axios.get(url).then(res => res.data)

export function useGetLocations() {
  return useSWR<GetLocationsResponse>('/api/location', getFetcher, { dedupingInterval: 50000 })
}
export function useGetItems() {
  return useSWR<GetItemsResponse>('/api/item', getFetcher, { dedupingInterval: 50000 })
}
export function useGetItem(itemId: string) {
  return useSWR<GetItemResponse>(`/api/item/${itemId}`, getFetcher, { dedupingInterval: 50000 })
}
export function useGetUsers() {
  return useSWR<GetUsersResponse>('/api/user', getFetcher, { dedupingInterval: 50000 })
}
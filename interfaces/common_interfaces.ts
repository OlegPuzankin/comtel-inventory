import { User } from 'next-auth';

export interface MenuItem {
  id: string
  menuItemText: string
  clickHandler: Function
}

export enum ItemStatus {
  Pending = "pending",
  OnLocation = "onLocation",
  OnStock = "onStock"
}

export interface LoggedUser extends User {
  admin: boolean
}

export enum UnitMeasure {
  Meter = "meters",
  Pcs = "pcs",
}

export enum LocationType {
  Stock = "stock",
  Location = "location",
}
export enum ItemType {
  Tool = "tool",
  Materail = "material",
}


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
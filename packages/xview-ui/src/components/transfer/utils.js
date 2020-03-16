export const S = String
export const F = Function
export const arrProp = { type: Array, default: () => [] }

export const props = {
  data: arrProp,
  renderFormat: F,
  selectedKeys: arrProp,
  filterable: Boolean,
  filterPlaceholder: S,
  filterMethod: F,
  notFoundText: S
}
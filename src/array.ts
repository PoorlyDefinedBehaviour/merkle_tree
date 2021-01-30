import invariant from "invariant"

export const last = <T>(array: T[]): T => {
  invariant(array.length > 0, "last called on empty array")

  return array[array.length - 1]
}

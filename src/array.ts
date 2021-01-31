import invariant from "invariant"

export const last = <T>(array: T[]): T => {
  invariant(array.length > 0, "last called on empty array")

  return array[array.length - 1]
}

export const chunks = <T>(chunkSize: number, data: T[]): T[][] => {
  const result: T[][] = []

  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize)
    result.push(chunk)
  }

  return result
}

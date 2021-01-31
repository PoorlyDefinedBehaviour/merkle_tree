import crypto from "crypto"
import * as number from "./number"
import * as array from "./array"

type MerkleeNode = {
  left: MerkleeNode | null
  right: MerkleeNode | null
  value: string
}

type MerkleeTree = {
  root: MerkleeNode
}

type Options = {
  chunks: number
}

const hash = (value: string): string =>
  crypto.createHash("sha256").update(value).digest("hex")

const buildTreeFromNodes = (nodes: MerkleeNode[]): MerkleeTree => {
  let remainingNodes: MerkleeNode[] = nodes

  while (remainingNodes.length > 1) {
    remainingNodes = array.chunks(2, remainingNodes).map(([left, right]) => ({
      left,
      right,
      value: hash(`${left.value}${right.value}`),
    }))
  }

  return { root: remainingNodes[0] }
}

export const make = (data: string, options?: Options): MerkleeTree => {
  const nodes: MerkleeNode[] = array
    .chunks(options?.chunks ?? 4, data.split(""))
    .map(chunk => ({
      left: null,
      right: null,
      value: hash(chunk.join("")),
    }))

  if (!number.isEven(nodes.length)) {
    nodes.push(array.last(nodes))
  }

  return buildTreeFromNodes(nodes)
}

const differentRecursive = (
  lhs: MerkleeNode | null,
  rhs: MerkleeNode | null
): boolean => {
  if (!lhs || !rhs) {
    return lhs !== rhs
  }

  if (lhs.value !== rhs.value) {
    return true
  }
  return (
    differentRecursive(lhs.left, rhs.left) ||
    differentRecursive(lhs.right, rhs.right)
  )
}

export const different = (lhs: MerkleeTree, rhs: MerkleeTree): boolean =>
  differentRecursive(lhs.root, rhs.root)

export const equals = (lhs: MerkleeTree, rhs: MerkleeTree): boolean =>
  !different(lhs, rhs)

type TreeDifference = {
  lhs: string | null
  rhs: string | null
  left: TreeDifference | null
  right: TreeDifference | null
}

export const differenceRecursive = (
  lhs: MerkleeNode | null,
  rhs: MerkleeNode | null
): TreeDifference | null => {
  if (!lhs && !rhs) {
    return null
  }

  if (!lhs || !rhs) {
    return {
      lhs: lhs ? lhs.value : null,
      rhs: rhs ? rhs.value : null,
      left: null,
      right: null,
    }
  }

  if (lhs.value === rhs.value) {
    return null
  }

  const left = differenceRecursive(lhs.left, rhs.left)
  const right = differenceRecursive(lhs.right, rhs.right)

  return {
    lhs: lhs.value,
    rhs: rhs.value,
    left,
    right,
  }
}

export const difference = (
  lhs: MerkleeTree,
  rhs: MerkleeTree
): TreeDifference | null => differenceRecursive(lhs.root, rhs.root)

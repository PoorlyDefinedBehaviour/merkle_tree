import * as merkleTree from "./merkle_tree"

describe("merkle tree test suite", () => {
  test("different", () => {
    const cases = [
      { a: "abcdef", b: "abcdeg", expected: true },
      { a: "abcdef", b: "abcdef", expected: false },
      { a: "", b: "", expected: false },
      { a: "", b: "abcdeg", expected: true },
      { a: "abcdef", b: "", expected: true },
    ]

    for (const { a, b, expected } of cases) {
      expect(merkleTree.different(merkleTree.make(a), merkleTree.make(b))).toBe(
        expected
      )
    }
  })

  test("equals", () => {
    const cases = [
      { a: "abcdef", b: "abcdeg", expected: false },
      { a: "abcdef", b: "abcdef", expected: true },
      { a: "", b: "", expected: true },
      { a: "", b: "abcdeg", expected: false },
      { a: "abcdef", b: "", expected: false },
    ]

    for (const { a, b, expected } of cases) {
      expect(merkleTree.equals(merkleTree.make(a), merkleTree.make(b))).toBe(
        expected
      )
    }
  })

  test("difference", () => {
    const a = merkleTree.make("abcdef")
    const b = merkleTree.make("abcdeg")

    const expected = {
      lhs: "15717ae7a2e8ba56348798e92dd49583823985b8ec3071f047ac71a3909166c9",
      rhs: "1d8b05731972b0992b6896bfb74f85d7154dbcd5a8ed58ddebfa9d3a633fe6e0",
      left: null,
      right: {
        lhs: "4ca669ac3713d1f4aea07dae8dcc0d1c9867d27ea82a3ba4e6158a42206f959b",
        rhs: "d8c59e8348e0c03f9d2105eed9791438f9aea9586381b79deadbc857eef89d78",
        left: null,
        right: null,
      },
    }
    const actual = merkleTree.difference(a, b)

    expect(actual).toEqual(expected)
  })
})

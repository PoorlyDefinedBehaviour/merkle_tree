export type Maybe<T> = { tag: "Just"; value: T } | { tag: "Nothing" }
export const Just = <T>(value: T): Maybe<T> => ({ tag: "Just", value })
export const Nothing = <T>(_?: T): Maybe<T> => ({ tag: "Nothing" })
export const isJust = <T>(
  maybe: Maybe<T>
): maybe is { tag: "Just"; value: T } => maybe.tag === "Just"
export const isNothing = <T>(maybe: Maybe<T>) => !isJust(maybe)
export const fmap = <T, U>(f: (value: T) => U) => (maybe: Maybe<T>) =>
  isJust(maybe) ? Just(f(maybe.value)) : maybe

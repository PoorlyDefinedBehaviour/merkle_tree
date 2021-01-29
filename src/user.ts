import { Maybe, Just, Nothing } from "./maybe"

type User = {
  username: string
  email: string
}

export type UserView = {
  username: string
  email: string
}

export const make = (username: string, email: string): Maybe<User> =>
  username.length > 5 ? Just({ username, email }) : Nothing()

export const view = (user: User): UserView => ({
  username: user.username.toLowerCase(),
  email: user.email.toLowerCase(),
})

import * as User from "./user"
import * as Maybe from "./maybe"

const user = User.make("johndoe", "johndoe@email.com")
const evolve = (mappings: any) => (obj: any) =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      mappings[key] ? mappings[key](value) : value,
    ])
  )
const toUpperCase = (value: string) => value.toUpperCase()
console.log(Maybe.fmap(evolve({ username: toUpperCase }))(user))

if (Maybe.isJust(user)) {
  console.log(User.view(user.value))
}

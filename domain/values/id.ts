import { z } from "zod"

const zValue = z.string().length(21)

type Value = z.infer<typeof zValue>

export class Id {
  readonly _key = "ID"

  constructor(readonly value: Value) {
    zValue.parse(value)
    Object.freeze(this)
  }
}

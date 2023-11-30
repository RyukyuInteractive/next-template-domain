import { Id } from "@/domain/values/id"
import { nanoid } from "nanoid"

export class IdFactory {
  static create() {
    return new Id(nanoid())
  }
}

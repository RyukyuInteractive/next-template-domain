import { ResponseEntity } from "@/domain/entities/response.entity"
import { IdFactory } from "@/domain/values/factories/id.factory"
import { Id } from "@/domain/values/id"

export class ResponseEntityFactory {
  static create(props: {
    text: string
    threadId: Id
  }) {
    return new ResponseEntity({
      id: IdFactory.create(),
      text: props.text,
      isDeleted: false,
      threadId: props.threadId,
    })
  }
}

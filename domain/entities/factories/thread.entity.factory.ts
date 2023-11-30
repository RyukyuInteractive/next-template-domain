import { ThreadEntity } from "@/domain/entities/thread.entity"
import { IdFactory } from "@/domain/values/factories/id.factory"

export class ThreadEntityFactory {
  static create(props: {
    text: string
  }) {
    return new ThreadEntity({
      id: IdFactory.create(),
      text: props.text,
      isDeleted: false,
      responsesCount: 0,
    })
  }
}

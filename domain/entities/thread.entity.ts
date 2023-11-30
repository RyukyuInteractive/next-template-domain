import { Id } from "@/domain/values/id"
import { z } from "zod"

const zProps = z.object({
  id: z.instanceof(Id),
  text: z.string().min(2).max(128),
  responsesCount: z.number().int().min(0),
  isDeleted: z.boolean(),
})

type Props = z.infer<typeof zProps>

export class ThreadEntity implements Props {
  readonly id!: Props["id"]

  readonly text!: Props["text"]

  readonly responsesCount!: Props["responsesCount"]

  readonly isDeleted!: Props["isDeleted"]

  constructor(private readonly props: Props) {
    zProps.parse(props)
    Object.assign(this, props)
    Object.freeze(this)
  }

  get isClosed() {
    return 8 < this.responsesCount
  }

  delete() {
    if (1 < this.responsesCount) {
      throw new Error("レスポンスの数が2以上なので削除できない")
    }
    return new ThreadEntity({
      ...this.props,
      isDeleted: true,
    })
  }

  incrementResponsesCount() {
    return new ThreadEntity({
      ...this.props,
      responsesCount: this.responsesCount + 1,
    })
  }
}

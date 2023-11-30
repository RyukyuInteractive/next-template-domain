import { Id } from "@/domain/values/id"
import { z } from "zod"

const zProps = z.object({
  id: z.instanceof(Id),
  text: z.string().max(128),
  threadId: z.instanceof(Id),
  isDeleted: z.boolean(),
})

type Props = z.infer<typeof zProps>

export class ResponseEntity implements Props {
  readonly id!: Props["id"]

  readonly text!: Props["text"]

  readonly threadId!: Props["threadId"]

  readonly isDeleted!: Props["isDeleted"]

  constructor(private readonly props: Props) {
    zProps.parse(props)
    Object.assign(this, props)
    Object.freeze(this)
  }

  delete() {
    return new ResponseEntity({
      ...this.props,
      isDeleted: true,
    })
  }
}

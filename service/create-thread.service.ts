import { ResponseEntityFactory } from "@/domain/entities/factories/response.entity.factory"
import { ThreadEntityFactory } from "@/domain/entities/factories/thread.entity.factory"
import { ResponseRepository } from "@/infrastructure/repositories/response.repository"
import { ThreadRepository } from "@/infrastructure/repositories/thread.repository"
import { injectable } from "tsyringe"

type Props = {
  title: string
  text: string
}

@injectable()
export class CreateThreadService {
  constructor(
    private threadRepository: ThreadRepository,
    private responseRepository: ResponseRepository,
  ) {}

  async execute(props: Props) {
    try {
      const thread = ThreadEntityFactory.create({
        text: props.title,
      })

      const threadTransaction = await this.threadRepository.write(thread)

      if (threadTransaction instanceof Error) {
        return new Error("スレッドの作成に失敗した")
      }

      const response = ResponseEntityFactory.create({
        text: props.text,
        threadId: thread.id,
      })

      const responseTransaction = await this.responseRepository.write(response)

      if (responseTransaction instanceof Error) {
        const draftThread = thread.delete()
        await this.threadRepository.write(draftThread)
        return new Error("レスポンスの作成に失敗した")
      }

      return {
        threadId: thread.id.value,
      }
    } catch (error) {
      if (error instanceof Error) {
        return error
      }
      return new Error()
    }
  }
}

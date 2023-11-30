import { ResponseEntityFactory } from "@/domain/entities/factories/response.entity.factory"
import { Id } from "@/domain/values/id"
import { ResponseRepository } from "@/infrastructure/repositories/response.repository"
import { ThreadRepository } from "@/infrastructure/repositories/thread.repository"
import { injectable } from "tsyringe"

type Props = {
  threadId: string
  text: string
}

@injectable()
export class CreateResponseService {
  constructor(
    private threadRepository: ThreadRepository,
    private responseRepository: ResponseRepository,
  ) {}

  async execute(props: Props) {
    try {
      const thread = await this.threadRepository.read(props.threadId)

      if (thread instanceof Error) {
        return new Error("スレッドの読み込みに失敗した")
      }

      if (thread === null) {
        return new Error("スレッドが見つからない")
      }

      if (thread.isClosed) {
        return new Error("これ以上のレスポンスを作成できない")
      }

      const threadTransaction = await this.threadRepository.write(thread)

      if (threadTransaction instanceof Error) {
        return new Error("スレッドの作成に失敗した")
      }

      const response = ResponseEntityFactory.create({
        text: props.text,
        threadId: new Id(props.threadId),
      })

      const transaction = await this.responseRepository.write(response)

      if (transaction instanceof Error) {
        return new Error("レスポンスの作成に失敗した")
      }

      const draftThread = thread.incrementResponsesCount()

      await this.threadRepository.write(draftThread)

      return {
        responseId: response.id.value,
      }
    } catch (error) {
      if (error instanceof Error) {
        return error
      }
      return new Error("不明なエラーが発生しました")
    }
  }
}

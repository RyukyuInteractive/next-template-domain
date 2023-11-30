import { ResponseRepository } from "@/infrastructure/repositories/response.repository"
import { injectable } from "tsyringe"

type Props = {
  threadId: string
}

@injectable()
export class DeleteResponseService {
  constructor(private responseRepository: ResponseRepository) {}

  async execute(props: Props) {
    try {
      const response = await this.responseRepository.read(props.threadId)

      if (response instanceof Error) {
        return new Error("スレッドの読み込みに失敗した")
      }

      if (response === null) {
        return new Error("スレッドが見つからない")
      }

      const draftResponse = response.delete()

      const transaction = await this.responseRepository.write(draftResponse)

      if (transaction instanceof Error) {
        return new Error("レスポンスの削除に失敗しました")
      }

      return null
    } catch (error) {
      if (error instanceof Error) {
        return error
      }
      return new Error()
    }
  }
}

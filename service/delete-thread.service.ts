import { ThreadRepository } from "@/infrastructure/repositories/thread.repository"
import { injectable } from "tsyringe"

type Props = {
  threadId: string
}

@injectable()
export class DeleteThreadService {
  constructor(private threadRepository: ThreadRepository) {}

  async execute(props: Props) {
    try {
      const thread = await this.threadRepository.read(props.threadId)

      if (thread instanceof Error) {
        return new Error("スレッドの読み込みに失敗した")
      }

      if (thread === null) {
        return new Error("スレッドが見つからない")
      }

      const draftThread = thread.delete()

      const transaction = await this.threadRepository.write(draftThread)

      if (transaction instanceof Error) {
        return new Error("スレッドの削除に失敗した")
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

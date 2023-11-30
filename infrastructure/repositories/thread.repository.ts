import { ThreadEntity } from "@/domain/entities/thread.entity"
import { Id } from "@/domain/values/id"
import { database } from "@/lib/database"

export class ThreadRepository {
  async read(threadId: string) {
    try {
      const thread = await database.threads.findUnique({
        where: { nanoid: threadId },
        include: { _count: { select: { responses: true } } },
      })

      if (thread === null) {
        return null
      }

      return new ThreadEntity({
        id: new Id(thread.nanoid),
        text: thread.text,
        responsesCount: thread._count.responses,
        isDeleted: thread.is_deleted,
      })
    } catch (error) {
      return new Error()
    }
  }

  async write(thread: ThreadEntity) {
    try {
      await database.threads.upsert({
        where: { nanoid: thread.id.value },
        update: {
          text: thread.text,
          updated_at: new Date(),
        },
        create: {
          nanoid: thread.id.value,
          text: thread.text,
        },
      })

      return null
    } catch (error) {
      return new Error()
    }
  }
}

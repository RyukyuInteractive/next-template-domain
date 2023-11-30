import { ResponseEntity } from "@/domain/entities/response.entity"
import { Id } from "@/domain/values/id"
import { database } from "@/lib/database"

export class ResponseRepository {
  async read(responseId: string) {
    try {
      const response = await database.responses.findUnique({
        where: { nanoid: responseId },
        include: { threads: { select: { nanoid: true } } },
      })

      if (response === null) {
        return null
      }

      return new ResponseEntity({
        id: new Id(response.nanoid),
        text: response.text,
        threadId: new Id(response.threads.nanoid),
        isDeleted: response.is_deleted,
      })
    } catch (error) {
      return new Error()
    }
  }

  async write(response: ResponseEntity) {
    try {
      await database.responses.upsert({
        where: { nanoid: response.id.value },
        update: {
          text: response.text,
          updated_at: new Date(),
        },
        create: {
          nanoid: response.id.value,
          text: response.text,
          threads: { connect: { nanoid: response.threadId.value } },
        },
      })

      return null
    } catch (error) {
      return new Error()
    }
  }
}

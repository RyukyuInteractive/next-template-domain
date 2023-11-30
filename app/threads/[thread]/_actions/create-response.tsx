"use server"

import "reflect-metadata"

import { FormAction } from "@/app/_types/form-action"
import { CreateResponseService } from "@/service/create-response.service"
import { revalidatePath } from "next/cache"
import { container } from "tsyringe"
import { z } from "zod"

type State = {
  message?: string
}

const zFormData = z.object({
  threadId: z.string(),
  text: z.string(),
})

export const createResponse: FormAction<State> = async (_, formData) => {
  const form = zFormData.safeParse({
    threadId: formData.get("thread_id"),
    text: formData.get("text"),
  })

  if (!form.success) {
    return { message: "入力に問題があります" }
  }

  const service = container.resolve(CreateResponseService)

  const result = await service.execute({
    threadId: form.data.threadId,
    text: form.data.text,
  })

  if (result instanceof Error) {
    return { message: result.message }
  }

  revalidatePath("/")

  return {}
}

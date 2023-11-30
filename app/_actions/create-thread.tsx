"use server"

import "reflect-metadata"

import { FormAction } from "@/app/_types/form-action"
import { CreateThreadService } from "@/service/create-thread.service"
import { revalidatePath } from "next/cache"
import { container } from "tsyringe"
import { z } from "zod"

type State = {
  message?: string
}

const zFormData = z.object({
  title: z.string(),
  text: z.string(),
})

export const createThread: FormAction<State> = async (_, formData) => {
  const form = zFormData.safeParse({
    title: formData.get("title"),
    text: formData.get("text"),
  })

  if (!form.success) {
    return { message: "入力に問題があります" }
  }

  const service = container.resolve(CreateThreadService)

  const result = await service.execute({
    title: form.data.title,
    text: form.data.text,
  })

  if (result instanceof Error) {
    return { message: result.message }
  }

  revalidatePath("/")

  return {}
}

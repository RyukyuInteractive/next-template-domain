"use client"

import { createThread } from "@/app/_actions/create-thread"
import { SubmitButton } from "@/app/_components/submit-button"
import { Card, TextField } from "@radix-ui/themes"
import { useFormState } from "react-dom"

export const ThreadFormCard = () => {
  const [state, formAction] = useFormState(createThread, {})

  return (
    <Card asChild variant="classic">
      <form action={formAction}>
        <div className={"flex flex-col gap-2"}>
          <TextField.Input
            variant="classic"
            name="title"
            placeholder="タイトル"
          />
          <TextField.Input
            variant="classic"
            name="text"
            placeholder="テキスト"
          />
          <div className="card-actions justify-end">
            <SubmitButton>{"スレッドを作成する"}</SubmitButton>
          </div>
          {state.message && <div>{state.message}</div>}
        </div>
      </form>
    </Card>
  )
}

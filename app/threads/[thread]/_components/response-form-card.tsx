"use client"

import { SubmitButton } from "@/app/_components/submit-button"
import { createResponse } from "@/app/threads/[thread]/_actions/create-response"
import { Card, TextField } from "@radix-ui/themes"
import { useFormState } from "react-dom"

type Props = {
  threadId: string
}

export const ResponseFormCard = (props: Props) => {
  const [state, formAction] = useFormState(createResponse, {})

  return (
    <Card asChild variant="classic">
      <form action={formAction}>
        <div className={"flex flex-col gap-2"}>
          <input type="hidden" name="thread_id" value={props.threadId} />
          <TextField.Input
            variant="classic"
            name="text"
            placeholder="テキスト"
          />
          <div className="card-actions justify-end">
            <SubmitButton>{"レスポンスを追加する"}</SubmitButton>
          </div>
          {state.message && <div>{state.message}</div>}
        </div>
      </form>
    </Card>
  )
}

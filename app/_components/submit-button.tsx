"use client"

import { Button } from "@radix-ui/themes"
import { useFormStatus } from "react-dom"

type Props = {
  className?: string
  children: React.ReactNode
}

export const SubmitButton = (props: Props) => {
  const { pending } = useFormStatus()

  return (
    <Button
      className={props.className}
      variant="classic"
      type="submit"
      disabled={pending}
    >
      {props.children}
    </Button>
  )
}

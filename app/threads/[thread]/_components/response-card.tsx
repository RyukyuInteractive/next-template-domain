import { Card } from "@radix-ui/themes"

type Props = {
  text: string
  index: number
  updatedAt: Date
}

export const ResponseCard = (props: Props) => {
  return (
    <Card variant="classic">
      <div className="flex items-center justify-between">
        <h2>{`${props.index} ${props.text}`}</h2>
      </div>
      <p className="text-sm">{props.updatedAt.toDateString()}</p>
    </Card>
  )
}

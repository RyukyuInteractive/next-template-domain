import { ArrowRightIcon } from "@radix-ui/react-icons"
import { Card } from "@radix-ui/themes"

type Props = {
  text: string
  count: number
  updatedAt: Date
}

export const ThreadCard = (props: Props) => {
  return (
    <Card variant="classic">
      <div className="flex items-center justify-between">
        <h2 className="font-bold">{`${props.text} +${props.count}`}</h2>
        <ArrowRightIcon />
      </div>
      <p className="text-sm">{props.updatedAt.toDateString()}</p>
    </Card>
  )
}

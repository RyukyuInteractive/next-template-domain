import { ResponseCard } from "@/app/threads/[thread]/_components/response-card"
import { ResponseFormCard } from "@/app/threads/[thread]/_components/response-form-card"
import { database } from "@/lib/database"
import { Button } from "@radix-ui/themes"
import Link from "next/link"

type Props = {
  params: {
    thread: string
  }
}

export default async function ThreadPage(props: Props) {
  const thread = await database.threads.findUnique({
    where: { nanoid: props.params.thread },
    include: {
      _count: { select: { responses: true } },
      responses: { orderBy: { created_at: "asc" } },
    },
  })

  if (thread === null) {
    return (
      <main>
        <p>{"スレッドが見つかりませんでした"}</p>
      </main>
    )
  }

  return (
    <main className={"w-full max-w-xl mx-auto p-8 space-y-4"}>
      <div>
        <Link href={"/"}>
          <Button variant="classic">{"ホーム"}</Button>
        </Link>
      </div>
      <h1 className="text-lg font-bold">{thread.text}</h1>
      <ul className="space-y-2">
        {thread.responses.map((response, index) => (
          <li key={response.id}>
            <ResponseCard
              text={response.text}
              index={index}
              updatedAt={response.updated_at}
            />
          </li>
        ))}
      </ul>
      <ResponseFormCard threadId={thread.nanoid} />
    </main>
  )
}

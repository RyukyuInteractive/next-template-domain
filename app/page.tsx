import { ThreadCard } from "@/app/_components/thread-card"
import { ThreadFormCard } from "@/app/_components/thread-form-card"
import { database } from "@/lib/database"
import Link from "next/link"

const HomePage = async () => {
  const threads = await database.threads.findMany({
    orderBy: { updated_at: "desc" },
    include: { _count: { select: { responses: true } } },
  })

  return (
    <main className={"w-full max-w-xl mx-auto p-8 space-y-4"}>
      <ThreadFormCard />
      <ul className="space-y-2">
        {threads.map((thread) => (
          <li key={thread.id}>
            <Link href={`/threads/${thread.nanoid}`}>
              <ThreadCard
                text={thread.text}
                count={thread._count.responses}
                updatedAt={thread.updated_at}
              />
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default HomePage

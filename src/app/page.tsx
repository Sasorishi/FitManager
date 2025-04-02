import Image from "next/image";
import { userService } from "@/services/userService";
import { User as UserInterface } from "@/types/user";
import UserTable from "@/components/user-table";

export default async function Home() {
  const users: UserInterface[] = await userService.getUsers(5);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <UserTable users={users} />
      </main>
    </div>
  );
}

"use client";
import { useRouter } from "next/navigation";
import { User as UserInterface } from "@/types/user";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function UserTable({ users }: { users: UserInterface[] }) {
  const router = useRouter();

  return (
    <Table>
      <TableCaption>Liste des utilisateurs.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Nom</TableHead>
          <TableHead>Prénom</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-right">Montant</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow
            key={user.id}
            onClick={() => router.push(`/users/${user.id}`)}
            className="cursor-pointer hover:bg-gray-100 transition"
          >
            <TableCell className="font-medium">
              {user.name.split(" ")[1]}
            </TableCell>
            <TableCell>{user.name.split(" ")[0]}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className="text-right">
              ${(Math.random() * 1000).toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

interface Resident {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  preferredName: string;
  status: string;
  room: string;
  levelOfCare: string;
  ambulation: string;
  birthDate: string;
  moveInDate: string;
  createdAt: string;
  updatedAt: string;
  applicantId: number | null;
  attendance: any[];
}

export default async function Home() {
  const session = await getServerAuthSession();

  const residents = await api.welbi.fetchResidents();

  console.log("Residents:", residents);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Welbi <span className="text-[hsl(280,100%,70%)]">T3</span> App
        </h1>
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl text-white">
              {session && <span>Logged in as {session.user?.name}</span>}
            </p>
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </div>
        </div>

        <div className="w-full max-w-4xl">
          <h2 className="mb-4 text-2xl">Residents</h2>
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden shadow">
                <table className="min-w-full table-fixed divide-y divide-gray-200 dark:divide-gray-600">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
                      >
                        Preferred Name
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
                      >
                        Room
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
                      >
                        Level of Care
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                    {residents?.map((resident: Resident) => (
                      <tr
                        key={resident.id}
                        className="hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <td className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                          {resident.firstName} {resident.lastName}
                        </td>
                        <td className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                          {resident.preferredName}
                        </td>
                        <td className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <div
                              className={`mr-2 h-2.5 w-2.5 rounded-full ${resident.status === "HERE" ? "bg-green-400" : "bg-red-500"}`}
                            ></div>
                            {resident.status}
                          </div>
                        </td>
                        <td className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                          {resident.room}
                        </td>
                        <td className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                          {resident.levelOfCare}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

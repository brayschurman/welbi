"use client";

import { format } from "date-fns";
import Link from "next/link";
import { type Program } from "~/schema/welbi.schema";
import { api } from "~/trpc/react";

export default function Programs() {
  const {
    data: programs,
    error,
    isPending,
  } = api.welbi.fetchPrograms.useQuery();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="ml-64 overflow-x-auto py-20">
      <div className="mx-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Programs
        </h1>
        <Link
          href="/programs/create"
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Create Program
        </Link>
      </div>

      <div className="inline-block min-w-full pt-4 align-middle">
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
                  Start
                </th>
                <th
                  scope="col"
                  className="p-4 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
                >
                  Location
                </th>
                <th
                  scope="col"
                  className="p-4 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
                >
                  Attendance
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
              {programs?.map((program: Program) => (
                <tr
                  key={program.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <td className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                    <Link
                      className="cursor-pointer font-bold text-blue-500 hover:text-blue-400 dark:text-blue-300 dark:hover:text-blue-300"
                      href={{
                        pathname: `/programs/${program.id}`,
                        query: {
                          programId: program.id,
                          programName: program.name,
                          programStart: program.start,
                          programLocation: program.location,
                          programAttendance: program.attendance.length,
                        },
                      }}
                    >
                      {program.name}
                    </Link>
                  </td>

                  <td className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                    {format(new Date(program.start), "MMMM do, yyyy, h:mm a")}
                  </td>
                  <td className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                    {program.location}
                  </td>
                  <td className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col">
                      {program.attendance.length}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

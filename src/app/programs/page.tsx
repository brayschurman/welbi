"use client";

import Link from "next/link";
import { api } from "~/trpc/react";

interface Program {
  allDay: boolean;
  applicantId: number | null;
  attendance: any[];
  createdAt: string;
  dimension: string;
  end: string;
  facilitators: string[];
  hobbies: string[];
  id: number;
  isRepeated: boolean;
  levelOfCare: string[];
  location: string;
  name: string;
  parentId: number | null;
  recurrence: any;
  start: string;
  tags: string[];
  updatedAt: string;
}

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

  console.log(programs);

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
                    {program.name}
                  </td>

                  <td className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                    {program.start}
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

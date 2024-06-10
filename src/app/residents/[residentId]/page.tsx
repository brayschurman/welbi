"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Program } from "~/schema/welbi.schema";
import { api } from "~/trpc/react";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";

export default function ProgramDetails({}: {}) {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams);

  const queryClient = useQueryClient();

  const attendProgram = api.welbi.attendProgram.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

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

  const prepareIds = (ids: { programId: number; residentId: string }) => {
    // convert residentId to number
    const residentId = parseInt(ids.residentId);
    const programId = ids.programId;

    if (!programId || !residentId) {
      return;
    }

    attendProgram.mutate({ programId, residentId });
  };

  const residentPrograms = programs.filter((program: Program) =>
    program.attendance.some(
      (att) => Number(att.residentId) === Number(params.residentId),
    ),
  );

  const availablePrograms = programs.filter((program: Program) =>
    program.attendance.every(
      (att) => Number(att.residentId) !== Number(params.residentId),
    ),
  );

  return (
    <div className="ml-64 overflow-x-auto py-20">
      <div className="mx-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Resident Details
        </h1>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          {params.residentName}
        </h2>
      </div>

      <div className="my-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          Current Enrolled Programs
        </h3>
        <div>
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
              {residentPrograms.map((program: Program) => (
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

      <div className="my-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          Available Programs
        </h3>
        <div>
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
              {availablePrograms.map((program: Program) => (
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
                      <button
                        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                        onClick={() => {
                          prepareIds({
                            programId: program.id,
                            residentId: params.residentId ?? "",
                          });
                        }}
                      >
                        Attend
                      </button>
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

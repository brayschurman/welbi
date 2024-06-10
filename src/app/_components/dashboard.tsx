"use client";

import { format } from "date-fns";
import Link from "next/link";
import { api } from "~/trpc/react";

import type { Program } from "~/schema/welbi.schema";
export default function Dashboard() {
  const {
    data: programs,
    error,
    isPending,
  } = api.welbi.fetchPrograms.useQuery();

  const submitCode = api.welbi.sendRepositoryLink.useMutation({
    onSuccess: (data) => {
      console.log("Response from finish endpoint:", data);
      alert("Repository link sent successfully!");
    },
    onError: (error) => {
      console.error("Error sending repository link:", error.message);
      alert("Error sending repository link");
    },
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const upcomingPrograms = programs.filter((program: Program) => {
    return new Date(program.start).getTime() >= new Date().getTime();
  });

  return (
    <div className="ml-64 w-1/2 py-20">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
        Upcoming Programs
      </h1>
      <div className="mt-4 grid grid-cols-1 gap-4">
        {upcomingPrograms.map((program: Program) => {
          return (
            <Link
              key={program.id}
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
              <div
                key={program.id}
                className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800"
              >
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  {program.name}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  {format(new Date(program.start), "MMMM d, yyyy h:mm a")}
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  {program.attendance.length} attending
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      <button
        className="fixed bottom-10 right-10 rounded-full bg-white/10 px-10 py-3 text-gray-900 no-underline transition hover:bg-white/20"
        onClick={() => {
          submitCode.mutate();
        }}
      >
        ✅ Finish
      </button>
    </div>
  );
}

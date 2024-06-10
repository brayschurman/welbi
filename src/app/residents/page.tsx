"use client";

import { api } from "~/trpc/react";
import { Resident } from "../../schema/welbi.schema";
import Link from "next/link";

export default function Residents() {
  const {
    data: residents,
    error,
    isPending,
  } = api.welbi.fetchResidents.useQuery();

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
          Residents
        </h1>
        <Link
          href="/residents/create"
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Create Resident
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
                {/* <th
                scope="col"
                className="p-4 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
              >
                Preferred Name
              </th> */}
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
                  {/* <td className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                  {resident.preferredName}
                </td> */}
                  <td className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <div
                        className={`mr-2 h-2.5 w-2.5 rounded-full ${
                          resident.status === "HERE"
                            ? "bg-green-400"
                            : resident.status === "ISOLATION"
                              ? "bg-orange-400"
                              : resident.status === "LOA"
                                ? "bg-blue-400"
                                : "bg-red-500"
                        }`}
                      ></div>
                      {resident.status}
                    </div>
                  </td>
                  <td className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                    {resident.room}
                  </td>
                  <td className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                    <div
                      className={`inline-block rounded-full px-2 py-1  ${
                        resident.levelOfCare === "MEMORY"
                          ? "bg-purple-200"
                          : resident.levelOfCare === "INDEPENDENT"
                            ? "bg-green-200"
                            : resident.levelOfCare === "ASSISTED"
                              ? "bg-yellow-200"
                              : resident.levelOfCare === "LONGTERM"
                                ? "bg-red-200"
                                : "bg-gray-200"
                      }`}
                    >
                      {resident.levelOfCare}
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

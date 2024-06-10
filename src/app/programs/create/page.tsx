"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";

export default function CreateProgram() {
  const router = useRouter();

  const [name, setName] = useState("Swimming with Bob");
  const [location, setLocation] = useState("Multipurpose Room");
  const [allDay, setAllDay] = useState(false);
  const [start, setStart] = useState("2024-05-27T11:15:00.000Z");
  const [end, setEnd] = useState("2024-05-27T12:00:00.000Z");
  const [tags, setTags] = useState(["Fitness"]);
  const [dimension, setDimension] = useState("Physical");
  const [facilitators, setFacilitators] = useState(["Active Living Assistant"]);
  const [levelOfCare, setLevelOfCare] = useState(["Independent"]);
  const [hobbies, setHobbies] = useState([
    "Stretching",
    "Aerobics",
    "Exercice",
  ]);

  const createProgram = api.welbi.createProgram.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
      setLocation("");
      setAllDay(false);
      setStart("");
      setEnd("");
      setTags([""]);
      setDimension("");
      setFacilitators([""]);
      setLevelOfCare([""]);
      setHobbies([""]);
    },
  });

  return (
    <div className="ml-64 overflow-x-auto py-20">
      <div className="mx-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Create Program
        </h1>
        {/* <Link
          href="/residents/create"
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Create Resident
        </Link> */}
      </div>
      {/* <Link
        href="/residents"
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Back
      </Link> */}

      <div className="inline-block min-w-full pt-4 align-middle">
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const programData = {
              name,
              location,
              allDay,
              start,
              end,
              tags,
              dimension,
              facilitators,
              levelOfCare,
              hobbies,
              recurrence: {},
              isRepeated: false,
            };
            createProgram.mutate(programData);
          }}
          className="mx-auto max-w-sm"
        >
          <label htmlFor="name" className="text-white">
            Name
          </label>
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Swimming with Bob"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Location
            </label>
            <input
              type="text"
              id="location"
              className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Multipurpose Room"
              required
              onChange={(e) => setLocation(e.target.value)}
              value={location}
            />
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              All Day
            </label>
            <input
              type="checkbox"
              id="all-day"
              className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              onChange={(e) => setAllDay(e.target.checked)}
              checked={allDay}
            />
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Start
            </label>
            <input
              type="datetime-local"
              id="start"
              className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              required
              onChange={(e) => setStart(e.target.value)}
              value={start}
            />
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              End
            </label>
            <input
              type="datetime-local"
              id="end"
              className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              required
              onChange={(e) => setEnd(e.target.value)}
              value={end}
            />
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Fitness"
              required
              onChange={(e) => setTags(e.target.value.split(","))}
              value={tags}
            />
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Dimension
            </label>
            <input
              type="text"
              id="dimension"
              className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Physical"
              required
              onChange={(e) => setDimension(e.target.value)}
              value={dimension}
            />
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Facilitators
            </label>
            <input
              type="text"
              id="facilitators"
              className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Active Living Assistant"
              required
              onChange={(e) => setFacilitators(e.target.value.split(","))}
              value={facilitators}
            />
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Level of Care
            </label>
            <input
              type="text"
              id="level-of-care"
              className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Independent"
              required
              onChange={(e) => setLevelOfCare(e.target.value.split(","))}
              value={levelOfCare}
            />
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Hobbies
            </label>
            <input
              type="text"
              id="hobbies"
              className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Stretching, Aerobics, Exercice"
              required
              onChange={(e) => setHobbies(e.target.value.split(","))}
              value={hobbies}
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            disabled={createProgram.isPending}
          >
            {createProgram.isPending ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

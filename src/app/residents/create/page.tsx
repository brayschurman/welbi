"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";

export default function CreateResident() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [name, setName] = useState("");
  const [preferredName, setPreferredName] = useState("");
  const [room, setRoom] = useState("");
  const [levelOfCare, setLevelOfCare] = useState("");
  const [status, setStatus] = useState("");
  const [ambulation, setAmbulation] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [moveInDate, setMoveInDate] = useState("");

  // for testing
  // const [firstName, setFirstName] = useState("Johnny");
  // const [lastName, setLastName] = useState("Doe");
  // const [name, setName] = useState("Johnny Doe");
  // const [preferredName, setPreferredName] = useState("John");
  // const [room, setRoom] = useState("222");
  // const [levelOfCare, setLevelOfCare] = useState("INDEPENDENT");
  // const [status, setStatus] = useState("HERE");
  // const [ambulation, setAmbulation] = useState("CANE");
  // const [birthDate, setBirthDate] = useState("1922-01-01");
  // const [moveInDate, setMoveInDate] = useState("2022-01-02");

  const createResident = api.welbi.createResident.useMutation({
    onSuccess: () => {
      router.refresh();
      setFirstName("");
      setLastName("");
      setName("");
      setPreferredName("");
      setRoom("");
      setLevelOfCare("");
      setStatus("");
      setAmbulation("");
      setBirthDate("");
      setMoveInDate("");
    },
  });

  return (
    <div className="ml-64 overflow-x-auto py-20">
      <div className="mx-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Create Resident
        </h1>
      </div>

      <div className="inline-block min-w-full pt-4 align-middle">
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const residentData = {
              firstName,
              lastName,
              name,
              preferredName,
              room,
              levelOfCare,
              status,
              ambulation,
              birthDate,
              moveInDate,
            };
            createResident.mutate(residentData);
          }}
          className="mx-auto max-w-sm"
        >
          <label htmlFor="name" className="text-white">
            Name
          </label>
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              First Name
            </label>
            <input
              type="text"
              id="first-name"
              className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="John"
              required
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Last Name
            </label>
            <input
              type="text"
              id="last-name"
              className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Doe"
              required
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Preferred Name
            </label>
            <input
              type="text"
              id="preferred-name"
              className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Johnny"
              required
              onChange={(e) => setPreferredName(e.target.value)}
              value={preferredName}
            />
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Room
            </label>
            <input
              type="text"
              id="room"
              className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="123"
              required
              onChange={(e) => setRoom(e.target.value)}
              value={room}
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
              placeholder="Assisted Living"
              required
              onChange={(e) => setLevelOfCare(e.target.value)}
              value={levelOfCare}
            />
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Status
            </label>
            <input
              type="text"
              id="status"
              className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Here"
              required
              onChange={(e) => setStatus(e.target.value)}
              value={status}
            />
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Ambulation
            </label>
            <input
              type="text"
              id="ambulation"
              className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Independent"
              required
              onChange={(e) => setAmbulation(e.target.value)}
              value={ambulation}
            />
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              required
              onChange={(e) => setBirthDate(e.target.value)}
              value={birthDate}
            />
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Date of Admission
            </label>
            <input
              type="date"
              id="doa"
              className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              required
              onChange={(e) => setMoveInDate(e.target.value)}
              value={moveInDate}
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            disabled={createResident.isPending}
          >
            {createResident.isPending ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

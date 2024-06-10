import { getServerAuthSession } from "~/server/auth";
import Dashboard from "./_components/dashboard";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const session = await getServerAuthSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b">
      {session ? (
        <Dashboard />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <Image
            src="https://cdn.prod.website-files.com/5b7db1b8967d853207bb4b0e/614a16a6e48522e96d9d9460_welbi-logo-header.svg"
            className=""
            alt="Welbi Logo"
            width={400}
            height={80}
          />
          <p className="mt-4 text-2xl text-gray-500 dark:text-gray-400">
            The Bray Schurman Version
          </p>
          <Link
            href="/api/auth/signin"
            className="mt-4 rounded-lg bg-blue-500 px-8 py-4 font-bold text-white hover:bg-blue-600"
          >
            Sign in
          </Link>
        </div>
      )}
    </main>
  );
}

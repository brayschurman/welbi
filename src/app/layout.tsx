import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";
import Image from "next/image";
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

export const metadata = {
  title: "Welbi",
  description: "Welbook",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <nav className="fixed top-0 z-50 w-full border-gray-200 bg-white dark:bg-gray-900">
          <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-center space-x-4 p-4">
            <Image
              src="https://cdn.prod.website-files.com/5b7db1b8967d853207bb4b0e/614a16a6e48522e96d9d9460_welbi-logo-header.svg"
              className="h-8"
              alt="Welbi Logo"
              width={200}
              height={40}
            />
            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-default"
            >
              <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:dark:bg-gray-900">
                <li></li>
                <li>
                  <p className="block rounded px-3 py-2 text-gray-400 md:border-0 md:p-0  dark:text-white">
                    {session && <span>Logged in as {session.user?.name}</span>}
                  </p>
                </li>
                <li>
                  <Link
                    href={session ? "/api/auth/signout" : "/api/auth/signin"}
                    className="rounded-full bg-white/10 px-10 py-3 text-gray-900 no-underline transition hover:bg-white/20"
                  >
                    {session ? "Sign out" : "Sign in"}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <aside
          id="default-sidebar"
          className="fixed left-0 top-12 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full overflow-y-auto  px-3 py-4">
            <ul className="space-y-2 font-medium">
              <li>
                <Link
                  href="/dashboard"
                  className="group flex items-center rounded-lg p-2 text-gray-900  dark:text-white"
                >
                  <svg
                    className="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="ms-3">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/residents"
                  className="group flex items-center rounded-lg p-2 text-gray-900  dark:text-white"
                >
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                  </svg>

                  <span className="ms-3 flex-1 whitespace-nowrap">
                    Residents
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/programs"
                  className="group flex items-center rounded-lg p-2 text-gray-900  dark:text-white"
                >
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 18"
                  >
                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                  </svg>
                  <span className="ms-3 flex-1 whitespace-nowrap">
                    Programs
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}

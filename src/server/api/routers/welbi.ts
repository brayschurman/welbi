import axios from "axios";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { getServerAuthSession } from "~/server/auth";

const fetchResidents = async () => {
  const session = await getServerAuthSession();
  if (!session?.user?.token) {
    throw new Error("No token specified");
  }

  const response = await axios.get("https://welbi.org/api/residents", {
    headers: {
      Authorization: `Bearer ${session.user.token}`,
    },
  });

  return response.data;
};

export const welbiRouter = createTRPCRouter({
  fetchResidents: protectedProcedure.query(async () => {
    return await fetchResidents();
  }),
});

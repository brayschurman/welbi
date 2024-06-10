import { z } from "zod";
import axios from "axios";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
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
  fetchResidents: publicProcedure.query(async () => {
    return await fetchResidents();
  }),
});

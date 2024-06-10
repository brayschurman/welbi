import axios from "axios";
import { CreateResident, createResidentSchema } from "~/schema/welbi.schema";
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

const createResident = async (resident: CreateResident) => {
  const session = await getServerAuthSession();
  if (!session?.user?.token) {
    throw new Error("No token specified");
  }

  try {
    const response = await axios.post(
      "https://welbi.org/api/residents",
      resident,
      {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error occurred while creating resident:",
      error.response.data,
    );
    throw error;
  }
};
const fetchPrograms = async () => {
  const session = await getServerAuthSession();
  if (!session?.user?.token) {
    throw new Error("No token specified");
  }

  const response = await axios.get("https://welbi.org/api/programs", {
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
  createResident: protectedProcedure
    .input(createResidentSchema)
    .mutation(async ({ input }) => {
      return await createResident(input);
    }),
  fetchPrograms: protectedProcedure.query(async () => {
    return await fetchPrograms();
  }),
});

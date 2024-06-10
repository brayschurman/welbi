import axios from "axios";
import { z } from "zod";
import {
  type CreateProgram,
  createProgramSchema,
  type CreateResident,
  createResidentSchema,
  type Program,
  type Resident,
} from "~/schema/welbi.schema";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { getServerAuthSession } from "~/server/auth";

const fetchResidents = async () => {
  const session = await getServerAuthSession();
  if (!session?.user?.token) {
    throw new Error("No token specified");
  }

  const response: { data: Resident[] } = await axios.get(
    "https://welbi.org/api/residents",
    {
      headers: {
        Authorization: `Bearer ${session.user.token}`,
      },
    },
  );

  return response.data;
};

const createResident = async (resident: CreateResident): Promise<Resident> => {
  const session = await getServerAuthSession();
  if (!session?.user?.token) {
    throw new Error("No token specified");
  }

  try {
    const response: { data: Resident } = await axios.post(
      "https://welbi.org/api/residents",
      resident,
      {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      },
    );

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error occurred while creating resident:", error.message);
    }
    throw error;
  }
};

const fetchPrograms = async (): Promise<Program[]> => {
  const session = await getServerAuthSession();
  if (!session?.user?.token) {
    throw new Error("No token specified");
  }

  const response: { data: Program[] } = await axios.get(
    "https://welbi.org/api/programs",
    {
      headers: {
        Authorization: `Bearer ${session.user.token}`,
      },
    },
  );

  const programs = response.data;

  programs.sort((a: Program, b: Program) => {
    return new Date(a.start).getTime() - new Date(b.start).getTime();
  });

  return programs;
};

const createProgram = async (program: CreateProgram): Promise<Program> => {
  const session = await getServerAuthSession();
  if (!session?.user?.token) {
    throw new Error("No token specified");
  }

  try {
    const response: { data: Program } = await axios.post(
      "https://welbi.org/api/programs",
      program,
      {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      },
    );

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error occurred while creating program:", error.message);
    }
    throw error;
  }
};

const attendProgram = async (programId: number, residentId: number) => {
  const session = await getServerAuthSession();
  if (!session?.user?.token) {
    throw new Error("No token specified");
  }

  try {
    const response: { data: unknown } = await axios.post(
      `https://welbi.org/api/programs/${programId}/attend`,
      { residentId, status: "Active" },
      {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      },
    );

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error occurred while attending program:", error.message);
    }

    throw error;
  }
};

const sendRepositoryLink = async () => {
  const repositoryUrl = "https://github.com/brayschurman/welbi";

  try {
    const response: { data: unknown } = await axios.post(
      "https://welbi.org/api/finish",
      { url: repositoryUrl },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        "Error occurred while sending repository link:",
        error.message,
      );
    }
    throw error;
  }
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
  createProgram: protectedProcedure
    .input(createProgramSchema)
    .mutation(async ({ input }) => {
      return await createProgram(input);
    }),
  attendProgram: protectedProcedure
    .input(z.object({ programId: z.number(), residentId: z.number() }))
    .mutation(async ({ input }) => {
      return await attendProgram(input.programId, input.residentId);
    }),
  sendRepositoryLink: protectedProcedure.mutation(async () => {
    return await sendRepositoryLink();
  }),
});

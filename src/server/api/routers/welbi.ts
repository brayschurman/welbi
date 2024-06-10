import axios from "axios";
import { z } from "zod";
import {
  CreateProgram,
  CreateResident,
  Program,
  createProgramSchema,
  createResidentSchema,
} from "~/schema/welbi.schema";
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

  const programs = response.data;

  // Sort the programs by start date
  programs.sort((a: Program, b: Program) => {
    return new Date(a.start).getTime() - new Date(b.start).getTime();
  });

  //filter out the programs that have already passed
  // const now = new Date();
  // const filteredPrograms = programs.filter((program: Program) => {
  //   return new Date(program.start).getTime() >= now.getTime();
  // });

  return programs;
};

const createProgram = async (program: CreateProgram) => {
  const session = await getServerAuthSession();
  if (!session?.user?.token) {
    throw new Error("No token specified");
  }

  try {
    const response = await axios.post(
      "https://welbi.org/api/programs",
      program,
      {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error occurred while creating program:",
      error.response.data,
    );
    throw error;
  }
};

const attendProgram = async (programId: number, residentId: number) => {
  const session = await getServerAuthSession();
  if (!session?.user?.token) {
    throw new Error("No token specified");
  }

  try {
    const response = await axios.post(
      `https://welbi.org/api/programs/${programId}/attend`,
      { residentId, status: "Active" },
      {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error occurred while attending program:",
      error.response.data,
    );
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
});

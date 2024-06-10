import { z } from "zod";

export const readResidentSchema = z.object({
  id: z.number(),
  name: z.string().min(2).max(40),
  firstName: z.string().min(2).max(40),
  lastName: z.string().min(2).max(40),
  preferredName: z.string().min(2).max(40),
  status: z.string().min(2).max(40),
  room: z.string().min(2).max(40),
  levelOfCare: z.string().min(2).max(40),
  ambulation: z.string().min(2).max(40),
  birthDate: z.string().min(2).max(40),
  moveInDate: z.string().min(2).max(40),
  createdAt: z.string().min(2).max(40),
  updatedAt: z.string().min(2).max(40),
  applicantId: z.number().nullable(),
  attendance: z.array(z.any()),
});
export type Resident = z.TypeOf<typeof readResidentSchema>;

export const createResidentSchema = z.object({
  firstName: z.string().min(2).max(40),
  lastName: z.string().min(2).max(40),
  name: z.string().min(2).max(40),
  preferredName: z.string().min(2).max(40),
  status: z.string().min(2).max(40),
  room: z.string().min(2).max(40),
  levelOfCare: z.string().min(2).max(40),
  ambulation: z.string().min(2).max(40),
  birthDate: z.string().min(2).max(40),
  moveInDate: z.string().min(2).max(40),
});
export type CreateResident = z.TypeOf<typeof createResidentSchema>;

export const readProgramSchema = z.object({
  id: z.number(),
  parentId: z.number().nullable(),
  name: z.string().min(2).max(40),
  location: z.string().min(2).max(40),
  allDay: z.boolean(),
  start: z.string().min(2).max(40),
  end: z.string().min(2).max(40),
  tags: z.array(z.string()),
  createdAt: z.string().min(2).max(40),
  updatedAt: z.string().min(2).max(40),
  dimension: z.string().min(2).max(40),
  facilitators: z.array(z.string()),
  levelOfCare: z.array(z.string()),
  hobbies: z.array(z.string()),
  recurrence: z.any(),
  isRepeated: z.boolean(),
  applicantId: z.number().nullable(),
  attendance: z.array(z.any()),
});
export type Program = z.TypeOf<typeof readProgramSchema>;

export const createProgramSchema = z.object({
  name: z.string().min(2).max(40),
  location: z.string().min(2).max(40),
  allDay: z.boolean(),
  start: z.string().min(2).max(40),
  end: z.string().min(2).max(40),
  tags: z.array(z.string()),
  dimension: z.string().min(2).max(40),
  facilitators: z.array(z.string()),
  levelOfCare: z.array(z.string()),
  hobbies: z.array(z.string()),
  recurrence: z.any(),
  isRepeated: z.boolean(),
});
export type CreateProgram = z.TypeOf<typeof createProgramSchema>;

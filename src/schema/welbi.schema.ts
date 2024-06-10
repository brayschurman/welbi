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

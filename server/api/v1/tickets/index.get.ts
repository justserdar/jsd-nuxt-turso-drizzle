import { tickets } from "~/server/database/schema";
import { orm } from "~/server/utils/db";

export default defineEventHandler(async () => {
  try {
    const allTickets = await orm.select().from(tickets).all();
    return { ...allTickets }
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});
import { tickets } from "../../database/schema";
import { orm } from "../../utils/db";

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
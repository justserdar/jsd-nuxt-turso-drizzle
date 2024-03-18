import { tickets } from "~/server/database/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const ticketId = getQuery(event).id as string;
		if(!ticketId) throw createError({
      statusCode: 400,
      statusMessage: "Ticket ID is required",
    });
    const allTickets = orm
      .delete(tickets)
      .where(eq(tickets.id, parseInt(ticketId)))
      .run();
    return { tickets: allTickets };
		/* or 
		return {
      statusCode: 200,
      statusMessage: "Success",
    } 
		*/
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});
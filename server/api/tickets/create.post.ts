import { tickets, InsertTicket } from "../../database/schema";
import { orm } from "../../utils/db";


export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const newTicket: InsertTicket = {
      ...body
    }
    const result = orm.insert(tickets).values(newTicket).run();
    return { newTicket : result}
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
	});
  }	
})
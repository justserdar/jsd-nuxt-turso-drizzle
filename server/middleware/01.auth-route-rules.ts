export default defineEventHandler(async (event) => { 
    if(event.path.includes('resources')) {
        if (!event.context.user || !event.context.session) {
            throw createError({
                statusCode: 401
            });
        }
    }
})
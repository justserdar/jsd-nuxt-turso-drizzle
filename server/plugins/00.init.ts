export default defineNitroPlugin(async () => {
    if (process.env.devDatabase) {
        console.group('> Task', 'db:migrate')
        const taskResult = await runTask('db:migrate')
        console.group(taskResult.result)
    }
})
export default defineNitroPlugin(async () => {
    if (process.env.devDatabase) {
        console.group('> Task', 'db:migrate')
        const task = await runTask('db:migrate')
        console.group(task.result)
    }
})
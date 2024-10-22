module.exports = (program, { addTask, updateTask, deleteTask, markTask, listTasks }) => {
    // Set up CLI commands
    program.version("1.0.0").description("Task Management CLI");

    // Add task command
    program.command("add <task>").description("Add a new task").action(addTask);

    // Update task command
    program
        .command("update <id> <newDescription>")
        .description("Update an existing task")
        .action((id, newDescription) => updateTask(parseInt(id), newDescription));

    // Delete task command
    program
        .command("delete <id>")
        .description("Delete a task by ID")
        .action((id) => deleteTask(parseInt(id)));

    // Mark a task as in-progress
    program
        .command("mark-in-progress <id>")
        .description("Mark a task as in-progress")
        .action((id) => markTask(parseInt(id), "in-progress"));

    // Mark a task as done
    program
        .command("mark-done <id>")
        .description("Mark a task as done")
        .action((id) => markTask(parseInt(id), "done"));

    // List tasks command
    program
        .command("list [status]")
        .description("List all tasks or filter by status (todo, done, in-progress)")
        .action((status) => listTasks(status));

    // Handle unknown commands
    program.on("command:*", () => {
        console.error(
            `Invalid command: ${program.args.join(
                " "
            )}\nSee --help for a list of available commands.`
        );
        process.exit(1);
    });

    // Parse the arguments
    program.parse(process.argv);
};

#!/usr/bin/env node

const fs = require("fs");
const inquirer = require("inquirer");
const { Command } = require("commander");
const chalk = require("chalk");

const program = new Command();
const TASK_FILE = "tasks.json";

const loadTask = () => {
    if (!fs.existsSync(TASK_FILE)) {
        return [];
    }
    const data = fs.readFileSync(TASK_FILE);
    return JSON.parse(data);
};

const saveTask = (tasks) => {
    fs.writeFileSync(TASK_FILE, JSON.stringify(tasks, null, 2));
};

const addTask = async (taskName) => {
    try {
        if (!taskName) {
            // Prompt for task name if not provided
            const question = {
                name: "taskName",
                type: "input",
                message: "Enter task description:",
            };
            const { taskName: inputTaskName } = await inquirer.prompt(question);
            taskName = inputTaskName; // Use the input task name
        }

        const tasks = loadTask();
        tasks.push({ id: tasks.length + 1, task: taskName, completed: false });

        saveTask(tasks);
        console.log(chalk.green("Task added successfully!"));
    } catch (err) {
        console.error(chalk.red("An error occurred!"), err);
    }
};

const listTasks = () => {
    const tasks = loadTask();
    console.log(chalk.blue("Your tasks:"));
    tasks.forEach((task) => {
        const { id, task: taskName, completed } = task;
        console.log(`${completed ? chalk.green("✓") : chalk.red("✗")} ${id}. ${taskName}`);
    });
};

// Mark a task as completed
const completeTask = async () => {
    const tasks = loadTask();
    const choices = tasks.map((task) => ({
        name: task.task,
        value: task.id,
    }));

    const question = {
        name: "taskId",
        type: "list",
        message: "Select task to mark as completed:",
        choices,
    };

    const { taskId } = await inquirer.prompt(question);
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex > -1) {
        tasks[taskIndex].completed = true;
        saveTask(tasks);
        console.log(chalk.green("Task marked as completed!"));
    } else {
        console.log(chalk.red("Task not found!"));
    }
};

// Update a task
const updateTask = async () => {
    const tasks = loadTask();
    const choices = tasks.map((task) => ({
        name: task.task,
        value: task.id,
    }));

    const question = {
        name: "taskId",
        type: "list",
        message: "Select task to update:",
        choices,
    };

    const { taskId } = await inquirer.prompt(question);
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) {
        console.log(chalk.red("Task not found!"));
        return;
    }

    const newTaskDescription = {
        name: "newTaskDescription",
        type: "input",
        message: `Enter new description for task "${tasks[taskIndex].task}":`,
        default: tasks[taskIndex].task,
    };

    const { newTaskDescription: updatedDescription } = await inquirer.prompt(newTaskDescription);
    tasks[taskIndex].task = updatedDescription;
    saveTask(tasks);
    console.log(chalk.green(`Task ${taskId} updated successfully!`));
};

// Remove a task
const removeTask = async () => {
    const tasks = loadTask();
    const choices = tasks.map((task) => ({
        name: task.task,
        value: task.id,
    }));

    const question = {
        name: "taskId",
        type: "list",
        message: "Select task to remove:",
        choices,
    };

    const { taskId } = await inquirer.prompt(question);
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    saveTask(updatedTasks);
    console.log(chalk.green("Task removed successfully!"));
};

// Set up CLI commands
program.version("1.0.0").description("CLI Task Management System");

// Add command
program.command("add <taskName>").alias("-a").description("Add a task").action(addTask);

// List command
program.command("list").alias("-l").description("List all tasks").action(listTasks);

// Complete command
program
    .command("complete")
    .alias("-c")
    .description("Mark a task as completed")
    .action(completeTask);

// Update command
program.command("update").alias("-u").description("Update a task").action(updateTask);

// Remove command
program.command("remove").alias("-r").description("Remove a task").action(removeTask);

// Parse the command line arguments
program.parse(process.argv);

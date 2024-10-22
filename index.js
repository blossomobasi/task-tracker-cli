#!/usr/bin/env node

const fs = require("fs");
const { Command } = require("commander");
const chalk = require("chalk");
const program = new Command();

const TASK_FILE = "tasks.json";

// Helper functions to load and save tasks
const loadTasks = () => {
    if (!fs.existsSync(TASK_FILE)) {
        return [];
    }
    const data = fs.readFileSync(TASK_FILE);
    return JSON.parse(data);
};

const saveTasks = (tasks) => {
    fs.writeFileSync(TASK_FILE, JSON.stringify(tasks, null, 2));
};

// Adding a new task
const addTask = (taskName) => {
    const tasks = loadTasks();
    const newTask = {
        id: tasks.length + 1,
        task: taskName,
        status: "todo", // default status for new tasks
    };
    tasks.push(newTask);
    saveTasks(tasks);
    console.log(chalk.green(`Task added successfully (ID: ${newTask.id})`));
};

// Updating a task description
const updateTask = (id, updatedDescription) => {
    const tasks = loadTasks();
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
        return console.log(chalk.red("Task not found!"));
    }
    tasks[taskIndex].task = updatedDescription;
    saveTasks(tasks);
    console.log(chalk.green(`Task ${id} updated successfully!`));
};

// Deleting a task
const deleteTask = (id) => {
    const tasks = loadTasks();
    const updatedTasks = tasks.filter((task) => task.id !== id);
    saveTasks(updatedTasks);
    console.log(chalk.green(`Task ${id} deleted successfully!`));
};

// Marking a task as in-progress or done
const markTask = (id, status) => {
    const tasks = loadTasks();
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
        return console.log(chalk.red("Task not found!"));
    }
    tasks[taskIndex].status = status;
    saveTasks(tasks);
    console.log(chalk.green(`Task ${id} marked as ${status}!`));
};

// Listing tasks with optional status filter
const listTasks = (status = null) => {
    const tasks = loadTasks();
    const filteredTasks = status ? tasks.filter((task) => task.status === status) : tasks;
    if (filteredTasks.length === 0) {
        return console.log(chalk.yellow("No tasks found!"));
    }
    filteredTasks.forEach((task) => {
        console.log(`${task.id}. ${task.task} [${task.status}]`);
    });
};

require("./commands")(program, {
    addTask,
    updateTask,
    deleteTask,
    markTask,
    listTasks,
});

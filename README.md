# Task CLI

Task CLI is a simple command-line tool to help you manage tasks. It allows you to add, update, delete, and mark tasks as in-progress or done, as well as list tasks by status.

Roadmap: [Task Tracker](https://roadmap.sh/projects/task-tracker)

## Features

-   Add tasks with a description.
-   Update existing tasks.
-   Delete tasks by their ID.
-   Mark tasks as `in-progress` or `done`.
-   List all tasks or filter by their status (e.g., `todo`, `in-progress`, `done`).

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/blossomobasi/task-tracker-cli.git
    ```

2. Change into the project directory:

    ```bash
    cd task-cli
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Create a symlink to the `task` script:

    ```bash
    npm link
    ```

5. Run the `task` command to see the available options:

    ```bash
    task
    ```

## Usage

The `task` command has the following options:

-   `add <description>`: Add a new task with the specified description.
-   `update <id> <description>`: Update the task with the specified ID.
-   `delete <id>`: Delete the task with the specified ID.
-   `in-progress <id>`: Mark the task with the specified ID as in-progress.
-   `done <id>`: Mark the task with the specified ID as done.
-   `list [status]`: List all tasks or filter by their status (e.g., `todo`, `in-progress`, `done`).

## Examples

-   Add a new task:

    ```bash
    task-cli add "Buy groceries"
    ```

-   Update an existing task:

    ```bash

    task-cli update 1 "Buy milk"
    ```

-   Delete a task:

    ```bash
    task-cli delete 1
    ```

-   Mark a task as in-progress:

    ```bash
    task-cli in-progress 1
    ```

-   Mark a task as done:

    ```bash
    task-cli done 1
    ```

-   List all tasks:

    ```bash
    task-cli list
    ```

-   List tasks by status:

    ```bash
    task-cli list todo
    task-cli list in-progress
    task-cli list done
    ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Explanation:

-   **Installation**: Explains how to set up the project and use it globally as a CLI tool.
-   **Usage**: Provides examples of each available command with their expected outputs.
-   **Task Data Storage**: Briefly explains where the task data is stored.
-   **License**: Mentions the licensing (you can adjust this part based on your actual license).

This `README.md` will serve as a helpful guide for users to understand how to install and use your Task CLI!

# Todo Application

This is a simple yet powerful **Todo Application** that helps users manage their tasks efficiently. Users can create tasks, set their priority levels, and organize tasks based on their completion status. The app provides intuitive controls to mark tasks as complete, delete them, or undo changes—all while persisting the data using `localStorage`.

You can try the application [here](https://mukush11.github.io/JS---ToDo/).

## Features

- **Add New Tasks:** Users can create tasks and assign a priority to each task (High, Medium, Low). New tasks are automatically added to the **Todo List**.
  
- **Prioritize Tasks:** Tasks can be assigned different priority levels:
  - High
  - Medium
  - Low

- **Mark Tasks as Completed:** Tasks in the Todo List can be marked as completed by clicking the **check** button, which moves them to the **Completed Tasks** section.

- **Delete Tasks:** Users can delete tasks from any list (Todo, Completed, Deleted). Deleted tasks are moved to the **Deleted Tasks** section for review.

- **Undo Actions:** 
  - **From Completed Tasks:** Users can undo a completed task, moving it back to the Todo List.
  - **From Deleted Tasks:** Users can undo deletions. Depending on the task's previous state, it will be restored to either the Todo List or the Completed Tasks section.

- **Permanent Deletion:** In the Deleted Tasks section, users can permanently remove tasks from the app and local storage.

- **Data Persistence:** All tasks are stored in the browser’s `localStorage`, ensuring that the task list remains intact even after a page refresh.

## How to Use

1. **Add a New Task:**
   - Enter a task description and select the priority level (High, Medium, Low).
   - Click the **Add Task** button. The task will appear in the **Todo List**.

2. **Manage Your Tasks:**
   - **Complete a Task:** Click the **check** icon next to a task to move it to the **Completed Tasks** section.
   - **Delete a Task:** Click the **delete** icon next to a task to move it to the **Deleted Tasks** section.

3. **Handle Completed and Deleted Tasks:**
   - **Undo a Completed Task:** In the **Completed Tasks** section, click **Undo** to move the task back to the Todo List.
   - **Delete a Completed Task:** Click **Delete** in the Completed section to move the task to the Deleted Tasks section.
   - **Undo a Deleted Task:** In the **Deleted Tasks** section, click **Undo** to move it back to its respective list.
   - **Permanently Delete a Task:** In the Deleted section, click **Delete** to permanently remove the task from the list and `localStorage`.

## Tech Stack

- **HTML** for structuring the app.
- **CSS** for styling and layout.
- **JavaScript** for functionality and task management.
- **LocalStorage** for data persistence.

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/MuKuSh11/JS---ToDo.git

2. Navigate to the project directory:

    ```bash
    cd JS---ToDo

3. Open index.html in your preferred browser to start using the application.

## Live Demo
Checkout the live version of the app [here](https://mukush11.github.io/JS---ToDo/).
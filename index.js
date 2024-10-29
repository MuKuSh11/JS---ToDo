const addBtn = document.querySelector(".add-button");
const taskInput = document.querySelector(".task-input");
const taskPrioritySelect = document.getElementById("task-priority-select");
const todoTasksContainer = document.querySelector(".todo-list-container");
const completedTasksContainer = document.querySelector(".completed-tasks-list-container");
const deletedTasksContainer = document.querySelector(".deleted-tasks-list-container");

const sortPrioritySelect = document.querySelectorAll(".sort-priority-select");
const filterPrioritySelect = document.querySelectorAll(".filter-priority-select");

const priorities = [ "High", "Medium", "Low"];

let tasksListArray = [];

// fetch from localStorage
function fetchTaskArrayFromLocalStorage() {
    if( localStorage.getItem('tasks') ) {
        tasksListArray = JSON.parse(localStorage.getItem('tasks'));
    }
}
fetchTaskArrayFromLocalStorage();

// Display ToDo tasks
function initializeToDoTasksList() {
    if( tasksListArray ) {
        tasksListArray.forEach((task) => {
            if( ! task.isDeleted && ! task.isCompleted ) {
                addTaskToList(todoTasksContainer, task);
            }
        });
    }
}

// Display Completed tasks
function initializeCompletedTasksList() {
    if( tasksListArray ) {
        tasksListArray.forEach((task) => {
            if( task.isCompleted && ! task.isDeleted ) {
                addTaskToList(completedTasksContainer, task);
            }
        });
    }
}

// Display Deleted tasks
function initializeDeletedTasksList() {
    if( tasksListArray ) {
        tasksListArray.forEach((task) => {
            if( task.isDeleted ) {
                addTaskToList(deletedTasksContainer, task);
            }
        });
    }
}

// initialize all tasks
function initializeTasksList() {
    initializeToDoTasksList();
    initializeCompletedTasksList();
    initializeDeletedTasksList();
}
initializeTasksList();

// Initializing priority options dropdown
function initializePriorityOptionsList() {
    priorities.forEach((priority) => {
        const option = document.createElement("option");
        option.value = priority;
        option.innerText = priority;
        taskPrioritySelect.appendChild(option);
    })
}
initializePriorityOptionsList();

function initializeFilterAndSort() {
    for( let i=0 ; i<sortPrioritySelect.length ; i++ ) {
        priorities.forEach((priority) => {
            const option = document.createElement("option");
            option.value = priority;
            option.innerText = priority;
            sortPrioritySelect[i].appendChild(option);
        })
    }
    for( let i=0 ; i<filterPrioritySelect.length ; i++ ) {
        priorities.forEach((priority) => {
            const option = document.createElement("option");
            option.value = priority;
            option.innerText = priority;
            filterPrioritySelect[i].appendChild(option);
        })
    }
}
initializeFilterAndSort();


addBtn.addEventListener("click", () => {
    const taskValue = taskInput.value.trim();
    const taskPriority = taskPrioritySelect.value;
    if( taskValue ) {
        taskInput.value = "";
        taskPrioritySelect.value = "High";
        const taskID = shortid();
        processAddition(taskID, taskValue, taskPriority, false, false);
        const currTask = tasksListArray[tasksListArray.length - 1];
        addTaskToList(todoTasksContainer, currTask);
    }
});

// callback function for action button's event handling
function completeDeleteEventHandler(e) {
    const clickedItem = e.target;
    if( clickedItem.classList.contains("task-delete-button") ) {
        const targetTask = clickedItem.parentElement.parentElement;
        targetTask.classList.add("removing");
        setTimeout(() => {
            targetTask.remove();
        }, );
        processDeletion(targetTask);
    } else if( clickedItem.classList.contains("task-complete-button") ) {
        const targetTask = clickedItem.parentElement.parentElement;
        targetTask.classList.add("removing");
        setTimeout(() => {
            targetTask.remove();
        }, 10);
        processCompletion(targetTask);
    } else if( clickedItem.classList.contains("task-undo-button") ) {
        const targetTask = clickedItem.parentElement.parentElement;
        targetTask.classList.add("removing");
        setTimeout(() => {
            targetTask.remove();
        }, 10);
        processUndo(targetTask);
    }
}

todoTasksContainer.addEventListener("click", completeDeleteEventHandler);
completedTasksContainer.addEventListener("click", completeDeleteEventHandler);
deletedTasksContainer.addEventListener("click", completeDeleteEventHandler);

// to append tasks in UI
function addTaskToList(container, task) {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.classList.add(task.priority.toLowerCase());
    // if not completed and deleted, show check button, else do not show
    if( ! task.isCompleted && ! task.isDeleted) {
        taskDiv.innerHTML = `
            <p class="task-id">
                ${task.id}
            </p>
            <p class="task-content">
                ${task.value}
            </p>
            <div class="task-action-buttons">
                <button class="task-complete-button fa-solid fa-check"></button>
                <button class="task-delete-button fa-solid fa-trash-can"></button>
            </div> 
        `;
    } else {
        taskDiv.innerHTML = `
            <p class="task-id">
                ${task.id}
            </p>
            <p class="task-content">
                ${task.value}
            </p>
            <div class="task-action-buttons">
                <button class="task-undo-button fa-solid fa-rotate-left"></button>
                <button class="task-delete-button fa-solid fa-trash-can"></button>
            </div> 
        `;
    }
    taskDiv.classList.add("fade-in");
    container.appendChild(taskDiv);
    setTimeout(() => {
        taskDiv.classList.add('appending'); // Trigger the fade-in
    }, 10);
}

// handle completion of tasks
function processCompletion(targetTask) {
    const targetTaskIndex = getTaskIndexFromTaskArray(targetTask);
    tasksListArray[targetTaskIndex].isCompleted = true;
    const currTask = tasksListArray[targetTaskIndex];
    addTaskToList(completedTasksContainer, currTask);
    updateLocalStorage();
}

// handle deletion of tasks
function processDeletion(targetTask) {
    const targetTaskIndex = getTaskIndexFromTaskArray(targetTask);
    if( tasksListArray[targetTaskIndex].isDeleted == true ) {
        tasksListArray.splice(targetTaskIndex, 1);
    } else {
        tasksListArray[targetTaskIndex].isDeleted = true;
        const currTask = tasksListArray[targetTaskIndex];
        addTaskToList(deletedTasksContainer, currTask);
    }
    updateLocalStorage();
}

// handle deletion of tasks
function processUndo(targetTask) {
    const targetTaskIndex = getTaskIndexFromTaskArray(targetTask);
    if( tasksListArray[targetTaskIndex].isDeleted == true ) {
        tasksListArray[targetTaskIndex].isDeleted = false;
        const currTask = tasksListArray[targetTaskIndex];
        if(currTask.isCompleted == true ) {
            addTaskToList(completedTasksContainer, currTask);
        } else {
            addTaskToList(todoTasksContainer, currTask);
        }
    } else {
        tasksListArray[targetTaskIndex].isCompleted = false;
        const currTask = tasksListArray[targetTaskIndex];
        addTaskToList(todoTasksContainer, currTask);
    }
    updateLocalStorage();
}

// handle addition of tasks
function processAddition(id, value, priority, isCompleted, isDeleted) {
    tasksListArray.push({
        id: id,
        value: value,
        priority: priority,
        isCompleted: isCompleted,
        isDeleted: isDeleted
    });
    updateLocalStorage();
}

function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasksListArray));
}

// get task index from target task
function getTaskIndexFromTaskArray(targetTask) {
    const targetTaskID = targetTask.querySelector(".task-id").innerText.trim();
    return tasksListArray.findIndex((currStepTask) => currStepTask.id == targetTaskID);
}
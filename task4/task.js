let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
    const input = document.getElementById("taskInput");

    if (!input.value.trim()) {
        alert("Task cannot be empty!");
        return;
    }

    tasks.push({
        id: Date.now(),
        name: input.value,
        completed: false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value = "";
    displayTasks();
}

function displayTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(task => {
        list.innerHTML += `
        <li>
            ${task.name}
            <button onclick="editTask(${task.id})">Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        </li>
        `;
    });
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function editTask(id) {
    let newTask = prompt("Edit task:");

    if (newTask) {
        tasks = tasks.map(t => {
            if (t.id === id) {
                return { ...t, name: newTask };
            }
            return t;
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
    }
}

function searchTasks() {
    const query = document.getElementById("searchBox").value.toLowerCase();
    const items = document.querySelectorAll("#taskList li");

    items.forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(query)
            ? ""
            : "none";
    });
}

// Load tasks on page load
displayTasks();
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentView = "dashboard";

const taskList = document.getElementById("taskList");
const taskForm = document.getElementById("taskForm");

const taskName = document.getElementById("taskName");
const priority = document.getElementById("priority");
const dueDate = document.getElementById("dueDate");

const dashboardStats = document.getElementById("dashboardStats");

const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menuBtn");
const backBtn = document.getElementById("backBtn");

/* Sidebar toggle */

menuBtn.onclick = () => {
sidebar.classList.add("active");
};

backBtn.onclick = () => {
sidebar.classList.remove("active");
};

/* Close sidebar automatically on mobile */

function closeSidebarOnMobile() {

if (window.innerWidth <= 1023) {
sidebar.classList.remove("active");
}

}

/* Sidebar navigation */

dashboardBtn.onclick = () => {
currentView = "dashboard";
renderTasks();
closeSidebarOnMobile();
};

addTaskNavBtn.onclick = () => {
currentView = "addTask";
renderTasks();
closeSidebarOnMobile();
};

overviewBtn.onclick = () => {
currentView = "overview";
renderTasks();
closeSidebarOnMobile();
};

pendingBtn.onclick = () => {
currentView = "pending";
renderTasks();
closeSidebarOnMobile();
};

completedBtn.onclick = () => {
currentView = "completed";
renderTasks();
closeSidebarOnMobile();
};

/* Add Task */

addTaskBtn.onclick = () => {

if (taskName.value.trim() === "") return;

tasks.push({
id: Date.now(),
title: taskName.value,
priority: priority.value,
dueDate: dueDate.value,
status: "pending"
});

taskName.value = "";
dueDate.value = "";

saveTasks();
renderTasks();

};

/* Save tasks */

function saveTasks() {
localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* Complete task */

function completeTask(id) {

tasks = tasks.map(t => {

if (t.id === id) {
t.status = "completed";
}

return t;

});

saveTasks();
renderTasks();

}

/* Delete task */

function deleteTask(id) {

tasks = tasks.filter(t => t.id !== id);

saveTasks();
renderTasks();

}

/* Update statistics */

function updateStats() {

document.getElementById("totalTasks").textContent = tasks.length;

document.getElementById("pendingTasks").textContent =
tasks.filter(t => t.status === "pending").length;

document.getElementById("completedTasks").textContent =
tasks.filter(t => t.status === "completed").length;

}

/* Render tasks */

function renderTasks() {

taskList.innerHTML = "";

/* View control */

if (currentView === "dashboard") {

taskForm.style.display = "none";
dashboardStats.style.display = "grid";

}

else if (currentView === "addTask") {

taskForm.style.display = "flex";
dashboardStats.style.display = "none";

}

else {

taskForm.style.display = "none";
dashboardStats.style.display = "none";

}

/* Filter */

let filtered = tasks;

if (currentView === "pending") {
filtered = tasks.filter(t => t.status === "pending");
}

if (currentView === "completed") {
filtered = tasks.filter(t => t.status === "completed");
}

/* Placeholder */

if (filtered.length === 0) {

taskList.innerHTML = `
<tr>
<td colspan="5">No tasks available</td>
</tr>
`;

updateStats();
return;

}

/* Render rows */

filtered.forEach(t => {

taskList.innerHTML += `

<tr>

<td>${t.title}</td>

<td>
<span class="priority ${t.priority.toLowerCase()}">
${t.priority}
</span>
</td>

<td>${t.status === "completed" ? "Completed" : "Pending"}</td>

<td>${t.dueDate || "-"}</td>

<td>

${t.status === "pending"
? `<button onclick="completeTask(${t.id})">Complete</button>`
: ""}

<button onclick="deleteTask(${t.id})">Delete</button>

</td>

</tr>
`;

});

updateStats();

}

/* Initial render */

renderTasks();
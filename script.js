let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentView = "dashboard";

const taskList = document.getElementById("taskList");
const taskForm = document.getElementById("taskForm");

const taskName = document.getElementById("taskName");
const priority = document.getElementById("priority");
const dueDate = document.getElementById("dueDate");

const dashboardStats = document.getElementById("dashboardStats");

/* Sidebar buttons */

document.getElementById("dashboardBtn").onclick = () =>{
currentView="dashboard";
renderTasks();
};

document.getElementById("addTaskNavBtn").onclick = () =>{
currentView="overview";
renderTasks();
};

document.getElementById("overviewBtn").onclick = () =>{
currentView="overview";
renderTasks();
};

document.getElementById("pendingBtn").onclick = () =>{
currentView="pending";
renderTasks();
};

document.getElementById("completedBtn").onclick = () =>{
currentView="completed";
renderTasks();
};


/* Add task */

document.getElementById("addTaskBtn").onclick = () =>{

if(taskName.value.trim()==="") return;

const task = {
id:Date.now(),
title:taskName.value,
priority:priority.value,
dueDate:dueDate.value,
status:"pending"
};

tasks.push(task);

saveTasks();

taskName.value="";
dueDate.value="";

renderTasks();

};

/* Save */

function saveTasks(){
localStorage.setItem("tasks",JSON.stringify(tasks));
}

/* Complete */

function completeTask(id){

tasks = tasks.map(t=>{
if(t.id===id){
t.status="completed";
}
return t;
});

saveTasks();
renderTasks();

}

/* Delete */

function deleteTask(id){

tasks = tasks.filter(t=>t.id!==id);

saveTasks();
renderTasks();

}

/* Statistics */

function updateStats(){

document.getElementById("totalTasks").textContent = tasks.length;

document.getElementById("pendingTasks").textContent =
tasks.filter(t=>t.status==="pending").length;

document.getElementById("completedTasks").textContent =
tasks.filter(t=>t.status==="completed").length;

}

/* Render */

function renderTasks(){

taskList.innerHTML="";

/* View controls */

if(currentView==="dashboard"){
taskForm.style.display="none";
dashboardStats.style.display="flex";
}

else if(currentView==="overview"){
taskForm.style.display="flex";
dashboardStats.style.display="none";
}

else{
taskForm.style.display="none";
dashboardStats.style.display="none";
}

/* Filter */

let filtered = tasks;

if(currentView==="pending"){
filtered = tasks.filter(t=>t.status==="pending");
}

if(currentView==="completed"){
filtered = tasks.filter(t=>t.status==="completed");
}

/* Placeholder */

if(filtered.length===0){

const row=document.createElement("tr");

row.innerHTML=`
<td colspan="5" class="placeholder">
No tasks available
</td>
`;

taskList.appendChild(row);

updateStats();

return;

}

/* Render tasks */

filtered.forEach(t=>{

const row=document.createElement("tr");

row.innerHTML=`
<td>${t.title}</td>

<td>
<span class="priority ${t.priority.toLowerCase()}">
${t.priority}
</span>
</td>

<td>${t.status==="completed"?"Completed":""}</td>

<td>${t.dueDate||"-"}</td>

<td>
${t.status==="pending"
? `<button class="complete" onclick="completeTask(${t.id})">Complete</button>`
: ""}

<button class="delete" onclick="deleteTask(${t.id})">Delete</button>
</td>
`;

taskList.appendChild(row);

});

updateStats();

}

renderTasks();
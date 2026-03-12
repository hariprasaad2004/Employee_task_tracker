const taskName = document.getElementById("taskName");
const priority = document.getElementById("priority");
const dueDate = document.getElementById("dueDate");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const allBtn = document.getElementById("allBtn");
const pendingBtn = document.getElementById("pendingBtn");
const completedBtn = document.getElementById("completedBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter="all"){

taskList.innerHTML="";

tasks.forEach((task,index)=>{

if(filter==="pending" && task.completed) return;
if(filter==="completed" && !task.completed) return;

const div=document.createElement("div");
div.classList.add("task");

if(task.completed){
div.classList.add("completed");
}

div.innerHTML=`
<span>
${task.name} | ${task.priority} | ${task.date}
</span>

<div>
<button onclick="toggleTask(${index})">Completed</button>
<button onclick="deleteTask(${index})">Quit</button>
</div>
`;

taskList.appendChild(div);

});

}

addTaskBtn.addEventListener("click",()=>{

const task={
name:taskName.value,
priority:priority.value,
date:dueDate.value,
completed:false
};

tasks.push(task);

saveTasks();
renderTasks();

taskName.value="";
dueDate.value="";

});


function toggleTask(index){
tasks[index].completed=!tasks[index].completed;
saveTasks();
renderTasks();
}

function deleteTask(index){
tasks.splice(index,1);
saveTasks();
renderTasks();
}

allBtn.addEventListener("click",()=>renderTasks("all"));
pendingBtn.addEventListener("click",()=>renderTasks("pending"));
completedBtn.addEventListener("click",()=>renderTasks("completed"));

renderTasks();

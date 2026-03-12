# Employee Task Tracker

## Project Description

The **Employee Task Tracker** is a simple task management web application that allows users to create, manage, and track tasks efficiently.
Users can add tasks with a priority level and due date, mark tasks as completed, and filter tasks based on their status.

The application focuses on **clean UI design, responsive layout, and state management using JavaScript and LocalStorage**.

---

## Features

* Add new tasks with:

  * Task name
  * Priority level
  * Due date
* Mark tasks as **Completed**
* Delete tasks from the list
* Filter tasks by:

  * Overview (All tasks)
  * Pending tasks
  * Completed tasks
* Responsive layout for **desktop and mobile screens**
* Data persistence using **LocalStorage**

---

## Technologies Used

* **HTML5** – Structure of the application
* **CSS3** – Styling and responsive design
* **JavaScript (ES6)** – Application logic and state management
* **LocalStorage API** – Saving tasks so data remains after refresh

---

## Project Structure

```
employee-task-tracker
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## State Management

All tasks are stored in a **JavaScript array of objects**.

Example task structure:

```
{
  id: 171000000,
  title: "Complete project report",
  priority: "High",
  dueDate: "2026-04-05",
  status: "pending"
}
```

Whenever the task list changes:

1. The array is updated
2. The UI is re-rendered dynamically
3. The updated array is saved in **LocalStorage**

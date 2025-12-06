import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import type { Task, Column as ColumnType } from "./types";
import { Column } from "./Column";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { TextAlignStart, X } from "lucide-react";

const COLUMNS: ColumnType[] = [
  { id: 'not started', title: 'Not Started' },
  { id: 'todo', title: 'To Do' },
  { id: 'in progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

type SetDragAndDropProps = {
  searchTerm: string;
};

export function SetDragAndDrop({ searchTerm }: SetDragAndDropProps) {
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const navigate = useNavigate();

  async function getTodo() {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/user/todos", {
        method: "GET",
        headers: {"Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      alert("You are now disconnected");
      navigate("/login");
    }
    const data = await response.json();
    setTasks(data);
  }

  async function AddTaskFunction(event: any) {
    event.preventDefault();
    const title = event.target[0].value;
    const description = event.target[1].value;
    const due_time = event.target[2].value;
    const status =event.target[4].value;
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {"Content-Type": "application/json",
      Authorization: `Bearer ${token}`,},
      body: JSON.stringify({ title, description, due_time, status })
    });
    if (!response.ok) {
      alert("You are now disconnected");
      navigate("/login");
    }
    await response.json();
  }

  const AddTaskContent = () => (
    <div>
      <div className="overlay-background" onClick={() => setShowAddMenu(false)}/>
        <div className="form-modal-container">
          <form className="task-form" onSubmit={(event) => { AddTaskFunction(event); setShowAddMenu(false); }} >
            <input className="form-input-field input-title" placeholder='Enter a title..' id="title" type="text" required />
            <div className='textarea-description'>
              <label className="form-label form-label-description"><TextAlignStart />Description</label>
              <textarea className="form-input-field input-description" id="descripton" rows={4} required></textarea>
            </div>
            <div className='bottom'>
              <input className="form-input-field input-due-time" id="due_time" type="datetime-local" required/>
              <button className='form-submit-button' type="submit">Save</button>
            </div>
            <select className="status" id="status-select">
              <option className="status-option" value="not started">not started</option>
              <option className="status-option" value="todo">todo</option>
              <option className="status-option" value="in progress">in progress</option>
              <option className="status-option" value="done">done</option>
            </select>
            <div className='quit-add' onClick={()=> setShowAddMenu(false)}>
              <X size={30}/>
            </div>
          </form>
        </div>
      </div>
  );

  async function updateTaskOnServer(id: string, status: Task["status"]) {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:3000/todos/status/${id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json",
      Authorization: `Bearer ${token}`, },
      body: JSON.stringify({ status }),
    });
    getTodo();
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) {
      return;
    }
    const taskId = active.id as string;
    const newStatus = over.id as Task['status'];
    setTasks(tasks.map((task) => 
    task.id === taskId ? 
    {
      ...task,
      status: newStatus, 
    } 
    : task
    ));
    updateTaskOnServer(taskId, newStatus);
  }

  useEffect(() => {
    getTodo();
    const handleOpenMenu = () => setShowAddMenu(!showAddMenu);
    window.addEventListener('toggleAddTaskMenu', handleOpenMenu);
    return () => window.removeEventListener('toggleAddTaskMenu', handleOpenMenu);
  }, [showAddMenu]);

  const filteredTasks = tasks.filter(task => 
    searchTerm.trim() === '' ||
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="todoContainer">
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={filteredTasks.filter((task) => task.status === column.id)}
              refresh={getTodo}
            />
          ))}
        </DndContext>
      </div>
      {showAddMenu && createPortal(<AddTaskContent />, document.body)}
    </div>
  );
}
import { useDraggable } from '@dnd-kit/core';
import type { Task } from './types';
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { TextAlignStart, X, Trash, Ellipsis} from "lucide-react";
import "./pages/modal.css";
import 'overlayscrollbars/overlayscrollbars.css';

type TaskCardProps = {
  task: Task;
  refresh: () => void;
};

export function TaskCard({ task, refresh }: TaskCardProps) {
  const [showUpdateMenu, setShowUpdateMenu] = useState(false);
  const [title, setTitle] = useState("");
  const [due_time, setDueTime] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("")

  async function GetTask() {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/todos/${task.id}`, {
        method: "GET",
        headers: {"Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const datas = await response.json();
    const data = datas[0];
    const date= data.due_time
    const formatDate = date.replace("T"," ")
    setTitle(data.title);
    setDueTime(formatDate);
    setDescription(data.description);
    setStatus(data.status)
  }

  async function UpdateTask(event: any) {
    event.preventDefault();
    console.log(event)
    const id = task.id;
    const title = event.target[0].value;
    const description = event.target[1].value;
    const due_time = event.target[2].value;
    const status = event.target[4].value;
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json",
      Authorization: `Bearer ${token}`,},
      body: JSON.stringify({ title, description, due_time, id, status })
    });
    await response.json();
    GetTask();
    refresh();
  }

  useEffect(() => {
    GetTask();
  }, []);

  const UpdateFunction = () => (
    <div onPointerDown={(e) => e.stopPropagation()}>
      <div className="overlay-background" onClick={() => setShowUpdateMenu(false)}/>
        <div className="form-modal-container">
          <form className="task-form" onSubmit={(event) => { UpdateTask(event); setShowUpdateMenu(false); }} >
            <input className="form-input-field" placeholder='Enter a title..' defaultValue={title}  id="title" type="text" required />
            <div className='textarea-description'>
              <label className="form-label form-label-description"><TextAlignStart />Description</label>
              <textarea className="form-input-field input-description" defaultValue={description} id="descripton" required></textarea>
            </div>
            <div className='bottom'>
              <input className="form-input-field input-due-time" defaultValue={(due_time.replace(" ","T")).substr(0,16)} id="due_time" type="datetime-local" required/>
              <button className='form-submit-button' type="submit">Save</button>
            </div>
            <select className="status" id="status-select" defaultValue={status}>
              <option className="status-option" value="not started">not started</option>
              <option className="status-option" value="todo">todo</option>
              <option className="status-option" value="in progress">in progress</option>
              <option className="status-option" value="done">done</option>
            </select>          
            <div className='quit' onClick={()=> setShowUpdateMenu(false)}>
              <X size={30}/>
            </div>
            <div className='delete' onClick={DeleteFunction}>
              <Trash size={24}/>
            </div>
          </form>
      </div>
    </div>
  )

  async function DeleteFunction() {
    const isConfirmed = window.confirm(`Do you really want to delete ${title} ?`);
    if (isConfirmed) {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/todos/${task.id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json",
        Authorization: `Bearer ${token}`,},
      });
      const res = await response.json();
      console.log(res);
      refresh();
    }
  }

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  })
  let style;
  if (transform) {
    style = {
      transform: `translate(${transform.x}px, ${transform.y}px)`
    };
  } else {
    style = undefined;
  }

  return (
    <div>
      <div ref={setNodeRef} {...attributes} {...listeners} className="todo-card shadow-sm hover:shadow-md" style={style}>
        <div className='card-header'>
          <div className='card-title'>{title}</div>
          <button className='card-menu' onPointerDown={(e) => e.stopPropagation()} onClick={() => setShowUpdateMenu(true)} type="button"><Ellipsis/></button>
        </div>
        <div className='card-description'>{description}</div>
        <div className="card-time">{due_time.substr(0,16)}</div>
      </div>
      {showUpdateMenu && createPortal(<UpdateFunction />, document.body)}
    </div>
  );
}
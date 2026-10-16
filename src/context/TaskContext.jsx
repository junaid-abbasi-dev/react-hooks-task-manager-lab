import React, { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([])
    useEffect(() => {
        fetch('http://localhost:6001/tasks')
        .then(r=>r.json())
        .then(data => setTasks(current => current.length === 0 ? data : current))
      }, []);

    function addTask(title) {
        setTasks(current => [
            ...current,
            { id: current.length + 1, title, completed: false }
        ])
    }
    function toggleCompleted(id) {
        setTasks(current => current.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ))
    }
    return (
        <TaskContext.Provider value={{ tasks, addTask, toggleCompleted }}>
          {children}
        </TaskContext.Provider>
      );
}

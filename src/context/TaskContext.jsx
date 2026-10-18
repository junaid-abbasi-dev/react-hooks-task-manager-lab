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
        const task = tasks.find(item => item.id === id)
        if (!task) return
        const completed = !task.completed

        setTasks(current => current.map(item =>
            item.id === id ? { ...item, completed } : item
        ))

        fetch(`http://localhost:6001/tasks/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed })
        })
    }
    return (
        <TaskContext.Provider value={{ tasks, addTask, toggleCompleted }}>
          {children}
        </TaskContext.Provider>
      );
}

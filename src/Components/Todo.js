import React, { useEffect, useState } from 'react';
import CreateTask from '../models/Createtask';
import Card from './Card';
import './Todo.css'; // Import CSS file for styling


const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        fetch('https://todoserver-8vzn.onrender.com/api/todos')
            .then(response => response.json())
            .then(data => {
                setTaskList(data);
            })
            .catch(error => console.error('Error fetching todos:', error));
    }, []);

    const deleteTask = async (taskId) => {
        try {
            await fetch(`https://todoserver-8vzn.onrender.com/api/todos/${taskId}`, {
                method: 'DELETE'
            });
            setTaskList(prevList => prevList.filter(task => task._id !== taskId));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const saveTask = async (taskObj) => {
        try {
            const response = await fetch('https://todoserver-8vzn.onrender.com/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskObj)
            });
            const newTask = await response.json();
            setTaskList(prevList => [...prevList, newTask]);
            setModal(false);
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    };

    const updateListArray = (updatedTask) => {
        setTaskList(prevList => {
            const updatedList = prevList.map(task => {
                if (task._id === updatedTask._id) {
                    return updatedTask;
                }
                return task;
            });
            return updatedList;
        });
    };

    const toggle = () => {
        setModal(!modal);
    };

    return (
        <div className="background">

            <div className="header text-center">
                <h3>Todo List</h3>
                <button className="btn btn-outline-dark mt-2" onClick={() => setModal(true)}>Create Task</button>
            </div>

            <div className="task-container">
                {taskList.map((task, index) => (
                    <Card
                        key={task._id}
                        taskObj={task}
                        deleteTask={deleteTask}
                        updateListArray={updateListArray}
                    />
                ))}
            </div>
            <CreateTask toggle={toggle} modal={modal} save={saveTask} />

        </div>
    );
};

export default TodoList;

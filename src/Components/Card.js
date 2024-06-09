import React, { useState, useEffect } from 'react';
import EditTask from '../models/Edittask';
import moment from 'moment';

const Card = ({ taskObj, deleteTask, updateListArray }) => {
    const [modal, setModal] = useState(false);

    const colors = [
        {
            primaryColor: "#5D93E1",
            secondaryColor: "#ECF3FC"
        },
        {
            primaryColor: "#F9D288",
            secondaryColor: "#FEFAF1"
        },
        {
            primaryColor: "#5DC250",
            secondaryColor: "#F2FAF1"
        },
        {
            primaryColor: "#F48687",
            secondaryColor: "#FDF1F1"
        },
        {
            primaryColor: "#B964F7",
            secondaryColor: "#F3F0FD"
        }
    ];

    const toggle = () => {
        setModal(!modal);
    };

    const handleDelete = async () => {
        try {
            await deleteTask(taskObj._id);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const updateTask = async (updatedTask) => {
        try {
            await fetch(`https://todoserver-8vzn.onrender.com/api/todos/${taskObj._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedTask)
            });
            updateListArray(updatedTask);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };
    useEffect(() => {

    }, [taskObj]);

    return (
        <div className="card-wrapper mr-5">
            <div className="card-top" ></div>
            <div className="task-holder">
                <span className="card-header fw-bold"  >{taskObj.Name}</span>
                <hr className='h-10 ' />
                <p className="mt-3">{taskObj.Description}</p>
                <p className="mt-3 text-muted">{moment(taskObj.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>

                <div style={{ position: "absolute", right: "20px", bottom: "20px" }}>
                    <i className="far fa-edit mr-3" onClick={() => setModal(true)}></i>
                    <i className="fas fa-trash-alt" onClick={handleDelete}></i>
                </div>
            </div>
            <EditTask modal={modal} toggle={toggle} updateTask={updateTask} taskObj={taskObj} />
        </div>
    );
};

export default Card;

import React, { useState } from 'react';
import EditTaskPopup from '../modals/EditTask';
import { Checkbox, Button, Card as MuiCard, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Card = ({ taskObj, index, deleteTask, updateListArray }) => {
    const [modal, setModal] = useState(false);
    const [completed, setCompleted] = useState(taskObj.completed || false);

    const colors = [
        { primaryColor: "#5D93E1", secondaryColor: "#ECF3FC" },
        { primaryColor: "#F9D288", secondaryColor: "#FEFAF1" },
        { primaryColor: "#5DC250", secondaryColor: "#F2FAF1" },
        { primaryColor: "#F48687", secondaryColor: "#FDF1F1" },
        { primaryColor: "#B964F7", secondaryColor: "#F3F0FD" }
    ];

    const toggle = () => {
        setModal(!modal);
    };

    const updateTask = (obj) => {
        updateListArray(obj, index);
    };

    const handleDelete = () => {
        deleteTask(index);
    };

    const handleCheckboxChange = () => {
        setCompleted(!completed);
        taskObj.completed = !completed;
        updateListArray(taskObj, index);
    };

    return (
        <div className="card-wrapper">
            <div className="card-top" style={{ backgroundColor: colors[index % 5].primaryColor }}></div>
            <div className={`task-holder ${completed ? 'completed' : ''}`}>
                <span className="card-header" style={{ backgroundColor: colors[index % 5].secondaryColor, borderRadius: '10px' }}>
                    {taskObj.Name}
                </span>
                <p>{taskObj.Description}</p>
                <Checkbox checked={completed} onChange={handleCheckboxChange} />
                <div style={{ position: 'absolute', top: '160px', left: '160px' }}>
                    <IconButton style={{ color: colors[index % 5].primaryColor }} onClick={toggle}>
                        <EditIcon />
                    </IconButton>
                    <IconButton style={{ color: colors[index % 5].primaryColor }} onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            </div>
            <EditTaskPopup modal={modal} toggle={toggle} updateTask={updateTask} taskObj={taskObj} />
        </div>
    );
};

export default Card;

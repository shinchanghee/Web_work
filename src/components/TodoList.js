import React, { useState, useEffect } from 'react';
import CreateTaskPopup from '../modals/CreateTask';
import Card from './Card';
import { Container, Button, Typography } from '@mui/material';

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        let arr = localStorage.getItem("taskList");
        if (arr) {
            let obj = JSON.parse(arr);
            setTaskList(obj);
        }
    }, []);

    const deleteTask = (index) => {
        let tempList = taskList;
        tempList.splice(index, 1);
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
        window.location.reload();
    };

    const updateListArray = (obj, index) => {
        let tempList = taskList;
        tempList[index] = obj;
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
        window.location.reload();
    };

    const toggle = () => {
        setModal(!modal);
    };

    const saveTask = (taskObj) => {
        let tempList = taskList;
        tempList.push(taskObj);
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
        setModal(false);
    };

    return (
        <Container>
            <Typography variant="h3" align="center" gutterBottom>
                Todo List
            </Typography>
            <Button variant="contained" color="primary" onClick={() => setModal(true)}>
                Create Task
            </Button>
            <div className="task-container">
                {taskList && taskList.map((obj, index) => (
                    <Card
                        taskObj={obj}
                        index={index}
                        deleteTask={deleteTask}
                        updateListArray={updateListArray}
                    />
                ))}
            </div>
            <CreateTaskPopup toggle={toggle} modal={modal} save={saveTask} />
        </Container>
    );
};

export default TodoList;

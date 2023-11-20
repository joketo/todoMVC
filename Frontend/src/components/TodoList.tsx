import '../styles/TodoListStyles.scss';
import React, {FormEvent, useEffect, useState} from "react";
import {TaskInput, Task} from "../models/Task";
import {Button, CircularProgress, FormControl, TextField} from "@mui/material";
import axios from "axios";
import TaskListComponent from "./TaskListComponent";
import backend_baseurl from "../config";

const TodoList = () => {

    const date = new Date();
    const [newTaskDescription, setNewTaskDescription] = useState("");
    const [error, setError] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [taskItems, setTaskItems] = useState<Task[]>([]);

    const fetchTasks = (): void => {
        axios.get(backend_baseurl)
            .then(function (response) {
                setIsLoaded(true);
                setTaskItems(response.data);
            })
            .catch(function (error) {
                setIsLoaded(true);
                setError("Error, failed to get the list of tasks");
            })
    }

    // Note: the empty deps array [] means
    // this useEffect will run once
    useEffect(() => {
        fetchTasks();
    }, [])

    const deleteTask = (taskId: number): void => {
        axios.delete(backend_baseurl + taskId)
            .then(function (response) {
                setIsLoaded(true);
                fetchTasks();
            })
            .catch(function (error) {
                setIsLoaded(true);
                setError("Error, deleting task failed");
            })
    }

    const updateTaskInTaskItems = (updated: Task): void => {
        const updatedTasks = taskItems.map((task: Task) => {
            if (task.id === updated.id) {
                return updated;
            }
            return task;
        });
        setTaskItems(updatedTasks);
    }

    const toggleTaskCompleted = (task: Task): void => {
        axios.post(backend_baseurl + "/complete", task)
            .then(function (response) {
                updateTaskInTaskItems(response.data);
            })
            .catch(function (error) {
                setIsLoaded(true);
                setError("Error, changing status of a task failed");
            })
    }

    const handleTextFieldChange = (event: any): void => {
        setNewTaskDescription(event.target.value);
    }

    const getWeekDayWithUpperCaseAndCurrentDate = (): string => {
        let weekday = date.toLocaleDateString('fi-FI', {weekday: 'long'});
        return weekday.charAt(0).toUpperCase() + weekday.slice(1) + ' ' + date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
    }

    const submitTask = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        let newTask: TaskInput = {
            description: newTaskDescription,
            completed: false
        }
        axios.post(backend_baseurl, newTask)
            .then(function (response) {
                const updatedTasks = taskItems.concat(response.data);
                setTaskItems(updatedTasks);
                setNewTaskDescription("");
            })
            .catch(function (error) {
                setError("Error, creating new task failed");
            })
    }


    if (error) {
        return <div>Error: {error}</div>;
    } else if (!isLoaded) {
        return <CircularProgress color="inherit"/>
    } else {
        return (
            <div className="TodoList">
                <h2 className="TodoTitle">
                    {getWeekDayWithUpperCaseAndCurrentDate()}
                </h2>

                <form onSubmit={submitTask}>
                    <FormControl className="NewTaskForm">
                        <TextField id="new-task-description" name="description" label="What needs to be done"
                                   variant="standard"
                                   value={newTaskDescription} onChange={handleTextFieldChange}
                                   className="TaskDescriptionInput"/>
                        <Button type="submit">Add new</Button>
                    </FormControl>
                </form>

                <TaskListComponent taskItems={taskItems}
                                   deleteTask={deleteTask}
                                   toggleTaskCompleted={toggleTaskCompleted}/>
            </div>
        );
    }
}
export default TodoList;
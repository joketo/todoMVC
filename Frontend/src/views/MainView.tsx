import '../styles/MainView.scss';
import TodoList from "../components/TodoList";
import TitleComponent from "../components/TitleComponent";
import {useEffect, useState} from "react";
import axios from "axios";
import {Task, TaskInput} from "../models/Task";
import {CircularProgress} from "@mui/material";

const MainView = () => {
    const [error, setError] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [taskItems, setTaskItems] = useState([]);

    const fetchTasks = (): void => {
        axios.get("http://localhost:8080/task")
            .then(function (response) {
                setIsLoaded(true);
                setTaskItems(response.data);
            })
            .catch(function (error) {
                setIsLoaded(true);
                setError("error");
            })
    }

    // Note: the empty deps array [] means
    // this useEffect will run once
    useEffect(() => {
        fetchTasks();
    }, [])

    const deleteTask = (taskId : number): void => {
        axios.delete("http://localhost:8080/task/" + taskId)
            .then(function (response) {
                setIsLoaded(true);
                fetchTasks();
            })
            .catch(function (error) {
                setIsLoaded(true);
                setError("error");
            })
    }

    const toggleTaskCompleted = (task : Task): void => {
        axios.post("http://localhost:8080/task/complete", task)
            .then(function (response) {
                setIsLoaded(true);
                fetchTasks();
                //Todo: lisää äsken luotu listaan hakemisen sijaan
            })
            .catch(function (error) {
                setIsLoaded(true);
                setError("error");
            })
    }

    const createTask = (newTask: TaskInput): void => {
        axios.post("http://localhost:8080/task", newTask)
            .then(function (response) {
                setIsLoaded(true);
                fetchTasks();
                //Todo: lisää äsken luotu listaan hakemisen sijaan
            })
            .catch(function (error) {
                setIsLoaded(true);
                setError("error");
            })
    }

    if (!isLoaded) {
        return <CircularProgress color="inherit" />
    } else {
        return (
            <div className="MainView">
                <TitleComponent/>
                <TodoList error={error}
                          taskItems={taskItems}
                          createTask={createTask}
                          deleteTask={deleteTask}
                          toggleTaskCompleted={toggleTaskCompleted}
                />
            </div>
        );
    }

}

export default MainView;
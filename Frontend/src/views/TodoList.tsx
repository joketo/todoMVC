import '../styles/MainView.scss';
import {useEffect, useState} from "react";
import {TaskInput, Task} from "../models/Task";
import axios from "axios";
import {Button, CircularProgress, FormControl, List, ListItem, TextField} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const TodoList = () => {

    const [error, setError] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [taskItems, setTaskItems] = useState([]);
    const [newTaskDescription, setNewTaskDescription] = useState("");
    const [date, setDate] = useState(new Date());

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
    // similar to componentDidMount()
    useEffect(() => {
        setDate(new Date());
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

    const handleTextFieldChange = (event: any) : void => {
        setNewTaskDescription(event.target.value);
    }

    const submitTask = (): void => {
        let newTask : TaskInput = {
            description: newTaskDescription,
            completed: false
        }
        axios.post("http://localhost:8080/task", newTask)
            .then(function (response) {
                setIsLoaded(true);
                setNewTaskDescription("");
                fetchTasks();
                //Todo: lisää äsken luotu listaan hakemisen sijaan

            })
            .catch(function (error) {
                setIsLoaded(true);
                setError("error");
            })
    }

    if (error) {
        return <div>Error: {error}</div>;
    } else if (!isLoaded) {
        return <CircularProgress color="inherit" />
    } else {
        return (
            <div className="TodoList">
                <h4 className="AppTitle">TODO {date.getDate()}.{date.getMonth()+1}.{date.getFullYear()}</h4>
                <FormControl>
                    <TextField id="new-task-description" name="description" label="What needs to be done" variant="standard"
                               value={newTaskDescription}
                    onChange={handleTextFieldChange}/>
                    <Button onClick={submitTask}>Add new</Button>
                </FormControl>
                <List>
                    {taskItems.map((task: Task, i: number) => (
                        <ListItem key={i}>
                            <span className="TaskDescription">{task.description}</span>
                            <Button variant="outlined" onClick={() => deleteTask(task.id)}><CloseIcon /></Button>
                        </ListItem>
                    ))
                    }
                </List>
            </div>
        );
    }
}
export default TodoList;
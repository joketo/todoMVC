import '../styles/TodoList.scss';
import {useEffect, useState} from "react";
import {TaskInput, Task} from "../models/Task";
import {Button, Checkbox, FormControl, List, ListItem, TextField} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface Props {
    error?: string,
    taskItems: Task[],
    deleteTask: (id: number) => void,
    createTask: (newTask: TaskInput) => void,
    toggleTaskCompleted: (task: Task) => void,
}

const TodoList = (props: Props) => {

    const [newTaskDescription, setNewTaskDescription] = useState("");
    const [date, setDate] = useState(new Date());
    const [showDeleteButtonOnRow, setShowDeleteButtonOnRow] = useState(-1);

    // this useEffect will run once
    useEffect(() => {
        setDate(new Date());
    }, [])

    const handleTextFieldChange = (event: any) : void => {
        setNewTaskDescription(event.target.value);
    }

    const getWeekDayWithUpperCaseAndCurrentDate = () : string => {
        let weekday = date.toLocaleDateString('fi-FI', {weekday: 'long'});
        return weekday.charAt(0).toUpperCase() + weekday.slice(1) + ' ' + date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
    }

    const submitTask = (): void => {
        let newTask : TaskInput = {
            description: newTaskDescription,
            completed: false
        }
        props.createTask(newTask);
        setNewTaskDescription("");
        //todo vasta kun saatu vastaus createTaskilta?
    }
    //todo: laita enter triggeröimään submit eli form kuntoon
    const handleMouseOver = (rowId: number): void => {
        setShowDeleteButtonOnRow(rowId);
    }

    const handleMouseOut = () => {
        setShowDeleteButtonOnRow(-1);
    }

    return (
        <div className="TodoList">
            <h2 className="TodoTitle">
                {getWeekDayWithUpperCaseAndCurrentDate()}
            </h2>
            <FormControl className="NewTaskForm">
                <TextField id="new-task-description" name="description" label="What needs to be done" variant="standard"
                           value={newTaskDescription} onChange={handleTextFieldChange} className="TaskDescriptionInput"/>
                <Button type="submit" onClick={submitTask}>Add new</Button>
            </FormControl>
            <List>
                {props.taskItems.map((task: Task, i: number) => (
                    <ListItem key={i} className={task.completed ? "TaskRow__Completed" : "TaskRow"}
                              onMouseOver={() => handleMouseOver(i)} onMouseOut={handleMouseOut}
                              onClick={() => props.toggleTaskCompleted(task)}>
                        <Checkbox checked={task.completed}/>
                        <span className="TaskDescription">{task.description}</span>
                        {showDeleteButtonOnRow === i &&
                          <Button className="DeleteButton" variant="text" onClick={() => props.deleteTask(task.id)}><CloseIcon /></Button>
                        }
                    </ListItem>
                ))
                }
            </List>
        </div>
    );
}
export default TodoList;
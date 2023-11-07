import '../styles/TodoList.scss';
import {FormEvent, useEffect, useState} from "react";
import {TaskInput, Task} from "../models/Task";
import {Button, Checkbox, FormControl, List, ListItem, TextField} from "@mui/material";
import {Close as CloseIcon, PanoramaFishEye as PanoramaFishEyeIcon, CheckCircleOutline as CheckCircleOutlineIcon} from "@mui/icons-material";
import FilterButton from "./FilterButton";

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
    const [filter, setFilter] = useState("All");

    const FILTER_MAP : {[key: string]: any}  = {
        "All": () => true,
        "Active": (task:Task) => !task.completed,
        "Completed": (task:Task) => task.completed,
    };

    const FILTER_NAMES : string[] = Object.keys(FILTER_MAP);

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

    const submitTask = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        let newTask : TaskInput = {
            description: newTaskDescription,
            completed: false
        }
        props.createTask(newTask);
        setNewTaskDescription("");
        //todo tyhjennä description-kenttä vasta kun saatu vastaus createTaskilta?
    }

    const handleMouseOverRow = (rowId: number): void => {
        setShowDeleteButtonOnRow(rowId);
    }

    const handleMouseOutRow = () => {
        setShowDeleteButtonOnRow(-1);
    }

    return (
        <div className="TodoList">
            <h2 className="TodoTitle">
                {getWeekDayWithUpperCaseAndCurrentDate()}
            </h2>

            <form onSubmit={submitTask}>
                <FormControl className="NewTaskForm">
                        <TextField id="new-task-description" name="description" label="What needs to be done" variant="standard"
                                   value={newTaskDescription} onChange={handleTextFieldChange} className="TaskDescriptionInput"/>
                        <Button type="submit">Add new</Button>
                </FormControl>
            </form>

            <div className="FiltersContainer">
                <span>Show </span>
                {FILTER_NAMES.map((name) => (
                    <FilterButton
                        key={name}
                        name={name}
                        isPressed={name === filter}
                        setFilter={setFilter}
                    />
                ))}
            </div>
            <List>
                {props.taskItems.filter(FILTER_MAP[filter]).map((task: Task, i: number) => (
                    <ListItem key={i} className={task.completed ? "TaskRow TaskRow__Completed" : "TaskRow"}
                              onMouseOver={() => handleMouseOverRow(i)} onMouseOut={handleMouseOutRow}
                              onClick={() => props.toggleTaskCompleted(task)}>
                        <Checkbox checked={task.completed} icon={<PanoramaFishEyeIcon />} checkedIcon={<CheckCircleOutlineIcon />} />
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
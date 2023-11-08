import '../styles/TodoListStyles.scss';
import {useState} from "react";
import {Task} from "../models/Task";
import {Button, Checkbox, List, ListItem} from "@mui/material";
import {
    Close as CloseIcon,
    PanoramaFishEye as PanoramaFishEyeIcon,
    CheckCircleOutline as CheckCircleOutlineIcon
} from "@mui/icons-material";
import FilterButton from "./FilterButton";

interface Props {
    taskItems: Task[],
    deleteTask: (id: number) => void,
    toggleTaskCompleted: (task: Task) => void,
}

const TaskListComponent = (props: Props) => {

    const [showDeleteButtonOnRow, setShowDeleteButtonOnRow] = useState(-1);
    const [filter, setFilter] = useState("All");

    const FILTER_MAP: { [key: string]: any } = {
        "All": () => true,
        "Active": (task: Task) => !task.completed,
        "Completed": (task: Task) => task.completed,
    };

    const FILTER_NAMES: string[] = Object.keys(FILTER_MAP);

    const handleMouseOverRow = (rowId: number): void => {
        setShowDeleteButtonOnRow(rowId);
    }

    const handleMouseOutRow = () => {
        setShowDeleteButtonOnRow(-1);
    }

    return (
        <>
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
                        <Checkbox checked={task.completed} icon={<PanoramaFishEyeIcon/>}
                                  checkedIcon={<CheckCircleOutlineIcon/>}/>
                        <span className="TaskDescription">{task.description}</span>
                        {showDeleteButtonOnRow === i &&
                          <Button className="DeleteButton" variant="text"
                                  onClick={() => props.deleteTask(task.id)}><CloseIcon/></Button>
                        }
                    </ListItem>
                ))
                }
            </List>
        </>
    );
}
export default TaskListComponent;
import '../styles/TodoList.scss';
import {Button} from "@mui/material";
interface Props {
    isPressed: boolean,
    setFilter: (name: string) => void,
    key: string,
    name: string,
}

const FilterButton = (props: Props) => {
    return (
            <Button
                type="button"
                className={props.isPressed ? "FilterButtonSelected" : "FilterButtonUnSelected"}
                aria-pressed={props.isPressed}
                onClick={() => props.setFilter(props.name)}>
                <span>{props.name}</span>
            </Button>
    );
};

export default FilterButton;
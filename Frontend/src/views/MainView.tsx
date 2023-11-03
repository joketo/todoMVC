import '../styles/MainView.scss';
import TodoList from "./TodoList";
import TitleComponent from "../components/TitleComponent";

const MainView = () => {

    return (
        <div className="MainView">
            <TitleComponent />
            <TodoList/>
        </div>
    );

}
export default MainView;
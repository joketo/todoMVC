import '../styles/MainViewStyles.scss';
import TodoList from "../components/TodoList";
import TitleComponent from "../components/TitleComponent";

const MainView = () => {
    
    return (
        <div className="MainView">
            <TitleComponent />
            <TodoList />
        </div>
    );

}

export default MainView;
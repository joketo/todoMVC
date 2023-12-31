import '../styles/TitleComponentStyles.scss';
import logo from '../my-logo.svg';

const TitleComponent = () => {

    return (
      <div className="AppTitleContainer">
          <div className="LogoAndTitle">
              <img src={logo} className="App-logo" alt="logo" />
              <h1>ToDo</h1>
          </div>
      </div>
    );
}
export default TitleComponent;
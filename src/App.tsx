import MainPage from "./components/MainPage";
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <MainPage />
        </Router>
    );
}

export default App;
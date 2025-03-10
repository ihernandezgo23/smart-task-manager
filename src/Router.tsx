import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage'; // Import the MainPage component
import Filters from './components/Filters'; // Import the Filters component
import Stats from './components/Stats'; // Import the Stats component

const AppRouter = () => {
  return (
    <Router> {/* Router component wrapping all routes */}
      <Routes> {/* All route definitions should go inside Routes */}
        <Route path="/" element={<MainPage />} /> {/* Main page route */}
        <Route path="/filters" element={<Filters />} /> {/* Filters route */}
        <Route path="/stats" element={<Stats />} /> {/* Stats route */}

      </Routes>
    </Router>
  );
};

export default AppRouter;
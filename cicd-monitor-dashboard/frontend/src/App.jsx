import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Deployments from './pages/Deployments';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/deployments"
          element={<Deployments />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

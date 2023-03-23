import { Route,  BrowserRouter, Router,Routes} from 'react-router-dom';
import Planner from "./pages/Planner";
import Stops from "./pages/Stops";
import Lines from './pages/Lines';
import Weather from './pages/Weather';
import Account from "./pages/Account";
import Feedback from "./pages/Feedback";
import Explore from "./pages/Explore";
import Newspage from "./pages/Newspage";



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Planner />} />
        <Route path="/stops" element={<Stops />} />
        <Route path="/lines" element={<Lines />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/account" element={<Account />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/search" element={<Newspage />} />
        
      </Routes>
    </BrowserRouter>
  
  );
}

export default App;


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLogin from './Component/UserLogin';
import AdminDashboard from './Component/AdminDashboard';
import Userdashboard from './Component/Userdashboard';
import CoordinatorDashboard from './Component/CoordinatorDashboard';
import EventsDashboard from './Component/EventsDashboard';
import CreateEvent from "./Component/CreateEvent";
import UserList from "./Component/UserList";
import IndexPage from './Component/IndexPage';
import ProfileDisplay from './Component/ProfileDisplay';
import ProfileUpdate from './Component/ProfileUpdate';
import ProfileCreate from './Component/ProfileCreate';
import ResetPassword from './Component/ResetPassword';
import ForgottPassword from './Component/ForgottPassword';
import Logout from './Component/Logout';
import UserEvents from './Component/UserEvents';
import EventsDashboardAdmin from './Component/EventsDashboardAdmin';
import AdminEvents from "./Component/AdminEvents";
import FeedbackSection from "./Component/FeedbackSection";
import EventImageHandler from "./Component/EventImageHandler";


function App() {
  
  //const userId = 1;  // This should be dynamically set depending on the logged-in user

  return (
    <div className="App">
           <Router>
            
            <Routes>
              
                <Route path="/" element={<IndexPage />} />
                <Route path="/ProfileDisplay" element={<ProfileDisplay/>}/>
                <Route path="/UserEvents" element={<UserEvents/>}/>
                <Route path="/AdminEvents" element={<AdminEvents/>}/>
                <Route path="/ProfileUpdate" element={<ProfileUpdate/>}/>
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/ForgottPassword" element={<ForgottPassword />} />
                <Route path="/UserList" element={<UserList/>}/>
                <Route path="/UserLogin" element={<UserLogin />} />
                <Route path="/Logout" element={<Logout />} />
                <Route path="/EventsDashboardAdmin" element={<EventsDashboardAdmin/>}/>
                <Route path="/ProfileCreate" element={<ProfileCreate/>}/>
                <Route path="/EventsDashboard" element={<EventsDashboard/>}/>
                <Route path="/AdminDashboard" element={<AdminDashboard/>}/>
                <Route path="/CreateEvent" element={<CreateEvent/>}/>
                <Route path="/UserDashboard" element={<Userdashboard/>} />
                <Route path="/CoordinatorDashboard" element={<CoordinatorDashboard/>} />
                <Route path="/FeedbackSection" element={<FeedbackSection/>} />
                <Route path="/EventImageHandler" element={<EventImageHandler/>} />

            </Routes>
        </Router>
    </div>
  );
}

export default App;

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Posts from './screens/Posts';
import Home from './screens/Home';
import './index.css';
import Navbar from './components/nav/Navbar';
import Register from './screens/Register';
import Login from './screens/Login';
import AuthStore from './contexts/AuthStore';
import MyProfile from './screens/MyProfile';
import PrivateRoute from './guards/PrivateRoute';
import PostDetails from './screens/PostDetails';
import Profile from './screens/Profile';


function App() {
  return (
    <Router>
      <AuthStore>
        <Navbar />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <PrivateRoute exact path="/posts" component={Posts} />
          <PrivateRoute exact path="/myProfile" component={MyProfile} />
          <PrivateRoute exact path="/profile/:id" component={Profile} />
          <PrivateRoute exact path="/posts/:id" component={PostDetails} />
        </Switch>
      </AuthStore>
    </Router>
  );
}

export default App;


import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Posts from './screens/Posts';
import Home from './screens/Home';
import './index.css';
import Navbar from './components/nav/Navbar';
import Register from './screens/Register';
import Login from './screens/Login';
import AuthStore from './contexts/AuthStore';
import Profile from './screens/Profile';
import PrivateRoute from './guards/PrivateRoute';



function App() {
  return (
    <Router>
      <AuthStore>
        <Navbar />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/posts" component={Posts} />
          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
      </AuthStore>
    </Router>
  );
}

export default App;

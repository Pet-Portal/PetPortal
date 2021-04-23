
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
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
import Errors from './screens/Errors';
import MyPosts from './screens/MyPosts';
import ActivationAccount from './components/users/ActivationAccount';
import MyOffers from './screens/MyOffers';
import Footer from './components/footer/Footer';

function App() {
  return (
    <Router>
      <AuthStore>
        <Navbar />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route path="/activate" component={ActivationAccount} />
          <Route exact path="/" component={Home} />
          <PrivateRoute exact path="/posts" component={Posts} />
          <PrivateRoute exact path="/myProfile" component={MyProfile} />
          <PrivateRoute exact path="/profile/:id" component={Profile} />
          <PrivateRoute exact path="/posts/:id" component={PostDetails} />
          <PrivateRoute exact path="/myPosts" component={MyPosts} />
          <PrivateRoute exact path="/myOffers" component={MyOffers} />

          <Route exact path="/404" component={() => <Errors code={404} />} />
          <Route exact path="/403" component={() => <Errors code={403} />} />

          <Redirect to="/404" />
        </Switch>
        <Footer />
      </AuthStore>
    </Router>
  );
}

export default App;

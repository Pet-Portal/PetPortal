
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Pets from './screens/Pets';
import Users from './screens/Users';
import Posts from './screens/Posts';
import Login from './screens/Login';


function App() {
  return (
    <Router>
        <div className="container pt-4 pb-5">
          <Switch>        
            <Route exact path="/posts" component={Posts} />
          </Switch>
        </div>
    </Router>
  );
}

export default App;

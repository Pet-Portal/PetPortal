import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Posts from './screens/Posts';
import NavBar from '../src/components/nav/Navbar'


function App() {
  return (
    <Router>
      <NavBar />
        <div className="container pt-4 pb-5">
          <Switch>        
            <Route exact path="/posts" component={Posts} />
          </Switch>
        </div>
    </Router>
  );
}

export default App;

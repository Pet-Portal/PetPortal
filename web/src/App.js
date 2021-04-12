
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Posts from './screens/Posts';



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

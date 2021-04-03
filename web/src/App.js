
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Pets from './screens/Pets';


function App() {
  return (
    <Router>
        <div className="container pt-4 pb-5">
          <Switch>        
            <Route exact path="/pets" component={Pets} />
          </Switch>
        </div>
    </Router>
  );
}

export default App;

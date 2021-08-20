
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ViewOnly from './components/ViewOnly'
import Add from './components/Home'
import EditableRow from './components/EditableRow'





export default function App() {
  return (
    <Router>
<Switch>
    <Route exact path='/' component={ViewOnly}></Route>
    <Route exact path='/add' component={Add}></Route>
    <Route exact path='/edit' component={Add}></Route>
</Switch>
    </Router>
  );
}

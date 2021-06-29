import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Gallery from './components/gallery/Gallery';
import Header from './components/header/Header'
import AddProduct from './components/addProduct/AddProduct';


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Gallery}/>
          <Route exact path="/add" component={AddProduct}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

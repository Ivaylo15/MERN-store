import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Gallery from './components/gallery/Gallery';
import Header from './components/header/Header'
import AddProduct from './components/addProduct/AddProduct';
import EditProduct from './components/editProduct/EditProduct';
import ProductView from './components/productView/ProductView';


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Gallery}/>
          <Route exact path="/add" component={AddProduct}/>
          <Route exact path="/:id" component={ProductView}/>
          <Route exact path="/edit/:id" component={EditProduct} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

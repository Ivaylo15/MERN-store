import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Gallery from './components/gallery/Gallery';
import Header from './components/header/Header'
import AddProduct from './components/addProduct/AddProduct';
import ProductView from './components/productView/ProductView';
import EditProduct from './components/editProduct/EditProduct';
import LoginPage from './components/user/LoginPage';
import { useEffect } from 'react';
import { userServices } from './services/userServices';
import { useDispatch } from 'react-redux';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    userServices.getAuthUser(dispatch);
  }, [])

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Gallery}/>
          <Route exact path="/signIn" component={LoginPage} />
          <Route exact path="/add" component={AddProduct}/>
          <Route exact path="/:id" component={ProductView}/>
          <Route exact path="/edit/:id" component={EditProduct} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

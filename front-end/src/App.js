import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Gallery from './components/gallery/Gallery';
import Header from './components/header/Header'
import AddProduct from './components/addProduct/AddProduct';
import ProductView from './components/productView/ProductView';
import EditProduct from './components/editProduct/EditProduct';
import LoginPage from './components/user/LoginPage';
import ErrorLog from './components/errorPage/ErrorLog';
import { useEffect } from 'react';
import { userServices } from './services/userServices';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './redux/userSlice';
import Checkout from './components/checkout/Checkout';
import Auth from './Auth';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    userServices.getAuthUser(dispatch);
  }, [])

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Gallery} />
          <Route exact path="/signIn" render={(props) => user?.username ? <ErrorLog /> : <LoginPage {...props} />} />
          <Route exact path="/checkout" component={Checkout} />
          <Auth exact path="/add" component={AddProduct} />
          <Route exact path="/:id" component={ProductView} />
          <Auth exact path="/edit/:id" component={EditProduct} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

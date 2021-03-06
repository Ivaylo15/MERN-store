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
import { useCookies } from 'react-cookie';
import UserOrders from './components/orders/UserOrders';
import Profile from './components/user/profile/Profile';


function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [cookies] = useCookies();

  useEffect(() => {
    userServices.getAuthUser(dispatch, cookies);
  }, [])

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Gallery />
          </Route>
          <Route exact path="/signIn" render={(props) => user?.username ? <ErrorLog /> : <LoginPage {...props} />} />
          <Auth exact path="/orders" component={UserOrders} />
          <Route exact path="/checkout" component={Checkout} />
          <Auth exact path="/profile" component={Profile} />
          <Auth exact path="/add" component={AddProduct} />
          <Auth exact path="/edit/:id" component={EditProduct} />
          <Route exact path="/:id" component={ProductView} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

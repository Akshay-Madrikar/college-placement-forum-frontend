import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

// Core Components
import LandingPage from './components/core/landing-page/landing-page.component';
import Home from './components/core/home/home.component';

// Admin Components
import AdminDashboard from './components/admin/dashboard/dashboard.component';
import AddCompany from './components/admin/add-company/add-company.component';
import AddIndustry from './components/admin/add-industry/add-industry.component';

// User Components
import SignIn from './components/user/sign-in/sign-in.component';
import SignUp from './components/user/sign-up/sign-up.component';
import UserDashboard  from './components/user/dashboard/dashboard.component';

//Utils
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './utils/privateRoutes';
import AdminRoute from './utils/adminRoutes';

//Actions
import { loadUser } from './redux/auth/auth.actions'

if(localStorage.token) {
  setAuthToken(localStorage.token);
};

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
          <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/signin" component={SignIn}/>
              <Route exact path="/signup" component={SignUp}/>
              <PrivateRoute exact path="/user/dashboard" component={UserDashboard}/>
              <AdminRoute exact path="/admin/dashboard" component={AdminDashboard}/>
              <AdminRoute exact path="/create/company" component={AddCompany}/>
              <AdminRoute exact path="/create/industry" component={AddIndustry}/>
              {/* <Route exact path="/product/:productId" component={Product}/>
                <Route exact path="/cart" component={Cart}/>
                <PrivateRoute exact path="/profile/:userId" component={Profile}/>
                <AdminRoute exact path="/create/category" component={AddCategory}/>
                <AdminRoute exact path="/create/product" component={AddProduct}/>
                <AdminRoute exact path="/admin/orders" component={Orders}/>
                <AdminRoute exact path="/admin/products" component={ManageProducts}/>
                <AdminRoute exact path="/admin/product/update/:productId" component={UpdateProduct}/> */}
          </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

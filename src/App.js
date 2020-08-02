import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

import LandingPage from './components/landing-page/landing-page.component'
import SignIn from './components/sign-in/sign-in.component';
import SignUp from './components/sign-up/sign-up.component';
import Home from './components/home/home.component';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
          <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/signin" component={SignIn}/>
              <Route exact path="/signup" component={SignUp}/>
              {/* <Route exact path="/product/:productId" component={Product}/>
                <Route exact path="/cart" component={Cart}/>
                <PrivateRoute exact path="/user/dashboard" component={Dashboard}/>
                <PrivateRoute exact path="/profile/:userId" component={Profile}/>
                <AdminRoute exact path="/admin/dashboard" component={AdminDashboard}/>
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

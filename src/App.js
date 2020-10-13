import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

// Core Components
import LandingPage from './components/core/landing-page/landing-page.component';
import Home from './components/core/home/home.component';
import DiscoverCompanies from './components/core/discover-companies/discover-companies.component';
import Company from './components/core/company/company.component';
import Post from './components/core/single-post/single-post.component';
import Posts from './components/core/posts/posts.component';

// Admin Components
import AdminDashboard from './components/admin/dashboard/dashboard.component';
import AddCompany from './components/admin/add-company/add-company.component';
import AddIndustry from './components/admin/add-industry/add-industry.component';
import ManageCompanies from './components/admin/manage-companies/manage-companies.component';
import ManageStudents from './components/admin/manage-students/manage-students.component';
import UpdateCompany from './components/admin/update-company/update-company.component';

// User Components
import SignIn from './components/user/sign-in/sign-in.component';
import SignUp from './components/user/sign-up/sign-up.component';
import UserDashboard from './components/user/dashboard/dashboard.component';
import AddQuestionForm from './components/user/add-question-form/add-question-form.component';
import UpdateProfile from './components/user/update-profile/update-profile.component';
import ResetPassword from './components/user/reset-password/reset-password.component';
import NewPassword from './components/user/new-password/new-password.component';

//Utils
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './utils/privateRoutes';
import AdminRoute from './utils/adminRoutes';

//Actions
import { loadUser } from './redux/auth/auth.actions'

const App = () => {

  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
          <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/discover" component={DiscoverCompanies}/>
              <Route exact path="/signin" component={SignIn}/>
              <Route exact path="/signup" component={SignUp}/>
              <Route exact path="/company/:companyId" component={Company}/>
              <Route exact path="/reset-password" component={ResetPassword}/>
              <Route exact path="/reset-password/:token" component={NewPassword}/>
              <PrivateRoute exact path="/user/dashboard" component={UserDashboard}/>
              <PrivateRoute exact path="/post/:postId" component={Post}/>
              <PrivateRoute exact path="/posts" component={Posts}/>
              <PrivateRoute exact path="/user/company/add-questions" component={AddQuestionForm}/>
              <PrivateRoute exact path="/user/profile/:studentId" component={UpdateProfile}/>
              <AdminRoute exact path="/admin/dashboard" component={AdminDashboard}/>
              <AdminRoute exact path="/admin/create/company" component={AddCompany}/>
              <AdminRoute exact path="/admin/create/industry" component={AddIndustry}/>
              <AdminRoute exact path="/admin/companies" component={ManageCompanies}/>
              <AdminRoute exact path="/admin/students" component={ManageStudents}/>
              <AdminRoute exact path="/admin/update/company/:companyId" component={UpdateCompany}/>
          </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

import { combineReducers } from 'redux';

import authReducer from './auth/auth.reducer';
import companyReducer from './company/company.reducer';
import industryReducer from './industry/industry.reducer';
import postReducer from './post/post.reducer';

export default combineReducers({
    auth: authReducer,
    company: companyReducer,
    industry: industryReducer,
    post: postReducer
});
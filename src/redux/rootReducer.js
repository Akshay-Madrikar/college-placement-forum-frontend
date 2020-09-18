import { combineReducers } from 'redux';

import authReducer from './auth/auth.reducer';
import studentReducer from './student/student.reducer';
import companyReducer from './company/company.reducer';
import industryReducer from './industry/industry.reducer';
import postReducer from './post/post.reducer';

export default combineReducers({
    auth: authReducer,
    student: studentReducer,
    company: companyReducer,
    industry: industryReducer,
    post: postReducer
});
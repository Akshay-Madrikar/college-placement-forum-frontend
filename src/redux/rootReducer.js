import { combineReducers } from 'redux';

import authReducer from './auth/auth.reducer';
import companyReducer from './company/company.reducer';
import cloudImageReducer from './cloud-image/cloud-image.reducer';
import industryReducer from './industry/industry.reducer';

export default combineReducers({
    auth: authReducer,
    company: companyReducer,
    industry: industryReducer,
    cloudImage: cloudImageReducer
});
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'

import TabReducer from '../common/tab/tabReducer'
import Alerts from '../alerts/alertReducer';

const rootReducer = combineReducers({
    tab: TabReducer,
    form: formReducer,
    toastr: toastrReducer,
    Alerts: Alerts,
})

export default rootReducer
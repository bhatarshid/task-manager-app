import { combineReducers } from "redux";
import userReducer from "../features/user/userSlice";
import taskReducer from "../features/task/taskSlice";

const rootReducer = combineReducers({
  user: userReducer,
  task: taskReducer
})

export default rootReducer
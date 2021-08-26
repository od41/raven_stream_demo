import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import Login from '../pages/Login';
import * as R from './Constants';


export const PageRoutes = [
    { path: R.ROOT, name: "Home", Component: Home },
    { path: R.LOGIN, name: "Login", Component: Login },
    { path: R.DASHBOARD, name: "Dashboard", Component: Dashboard },
]
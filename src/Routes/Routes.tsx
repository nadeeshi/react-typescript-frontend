import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppDrawer from "../Components/Drawer/Drawer";
import UserPage from "../Pages/Users/User";
import CustomerPage from "../Pages/Customers/Customers";
import AddCustomer from "../Components/Customers/AddCustomer";
import DashboardPage from "../Pages/Dashboard/Dashboard";
import HealthPage from "../Pages/HealthCheck/HealthCheck";

const Routes = () => {

    const router = createBrowserRouter([
        {
            path: '/',
            element: (

                <AppDrawer />

            ),
            // errorElement: <CommonErrorPage/>,
            children: [
                {
                    path: '/',
                    element: <DashboardPage />
                },
                {
                    path: '/customers',
                    element: <CustomerPage />
                },
                {
                    path: 'editCustomer',
                    element: <AddCustomer />,
                },
                {
                    path: '/users',
                    element: <UserPage title="Test" />
                }, {
                    path: '/health',
                    element: <HealthPage />
                }
            ]
        }
    ]);

    return <RouterProvider router={router} />;
}

export default Routes;
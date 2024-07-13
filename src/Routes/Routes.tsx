import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppDrawer from "../Components/Drawer/Drawer";
import UserPage from "../Pages/Users/User";
import CustomerPage from "../Pages/Customers/Customers";
import AddCustomer from "../Components/Customers/AddCustomer";

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
                    element: <UserPage title="Test" />
                },
                {
                    path: '/customers',
                    element: <CustomerPage />
                },
                {
                    path: 'editCustomer',
                    element: <AddCustomer />,
                }
            ]
        }
    ]);

    return <RouterProvider router={router} />;
}

export default Routes;
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppDrawer from "../Components/Drawer/Drawer";
import UserPage from "../Pages/Users/User";
import CustomerPage from "../Pages/Customers/Customers";

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
                }
            ]
        }
    ]);

    return <RouterProvider router={router} />;
}

export default Routes;
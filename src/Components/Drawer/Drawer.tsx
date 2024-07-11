import { Box, Divider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import DrawerHeaderBar from "./DrawerHeaderBar";
import IconDrawer from "./IconDrawer";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const AppDrawer = () => {

    const [open, setOpen] = useState(false);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <DrawerHeaderBar
                open={open}
                menuToggle={() => {
                    setOpen(true);
                }}
            />

            <Divider />

            <IconDrawer
                isOpen={open}
                onOpen={(val) => {
                    setOpen(val);
                }}
            />

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <div className="outlet">
                    <Outlet />
                </div>
            </Box>

        </Box >
    )
}

export default AppDrawer;
import { CSSObject, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, Theme, useTheme } from "@mui/material";
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from '@mui/icons-material/Group';

import { NavLink } from 'react-router-dom';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const adminMenu = ['Dashboard', 'Customers', 'Users'];

const adminIcons: { icon: JSX.Element; to: string; }[] = [
    { icon: <DashboardIcon />, to: '/' },
    { icon: <GroupIcon />, to: '/customers' },
    { icon: <GroupIcon />, to: '/users' }
]


interface IIconDrawerProps {
    isOpen: boolean;
    onOpen: (state: boolean) => void;
}

const IconDrawer = (props: IIconDrawerProps) => {

    const theme = useTheme();

    const handleDrawerClose = () => {
        props.onOpen(false);
    }

    return (
        <Drawer variant="permanent" open={props.isOpen}>
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {adminMenu.map((menuItem, index) => (
                    <NavLink
                        key={index}
                        to={adminIcons[index].to}
                        style={{ color: 'blue' }}
                        onMouseEnter={() => {
                            props.onOpen(true);
                        }}
                        onMouseLeave={() => {
                            props.onOpen(false);
                        }}
                    >
                        <ListItem>
                            <ListItemButton>
                                <ListItemIcon>{adminIcons[index].icon}</ListItemIcon>
                                <ListItemText primary={menuItem} />
                            </ListItemButton>
                        </ListItem>

                    </NavLink>
                ))}
            </List>
        </Drawer>
    )
}


export default IconDrawer;

import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { Badge, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './Drawer.scss';
import { AccountCircle } from '@mui/icons-material';

interface IDrawerHeaderProps {
    open?: boolean;
    menuToggle?: (state: boolean) => void;
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<IDrawerHeaderProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeaderBar = (props: IDrawerHeaderProps) => {

    return (
        <AppBar position="fixed" open={props.open}>
            <Toolbar className='drawerHeader'>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => {
                        if (props.menuToggle) {
                            props.menuToggle(true);
                        }
                    }}
                    edge="start"
                    sx={{
                        marginRight: 5
                    }}
                >
                    <MenuIcon />

                </IconButton>

                <img
                    src={'/Images/nr_logo.PNG'}
                    alt='Logo'
                    style={{
                        width: '80px',
                        height: '50px',
                        margin: '0px 10px -5px 5px'
                    }}
                />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    NR Hotels
                </Typography>

                <div>
                    <Typography
                        variant='h6'
                        sx={{ display: 'inline', marginRight: 2 }}
                    >

                    </Typography>

                    <IconButton
                        size='large'
                        aria-label='show 0 new notifications'
                        color='inherit'
                    >
                        <Badge badgeContent={0} color='error'>
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton
                        size='large'
                        aria-label='account of current user'
                        aria-controls='menu-appBar'
                        aria-haspopup='true'
                        color='inherit'
                    >
                        <Typography
                            variant='h6'
                            component='div'
                            sx={{ flexGrow: 1 }}
                        >
                            Admin
                        </Typography>
                        <AccountCircle />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    )

}

export default DrawerHeaderBar;
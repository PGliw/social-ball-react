import React from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline'
import Appbar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import {ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import IconButton from '@material-ui/core/IconButton';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import logo from './assets/logo.svg';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: "#478101",
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
        display: "inline-block"
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: (theme.mixins.toolbar),
    content: {
        flexGrow: 1,
        padding: "86px 24px 24px",
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
        height: "100vh"
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

const NavDrawer = ({children}) => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true)
    };

    const handleDrawerClose = () => {
        setOpen(false)
    };

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <Appbar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={classes.menuButton}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <img src={logo} width="50" height="50" />
                    <Typography variant="h6" className={classes.title}>
                        Social-ball
                    </Typography>
                </Toolbar>
            </Appbar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left">
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    <ListItem>
                        <ListItemIcon><SportsSoccerIcon/></ListItemIcon>
                        <ListItemText>Mecze</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><EqualizerIcon/></ListItemIcon>
                        <ListItemText>Statystyki</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><AccountBoxIcon/></ListItemIcon>
                        <ListItemText>Profil</ListItemText>
                    </ListItem>
                </List>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                {children}
            </main>
        </div>
    );
};

export default NavDrawer;

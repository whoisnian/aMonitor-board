import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  Link,
  IconButton,
  Hidden,
  Divider,
  ListItem,
  ListItemText
} from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import { PackageVersion } from '../../utils'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  drawerPaper: {
    width: drawerWidth
  },
  placeholderToolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}))

export default function Navigation (props) {
  const classes = useStyles()

  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <Toolbar className={classes.toolbar}>
        <Link color='inherit' variant='h6' href='/'>
            aMonitor-board
        </Link>
        <Link color='textSecondary' variant='caption' href='https://github.com/whoisnian/aMonitor-board'>
          {'v' + PackageVersion}
        </Link>
      </Toolbar>
      <Divider />
      <List>
        <ListItem button component='a' href='/overview'>
          <ListItemText primary='概览' />
        </ListItem>
        <ListItem button component='a' href='/agents'>
          <ListItemText primary='主机列表' />
        </ListItem>
        <ListItem button component='a' href='/groups'>
          <ListItemText primary='规则管理' />
        </ListItem>
        <ListItem button component='a' href='/receivers'>
          <ListItemText primary='推送管理' />
        </ListItem>
        <ListItem button component='a' href='/messages'>
          <ListItemText primary='警报历史' />
        </ListItem>
        <ListItem button component='a' href='/preferences'>
          <ListItemText primary='系统设置' />
        </ListItem>
      </List>
      <Divider />
    </div>
  )

  const container = window !== undefined ? () => window.document.body : undefined

  return (
    <div className={classes.root}>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
          <Typography variant='h6'>
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden smUp implementation='css'>
          <Drawer
            container={container}
            variant='temporary'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{ paper: classes.drawerPaper }}
            ModalProps={{ keepMounted: true }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{ paper: classes.drawerPaper }}
            variant='permanent'
            anchor='left'
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.placeholderToolbar} />
        {props.children}
      </main>
    </div>
  )
}

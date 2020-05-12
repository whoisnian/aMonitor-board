import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  Link,
  Divider,
  ListItem,
  ListItemText
} from '@material-ui/core'
import { PackageVersion } from '../../utils'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
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

  return (
    <div className={classes.root}>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <Typography variant='h6'>
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        anchor='left'
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
      >
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
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.placeholderToolbar} />
        {props.children}
      </main>
    </div>
  )
}

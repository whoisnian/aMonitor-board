import React from 'react'
import ReactDOM from 'react-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box
} from '@material-ui/core'
import { GitHub } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1
  },
  toolbarButton: {
    marginLeft: theme.spacing(1)
  },
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  box: {
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '120px',
    padding: '30px 0'
  },
  buttonGroup: {
    display: 'flex',
    alignSelf: 'stretch',
    justifyContent: 'space-evenly'
  },
  githubButton: {
    textTransform: 'none'
  }
}))

function TitleBar () {
  const classes = useStyles()
  const auth = true

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' className={classes.title}>
          aMonitor-board
        </Typography>
        {auth ? (
          <div>
            <Button variant='outlined' color='inherit' className={classes.toolbarButton} href='overview'>
              控制台
            </Button>
          </div>
        ) : (
          <div>
            <Button variant='outlined' color='inherit' className={classes.toolbarButton} href='auth#signIn'>
              登 录
            </Button>
            <Button variant='outlined' color='inherit' className={classes.toolbarButton} href='auth#signUp'>
              注 册
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  )
}

function GitHubButton (props) {
  const classes = useStyles()

  return (
    <Button
      variant='contained'
      color='primary'
      className={classes.githubButton}
      startIcon={<GitHub />}
      href={props.href}
    >
      {props.children}
    </Button>
  )
}

function Detail () {
  const classes = useStyles()

  return (
    <Container maxWidth='sm' className={classes.container}>
      <Box className={classes.box}>
        <img width='192px' height='192px' src='/img/aMonitor-logo.svg' />
        <Typography variant='h2'>
          aMonitor
        </Typography>
        <Box className={classes.buttonGroup}>
          <GitHubButton href='https://github.com/whoisnian/aMonitor-agent'>
            agent
          </GitHubButton>
          <GitHubButton href='https://github.com/whoisnian/aMonitor-storage'>
            storage
          </GitHubButton>
          <GitHubButton href='https://github.com/whoisnian/aMonitor-board'>
            board
          </GitHubButton>
          <GitHubButton href='https://github.com/whoisnian/aMonitor-source'>
            source
          </GitHubButton>
        </Box>
      </Box>
    </Container>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <TitleBar />
    <Detail />
  </React.StrictMode>,
  document.getElementById('root')
)

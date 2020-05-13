import React from 'react'
import ReactDOM from 'react-dom'
import { makeStyles } from '@material-ui/core/styles'
import { CssBaseline, Container, Box } from '@material-ui/core'
import AuthBox from '../../components/authbox'
import { requestSelfInfo } from '../../api'

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'fixed',
    height: '100%',
    left: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  boxPlaceholder: {
    minHeight: '45%'
  }
}))

function App () {
  const classes = useStyles()

  React.useEffect(() => {
    // 检查是否已经登录
    (async () => {
      const content = await requestSelfInfo()
      if (content) { window.location.href = '/' }
    })()
  }, [])

  return (
    <Container maxWidth='sm' className={classes.container}>
      <Box className={classes.boxPlaceholder}>
        <AuthBox />
      </Box>
    </Container>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

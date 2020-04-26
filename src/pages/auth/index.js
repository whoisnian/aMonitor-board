import React from 'react'
import ReactDOM from 'react-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Box } from '@material-ui/core'
import AuthBox from '../../components/authbox'

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
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
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

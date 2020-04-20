import React from 'react'
import ReactDOM from 'react-dom'
import Button from '@material-ui/core/Button'

function App () {
  return (
    <Button variant='contained' color='primary'>
      hello from home
    </Button>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

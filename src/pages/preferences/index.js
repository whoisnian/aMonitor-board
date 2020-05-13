import React from 'react'
import ReactDOM from 'react-dom'
import {
  CssBaseline,
  Grid,
  FormControlLabel,
  Switch
} from '@material-ui/core'
import Navigation from '../../components/navigation'
import {
  requestAllPreferences,
  requestUpdatePreference
} from '../../api'

function App () {
  const [preferences, setPreferences] = React.useState({
    forbidSignUp: 'false'
  })

  const handleForbidSignUp = (event) => {
    const newValue = event.target.checked ? 'true' : 'false'
    requestUpdatePreference('forbidSignUp', newValue) // async
    setPreferences({ ...preferences, forbidSignUp: newValue })
  }

  React.useEffect(() => {
    (async () => {
      const content = await requestAllPreferences()
      setPreferences(content)
    })()
  }, [])

  return (
    <Navigation title='系统设置'>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <FormControlLabel
            name='forbidSignUp'
            label='禁止注册'
            labelPlacement='end'
            control={<Switch checked={preferences.forbidSignUp === 'true'} onChange={handleForbidSignUp} />}
          />
        </Grid>
      </Grid>
    </Navigation>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

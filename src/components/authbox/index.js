import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Box,
  Tabs,
  Tab
} from '@material-ui/core'
import {
  UsernameInput,
  EmailInput,
  PasswordInput,
  SubmitButton
} from './input'

const useStyles = makeStyles((theme) => ({
  box: {
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius
  }
}))

export default function AuthBox () {
  const classes = useStyles()
  const [tabIndex, setTabIndex] = React.useState(window.location.hash === '#signUp' ? 1 : 0)

  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue)
    window.history.replaceState(null, null, newValue === 1 ? '#signUp' : '#signIn')

    // 像下面这样直接修改 location.hash 会在 window.history 中增加新的 state，影响浏览器前进后退切换页面的体验，因此换用 history.replaceState()
    // window.location.hash = (newValue === 1 ? '#signUp' : '#signIn')
  }

  window.onpopstate = () => {
    setTabIndex(window.location.hash === '#signUp' ? 1 : 0)
  }

  return (
    <Box className={classes.box}>
      <Tabs value={tabIndex} onChange={handleChangeTab} centered>
        <Tab label='登录' id='signIn' />
        <Tab label='注册' id='signUp' />
      </Tabs>
      <Box hidden={tabIndex !== 0} id='signInPanel'>
        <form autoComplete='on'>
          <EmailInput /><br />
          <PasswordInput />
          <Box textAlign='right' marginTop={1}>
            <SubmitButton>登 录</SubmitButton>
          </Box>
        </form>
      </Box>
      <Box hidden={tabIndex !== 1} id='signUpPanel'>
        <form autoComplete='on'>
          <UsernameInput /><br />
          <EmailInput /><br />
          <PasswordInput />
          <Box textAlign='right' marginTop={1}>
            <SubmitButton>注 册</SubmitButton>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

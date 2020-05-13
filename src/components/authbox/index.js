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
import {
  requestSignIn,
  requestSignUp,
  requestPreference
} from '../../api'

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
  const [signInStatus, setSignInStatus] = React.useState()
  const [signInMessage, setSignInMessage] = React.useState()
  const [signUpStatus, setSignUpStatus] = React.useState()
  const [signUpMessage, setSignUpMessage] = React.useState()
  const [forbidSignUp, setForbidSignUp] = React.useState(false)

  const signInEmailRef = React.useRef()
  const signInPasswordRef = React.useRef()
  const signUpUsernameRef = React.useRef()
  const signUpEmailRef = React.useRef()
  const signUpPasswordRef = React.useRef()

  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue)
    window.history.replaceState(null, null, newValue === 1 ? '#signUp' : '#signIn')

    // 像下面这样直接修改 location.hash 会在 window.history 中增加新的 state，影响浏览器前进后退切换页面的体验，因此换用 history.replaceState()
    // window.location.hash = (newValue === 1 ? '#signUp' : '#signIn')
  }

  window.onpopstate = () => {
    setTabIndex(window.location.hash === '#signUp' ? 1 : 0)
  }

  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const handleSignIn = async (event) => {
    event.preventDefault()
    setSignInStatus('loading')

    const email = signInEmailRef.current.value
    const password = signInPasswordRef.current.value

    if (!emailRegex.test(email)) {
      setSignInMessage('邮箱地址不合法')
      setSignInStatus('error')
      return
    }

    if (password.length < 1) {
      setSignInMessage('密码不能为空')
      setSignInStatus('error')
      return
    }

    const { ok, msg } = await requestSignIn(email, password)
    if (!ok) {
      setSignInMessage(msg)
      setSignInStatus('error')
      return
    }

    setSignInStatus('success')
    window.location.href = '/'
  }

  const handleSignUp = async (event) => {
    event.preventDefault()
    setSignUpStatus('loading')

    const username = signUpUsernameRef.current.value
    const email = signUpEmailRef.current.value
    const password = signUpPasswordRef.current.value

    if (username.length < 1) {
      setSignUpMessage('用户名不能为空')
      setSignUpStatus('error')
      return
    }

    if (!emailRegex.test(email)) {
      setSignUpMessage('邮箱地址不合法')
      setSignUpStatus('error')
      return
    }

    if (password.length < 6) {
      setSignUpMessage('密码至少六位')
      setSignUpStatus('error')
      return
    }

    const { ok, msg } = await requestSignUp(username, email, password)
    if (!ok) {
      setSignUpMessage(msg)
      setSignUpStatus('error')
      return
    }

    setSignUpStatus('success')
    window.location.href = '/'
  }

  React.useEffect(() => {
    // 检查是否禁止注册
    (async () => {
      const content = await requestPreference('forbidSignUp')
      if (content && content.value === 'true') {
        setForbidSignUp(true)
        setSignUpMessage('管理员已关闭注册')
        setSignUpStatus('error')
      }
    })()
  }, [])

  return (
    <Box className={classes.box}>
      <Tabs value={tabIndex} onChange={handleChangeTab} centered>
        <Tab label='登录' id='signIn' />
        <Tab label='注册' id='signUp' />
      </Tabs>
      <Box hidden={tabIndex !== 0} id='signInPanel'>
        <form autoComplete='on'>
          <EmailInput ref={signInEmailRef} /><br />
          <PasswordInput ref={signInPasswordRef} />
          <SubmitButton msg={signInMessage} status={signInStatus} onClick={handleSignIn}>登 录</SubmitButton>
        </form>
      </Box>
      <Box hidden={tabIndex !== 1} id='signUpPanel'>
        <form autoComplete='on'>
          <UsernameInput ref={signUpUsernameRef} /><br />
          <EmailInput ref={signUpEmailRef} /><br />
          <PasswordInput ref={signUpPasswordRef} />
          <SubmitButton msg={signUpMessage} status={signUpStatus} onClick={handleSignUp} disabled={forbidSignUp}>注 册</SubmitButton>
        </form>
      </Box>
    </Box>
  )
}

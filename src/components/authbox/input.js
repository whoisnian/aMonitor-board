import React from 'react'
import {
  FormControl,
  InputAdornment,
  Input,
  IconButton,
  Button
} from '@material-ui/core'
import {
  AccountCircle,
  Email,
  Lock,
  Visibility,
  VisibilityOff
} from '@material-ui/icons'

const UsernameInput = function () {
  return (
    <FormControl fullWidth variant='outlined' margin='normal'>
      <Input
        name='username'
        placeholder='用户名'
        startAdornment={
          <InputAdornment position='start'>
            <AccountCircle />
          </InputAdornment>
        }
      />
    </FormControl>
  )
}

const EmailInput = function () {
  return (
    <FormControl fullWidth variant='outlined' margin='normal'>
      <Input
        name='email'
        placeholder='邮箱'
        startAdornment={
          <InputAdornment position='start'>
            <Email />
          </InputAdornment>
        }
      />
    </FormControl>
  )
}

const PasswordInput = function () {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <FormControl fullWidth variant='outlined' margin='normal'>
      <Input
        name='password'
        placeholder='密码'
        type={showPassword ? 'text' : 'password'}
        startAdornment={
          <InputAdornment position='start'>
            <Lock />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position='end'>
            <IconButton onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}

const SubmitButton = function (props) {
  return (
    <Button
      variant='contained'
      color='primary'
      type='submit'
    >
      {props.children}
    </Button>
  )
}

export { UsernameInput, EmailInput, PasswordInput, SubmitButton }

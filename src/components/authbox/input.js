import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Box,
  FormControl,
  InputAdornment,
  Input,
  IconButton,
  Button,
  CircularProgress,
  Typography
} from '@material-ui/core'
import {
  AccountCircle,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Error,
  CheckCircle
} from '@material-ui/icons'

const UsernameInput = React.forwardRef((props, ref) => {
  return (
    <FormControl fullWidth variant='outlined' margin='normal'>
      <Input
        inputRef={ref}
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
})

const EmailInput = React.forwardRef((props, ref) => {
  return (
    <FormControl fullWidth variant='outlined' margin='normal'>
      <Input
        inputRef={ref}
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
})

const PasswordInput = React.forwardRef((props, ref) => {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <FormControl fullWidth variant='outlined' margin='normal'>
      <Input
        inputRef={ref}
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
})

const useStyles = makeStyles((theme) => ({
  box: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  msg: {
    color: theme.palette.error.main,
    marginRight: theme.spacing(1)
  },
  errorIcon: {
    color: theme.palette.error.main,
    marginRight: theme.spacing(1)
  },
  successIcon: {
    color: theme.palette.success.main,
    marginRight: theme.spacing(1)
  },
  progress: {
    marginRight: theme.spacing(1)
  }
}))

const SubmitButton = function (props) {
  const classes = useStyles()

  return (
    <Box className={classes.box}>
      {props.status === 'error' && <Typography className={classes.msg}>{props.msg}</Typography>}
      {props.status === 'error' && <Error className={classes.errorIcon} />}
      {props.status === 'success' && <CheckCircle className={classes.successIcon} />}
      {props.status === 'loading' && <CircularProgress size={24} className={classes.progress} />}
      <Button
        variant='contained'
        color='primary'
        type='submit'
        disabled={props.status === 'loading'}
        onClick={props.onClick}
      >
        {props.children}
      </Button>
    </Box>
  )
}

export { UsernameInput, EmailInput, PasswordInput, SubmitButton }

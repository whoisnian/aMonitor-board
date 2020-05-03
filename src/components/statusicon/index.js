import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import { CheckCircle, Error, Info } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  logoButton: {
    padding: 0
  },
  okIcon: {
    color: theme.palette.success.main
  },
  errorIcon: {
    color: theme.palette.error.main
  },
  offIcon: {
    color: theme.palette.action.disabled
  }
}))

const okIcon = () => {
  const classes = useStyles()

  return (
    <IconButton className={classes.logoButton} disabled>
      <CheckCircle className={classes.okIcon} />
    </IconButton>
  )
}

const errorIcon = () => {
  const classes = useStyles()

  return (
    <IconButton className={classes.logoButton} disabled>
      <Error className={classes.errorIcon} />
    </IconButton>
  )
}

const offIcon = () => {
  const classes = useStyles()

  return (
    <IconButton className={classes.logoButton} disabled>
      <Info className={classes.offIcon} />
    </IconButton>
  )
}

export default function StatusIcon (props) {
  const status = props.status.toLowerCase()

  if (status === 'ok') return okIcon()
  else if (status === 'error') return errorIcon()
  else if (status === 'off') return offIcon()
}

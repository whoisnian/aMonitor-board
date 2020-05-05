import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import { CheckCircle, Error, Info, Help } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  logoButton: {
    padding: 0
  },
  okIcon: {
    color: theme.palette.success.main,
    pointerEvents: 'auto'
  },
  errorIcon: {
    color: theme.palette.error.main,
    pointerEvents: 'auto'
  },
  offIcon: {
    color: theme.palette.action.disabled,
    pointerEvents: 'auto'
  },
  unknownIcon: {
    color: theme.palette.action.disabled,
    pointerEvents: 'auto'
  }
}))

const okIcon = () => {
  const classes = useStyles()

  return (
    <IconButton title='正常' className={classes.logoButton} disabled>
      <CheckCircle className={classes.okIcon} />
    </IconButton>
  )
}

const errorIcon = () => {
  const classes = useStyles()

  return (
    <IconButton title='报警' className={classes.logoButton} disabled>
      <Error className={classes.errorIcon} />
    </IconButton>
  )
}

const offIcon = () => {
  const classes = useStyles()

  return (
    <IconButton title='关机' className={classes.logoButton} disabled>
      <Info className={classes.offIcon} />
    </IconButton>
  )
}

const unknownIcon = () => {
  const classes = useStyles()

  return (
    <IconButton title='未知' className={classes.logoButton} disabled>
      <Help className={classes.unknownIcon} />
    </IconButton>
  )
}

export default function StatusIcon (props) {
  const status = props.status.toLowerCase()

  if (status === 'ok') return okIcon()
  else if (status === 'error') return errorIcon()
  else if (status === 'off') return offIcon()
  else return unknownIcon()
}

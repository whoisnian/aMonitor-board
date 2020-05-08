import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  create: {
    color: theme.palette.success.main
  },
  modify: {
    color: theme.palette.info.main
  },
  delete: {
    color: theme.palette.error.main
  },
  move: {
    color: theme.palette.warning.main
  },
  other: {
    color: theme.palette.action.disabled
  }
}))

export default function FIleMDEvent (props) {
  const classes = useStyles()

  const event = props.event.toLowerCase()
  let label = <Typography variant='inherit' className={classes.other}>{event}</Typography>

  switch (event) {
    case 'create':
      label = <Typography variant='inherit' className={classes.create}>创建</Typography>
      break
    case 'modify':
      label = <Typography variant='inherit' className={classes.modify}>修改</Typography>
      break
    case 'delete':
      label = <Typography variant='inherit' className={classes.delete}>删除</Typography>
      break
    case 'move':
      label = <Typography variant='inherit' className={classes.move}>移动</Typography>
      break
  }

  return label
}

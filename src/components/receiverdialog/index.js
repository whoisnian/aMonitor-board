import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core'
import { requestCreateReceiver } from '../../api'

const useStyles = makeStyles((theme) => ({
  input: {
    marginBottom: theme.spacing(1)
  }
}))

export default function ReceiverDialog (props) {
  const classes = useStyles()

  const nameRef = React.useRef()
  const typeRef = React.useRef()
  const addrRef = React.useRef()
  const tokenRef = React.useRef()

  const handleOK = async () => {
    const name = nameRef.current.value
    const type = typeRef.current.value
    const addr = addrRef.current.value
    const token = tokenRef.current.value

    await requestCreateReceiver(name, type, addr, token)

    props.onClose()
    props.reload()
  }

  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle>新建推送</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id='name'
            inputRef={nameRef}
            label='推送名称'
            fullWidth
            className={classes.input}
          />
          <FormControl fullWidth className={classes.input}>
            <InputLabel>推送类型</InputLabel>
            <Select
              id='type'
              inputRef={typeRef}
            >
              <MenuItem value='email'>邮件</MenuItem>
              <MenuItem value='wechat'>微信Bot</MenuItem>
              <MenuItem value='dingding'>钉钉Bot</MenuItem>
              <MenuItem value='lark'>飞书Bot</MenuItem>
              <MenuItem value='sms'>短信</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id='addr'
            inputRef={addrRef}
            label='推送地址'
            fullWidth
            className={classes.input}
          />
          <TextField
            id='token'
            inputRef={tokenRef}
            label='身份凭据（可留空）'
            fullWidth
            className={classes.input}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color='secondary'>
            取消
          </Button>
          <Button onClick={handleOK} color='primary'>
            确定
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

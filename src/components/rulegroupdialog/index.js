import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@material-ui/core'
import { requestCreateRuleGroup } from '../../api'

export default function RuleGroupDialog (props) {
  const nameRef = React.useRef()

  const handleOK = async () => {
    const name = nameRef.current.value
    await requestCreateRuleGroup(name)
    props.onClose()
    props.reload()
  }

  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle>新建规则组</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id='name'
            inputRef={nameRef}
            label='规则组名称'
            fullWidth
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

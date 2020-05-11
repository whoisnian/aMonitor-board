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
import { requestCreateRule, requestUpdateRule } from '../../api'

const useStyles = makeStyles((theme) => ({
  input: {
    marginBottom: theme.spacing(1)
  }
}))

const events = {
  cpu: [
    'used_percent_reach'
  ],
  mem: [
    'ram_used_percent_reach'
  ],
  load: [
    'avg1_reach',
    'avg5_reach',
    'avg15_reach'
  ],
  net: [
    'receive_rate_reach',
    'transmit_rate_reach'
  ],
  disk: [
    'read_rate_reach',
    'write_rate_reach'
  ],
  mount: [
    'used_size_percent_reach',
    'used_nodes_percent_reach'
  ],
  sshd: [
    'login_by_password',
    'login_ip_first_use'
  ],
  filemd: [
    'md'
  ]
}

const description = {
  cpu: {
    used_percent_reach: 'CPU使用率达到'
  },
  mem: {
    ram_used_percent_reach: '内存占用率达到'
  },
  load: {
    avg1_reach: '一分钟负载达到',
    avg5_reach: '五分钟负载达到',
    avg15_reach: '十五分钟负载达到'
  },
  net: {
    receive_rate_reach: '下载速度达到',
    transmit_rate_reach: '上传速度达到'
  },
  disk: {
    read_rate_reach: '磁盘读取速度达到',
    write_rate_reach: '磁盘写入速度达到'
  },
  mount: {
    used_size_percent_reach: '磁盘空间利用率达到',
    used_nodes_percent_reach: '磁盘inode利用率达到'
  },
  sshd: {
    login_by_password: '使用密码进行登录',
    login_ip_first_use: '首次从陌生IP登录'
  },
  filemd: {
    md: '文件被修改'
  }
}

export default function RuleDialog (props) {
  const classes = useStyles()

  const [eventObj, setEventObj] = React.useState({
    list: props.rule ? events[props.rule.target] : [],
    desc: props.rule ? description[props.rule.target] : {}
  })
  const [curEvent, setCurEvent] = React.useState(props.rule ? props.rule.event : '')
  const nameRef = React.useRef()
  const targetRef = React.useRef()
  const additionRef = React.useRef()
  const eventRef = React.useRef()
  const thresholdRef = React.useRef()
  const intervalRef = React.useRef()
  const silentRef = React.useRef()
  const levelRef = React.useRef()

  const handleTargetChange = async (event) => {
    setCurEvent('')
    setEventObj({
      list: events[event.target.value],
      desc: description[event.target.value]
    })
  }

  const handleEventChange = async (event) => {
    setCurEvent(event.target.value)
  }

  const handleOK = async () => {
    const name = nameRef.current.value
    const target = targetRef.current.value
    const addition = additionRef.current.value
    const event = eventRef.current.value
    const threshold = parseInt(thresholdRef.current.value)
    const interval = parseInt(intervalRef.current.value)
    const silent = parseInt(silentRef.current.value)
    const level = levelRef.current.value

    if (props.rule) {
      await requestUpdateRule(props.rule.id, name, target, addition, event, threshold, interval, silent, level, props.groupID)
    } else {
      await requestCreateRule(name, target, addition, event, threshold, interval, silent, level, props.groupID)
    }

    props.onClose()
    props.reload()
  }

  React.useEffect(() => {
    if (props.open && props.rule) {
      setCurEvent(props.rule.event)
      setEventObj({
        list: events[props.rule.target],
        desc: description[props.rule.target]
      })
    }
  }, [props.rule, props.open])

  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle>{props.rule ? '编辑规则' : '新建规则'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus={!props.rule}
            id='name'
            inputRef={nameRef}
            label='规则名称'
            defaultValue={props.rule ? props.rule.name : ''}
            fullWidth
            required
            className={classes.input}
          />
          <FormControl fullWidth required className={classes.input}>
            <InputLabel>生效目标</InputLabel>
            <Select
              id='target'
              inputRef={targetRef}
              defaultValue={props.rule ? props.rule.target : ''}
              onChange={handleTargetChange}
            >
              <MenuItem value='cpu'>CPU</MenuItem>
              <MenuItem value='mem'>内存</MenuItem>
              <MenuItem value='load'>平均负载</MenuItem>
              <MenuItem value='net'>网络流量</MenuItem>
              <MenuItem value='disk'>磁盘读写</MenuItem>
              <MenuItem value='mount'>挂载点</MenuItem>
              <MenuItem value='sshd'>SSH登录</MenuItem>
              <MenuItem value='filemd'>文件修改</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id='addition'
            inputRef={additionRef}
            label='额外条件（挂载点路径或文件路径）'
            defaultValue={props.rule ? props.rule.addition : ''}
            fullWidth
            className={classes.input}
          />
          <FormControl fullWidth required className={classes.input}>
            <InputLabel>触发事件</InputLabel>
            <Select
              id='event'
              inputRef={eventRef}
              defaultValue={props.rule ? props.rule.event : ''}
              onChange={handleEventChange}
              value={curEvent}
            >
              {eventObj.list && eventObj.list.map((event) => (
                <MenuItem key={event} value={event}>{eventObj.desc[event]}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id='threshold'
            inputRef={thresholdRef}
            label='阈值（n%*10000 或 Bytes/s）'
            defaultValue={props.rule ? props.rule.threshold : ''}
            fullWidth
            className={classes.input}
          />
          <TextField
            id='interval'
            inputRef={intervalRef}
            label='计算范围（毫秒）'
            defaultValue={props.rule ? props.rule.interval : ''}
            fullWidth
            className={classes.input}
          />
          <TextField
            id='silent'
            inputRef={silentRef}
            label='静默时间（毫秒）'
            defaultValue={props.rule ? props.rule.silent : ''}
            fullWidth
            className={classes.input}
          />
          <FormControl fullWidth required className={classes.input}>
            <InputLabel>等级</InputLabel>
            <Select
              id='level'
              inputRef={levelRef}
              defaultValue={props.rule ? props.rule.level : ''}
            >
              <MenuItem value='info'>通知（info）</MenuItem>
              <MenuItem value='warning'>警告（warning）</MenuItem>
              <MenuItem value='critical'>严重（critical）</MenuItem>
            </Select>
          </FormControl>
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

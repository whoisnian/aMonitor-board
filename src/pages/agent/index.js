import React from 'react'
import ReactDOM from 'react-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  CssBaseline,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText
} from '@material-ui/core'
import { RestoreFromTrash, Delete, Autorenew } from '@material-ui/icons'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers'
import Navigation from '../../components/navigation'
import DistroLogo from '../../components/distrologo'
import StatusIcon from '../../components/statusicon'
import FIleMDEvent from '../../components/filemdevent'
import {
  CpuChart,
  MemChart,
  LoadChart,
  NetRateChart,
  NetPacketsChart,
  DiskRateChart,
  DiskReqChart
} from '../../components/chart'
import {
  requestDeleteAgent,
  requestRecoverAgent,
  requestUpdateAgentStatus,
  requestAgentInfo,
  requestCpuInfo,
  requestMemInfo,
  requestLoadInfo,
  requestNetInfo,
  requestDiskInfo,
  requestMountsInfo,
  requestSshdInfo,
  requestFileMDInfo
} from '../../api'
import { calcFromKB, formatDate, textBeforeSpace } from '../../utils'

const useStyles = makeStyles((theme) => ({
  tableBorder: {
    borderLeftWidth: '1px',
    borderLeftStyle: 'solid',
    borderLeftColor: theme.palette.divider
  },
  actionCell: {
    padding: theme.spacing(1)
  },
  actionButton: {
    marginLeft: theme.spacing(1)
  },
  distroLogo: {
    verticalAlign: 'middle',
    display: 'inline-block',
    width: 24,
    height: 24
  },
  chartContainer: {
    marginTop: theme.spacing(1)
  },
  buttonGroup: {
    margin: theme.spacing(1)
  },
  timePicker: {
    width: '9em',
    verticalAlign: 'middle',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dialogContent: {
    wordBreak: 'break-all'
  }
}))

function App () {
  const classes = useStyles()

  const [agentInfo, setAgentInfo] = React.useState()
  const [interval, setInterval] = React.useState(3600000)
  const tempNow = Date.now()
  const [from, setFrom] = React.useState(new Date(tempNow - 3600000))
  const [to, setTo] = React.useState(new Date(tempNow))

  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [dialogContent, setDialogContent] = React.useState('')

  const [cpuData, setCpuData] = React.useState({
    labels: [],
    data: [[]]
  })
  const [memData, setMemData] = React.useState({
    labels: [],
    data: [[]]
  })
  const [loadData, setLoadData] = React.useState({
    labels: [],
    data: [[], [], []]
  })
  const [netRateData, setNetRateData] = React.useState({
    labels: [],
    data: [[]]
  })
  const [netPacketsData, setNetPacketsData] = React.useState({
    labels: [],
    data: [[]]
  })
  const [diskRateData, setDiskRateData] = React.useState({
    labels: [],
    data: [[]]
  })
  const [diskReqData, setDiskReqData] = React.useState({
    labels: [],
    data: [[]]
  })
  const [mountsData, setMountsData] = React.useState([])
  const [sshdData, setSshdData] = React.useState([])
  const [fileMDData, setFileMDData] = React.useState([])

  const handleFixClick = async () => {
    await requestUpdateAgentStatus('ok', agentInfo.id) // async
    setAgentInfo({ ...agentInfo, status: 'ok' })
  }

  const handleDeleteClick = async () => {
    await requestDeleteAgent(agentInfo.id) // async
    setAgentInfo({ ...agentInfo, deleted: true })
  }

  const handleRecoverClick = async () => {
    await requestRecoverAgent(agentInfo.id) // async
    setAgentInfo({ ...agentInfo, deleted: false })
  }

  const handleButtonGroupClick = (v) => {
    setInterval(v)
    const tempNow = Date.now()
    setFrom(new Date(tempNow - v))
    setTo(new Date(tempNow))
  }

  const showDialog = (content) => {
    setDialogContent(content)
    setDialogOpen(true)
  }

  React.useEffect(() => {
    (async () => {
      const id = new URLSearchParams(window.location.search).get('id')
      if (!id) window.location.href = '/agents'

      const content = await requestAgentInfo(id)
      setAgentInfo(content)
    })()
  }, [])

  React.useEffect(() => {
    (async () => {
      const id = new URLSearchParams(window.location.search).get('id')
      if (!id) window.location.href = '/agents'

      const tempData = {
        labels: [],
        data: [[]]
      }
      const content = await requestCpuInfo(id, from.getTime(), to.getTime())
      content.forEach((info) => {
        tempData.labels.push(info.time)
        tempData.data[0].push(info.used_percent / 100)
      })
      setCpuData(tempData)
    })()
  }, [from, to])

  React.useEffect(() => {
    (async () => {
      const id = new URLSearchParams(window.location.search).get('id')
      if (!id) window.location.href = '/agents'

      const tempData = {
        labels: [],
        data: [[]]
      }
      const content = await requestMemInfo(id, from.getTime(), to.getTime())
      content.forEach((info) => {
        tempData.labels.push(info.time)
        tempData.data[0].push(info.ram_used_percent / 100)
      })
      setMemData(tempData)
    })()
  }, [from, to])

  React.useEffect(() => {
    (async () => {
      const id = new URLSearchParams(window.location.search).get('id')
      if (!id) window.location.href = '/agents'

      const tempData = {
        labels: [],
        data: [[], [], []]
      }
      const content = await requestLoadInfo(id, from.getTime(), to.getTime())
      content.forEach((info) => {
        tempData.labels.push(info.time)
        tempData.data[0].push(info.avg1 / 100)
        tempData.data[1].push(info.avg5 / 100)
        tempData.data[2].push(info.avg15 / 100)
      })
      setLoadData(tempData)
    })()
  }, [from, to])

  React.useEffect(() => {
    (async () => {
      const id = new URLSearchParams(window.location.search).get('id')
      if (!id) window.location.href = '/agents'

      const tempRateData = {
        labels: [],
        data: [[], []]
      }
      const tempPacketsData = {
        labels: [],
        data: [[], []]
      }
      const content = await requestNetInfo(id, from.getTime(), to.getTime())
      content.forEach((info) => {
        tempRateData.labels.push(info.time)
        tempPacketsData.labels.push(info.time)
        tempRateData.data[0].push(info.receive_rate)
        tempRateData.data[1].push(info.transmit_rate)
        tempPacketsData.data[0].push(info.receive_packets)
        tempPacketsData.data[1].push(info.transmit_packets)
      })
      setNetRateData(tempRateData)
      setNetPacketsData(tempPacketsData)
    })()
  }, [from, to])

  React.useEffect(() => {
    (async () => {
      const id = new URLSearchParams(window.location.search).get('id')
      if (!id) window.location.href = '/agents'

      const tempRateData = {
        labels: [],
        data: [[], []]
      }
      const tempReqData = {
        labels: [],
        data: [[], []]
      }
      const content = await requestDiskInfo(id, from.getTime(), to.getTime())
      content.forEach((info) => {
        tempRateData.labels.push(info.time)
        tempReqData.labels.push(info.time)
        tempRateData.data[0].push(info.read_rate)
        tempRateData.data[1].push(info.write_rate)
        tempReqData.data[0].push(info.read_req)
        tempReqData.data[1].push(info.write_req)
      })
      setDiskRateData(tempRateData)
      setDiskReqData(tempReqData)
    })()
  }, [from, to])

  React.useEffect(() => {
    (async () => {
      const id = new URLSearchParams(window.location.search).get('id')
      if (!id) window.location.href = '/agents'

      const content = await requestMountsInfo(id)
      setMountsData(content)
    })()
  }, [])

  React.useEffect(() => {
    (async () => {
      const id = new URLSearchParams(window.location.search).get('id')
      if (!id) window.location.href = '/agents'

      const content = await requestSshdInfo(id, from.getTime(), to.getTime())
      setSshdData(content)
    })()
  }, [from, to])

  React.useEffect(() => {
    (async () => {
      const id = new URLSearchParams(window.location.search).get('id')
      if (!id) window.location.href = '/agents'

      const content = await requestFileMDInfo(id, from.getTime(), to.getTime())
      setFileMDData(content)
    })()
  }, [from, to])

  return (
    <Navigation title='主机信息'>
      <TableContainer component={Paper}>
        {agentInfo &&
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.actionCell} colSpan={3} align='right'>
                  {agentInfo.status === 'error' && (
                    <Button
                      variant='outlined'
                      color='primary'
                      startIcon={<Autorenew />}
                      onClick={handleFixClick}
                      className={classes.actionButton}
                    >
                      已修复
                    </Button>
                  )}
                  {agentInfo.deleted ? (
                    <Button
                      variant='outlined'
                      color='primary'
                      startIcon={<RestoreFromTrash />}
                      onClick={handleRecoverClick}
                      className={classes.actionButton}
                    >
                      恢复
                    </Button>
                  ) : (
                    <Button
                      variant='outlined'
                      color='primary'
                      startIcon={<Delete />}
                      onClick={handleDeleteClick}
                      className={classes.actionButton}
                    >
                      删除
                    </Button>)}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography variant='inherit' color='textSecondary'>主机名：</Typography>
                  {agentInfo.hostname}
                </TableCell>
                <TableCell className={classes.tableBorder}>
                  <Typography variant='inherit' color='textSecondary'>主机编号：</Typography>
                  {agentInfo.id}
                </TableCell>
                <TableCell className={classes.tableBorder}>
                  <Typography variant='inherit' color='textSecondary'>IP地址：</Typography>
                  {agentInfo.ip}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant='inherit' color='textSecondary'>操作系统：</Typography>
                  {agentInfo.distro} <DistroLogo className={classes.distroLogo} distro={agentInfo.distro} />
                </TableCell>
                <TableCell className={classes.tableBorder}>
                  <Typography variant='inherit' color='textSecondary'>内核版本：</Typography>
                  {agentInfo.kernel}
                </TableCell>
                <TableCell className={classes.tableBorder}>
                  <Typography variant='inherit' color='textSecondary'>主机状态：</Typography>
                  <StatusIcon status={agentInfo.status || 'unknown'} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography variant='inherit' color='textSecondary'>CPU型号：</Typography>
                  {agentInfo.cpu_model}
                </TableCell>
                <TableCell className={classes.tableBorder}>
                  <Typography variant='inherit' color='textSecondary'>CPU核心数：</Typography>
                  {agentInfo.cpu_cores}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>}
      </TableContainer>
      <Grid container spacing={2} className={classes.chartContainer}>
        <Grid item sm={12} md={12} lg={12}>
          <Paper>
            <ButtonGroup color='primary' className={classes.buttonGroup}>
              <Button size='small' disabled={interval === 3600000} onClick={() => handleButtonGroupClick(3600000)}>1小时</Button>
              <Button size='small' disabled={interval === 21600000} onClick={() => handleButtonGroupClick(21600000)}>6小时</Button>
              <Button size='small' disabled={interval === 43200000} onClick={() => handleButtonGroupClick(43200000)}>12小时</Button>
              <Button size='small' disabled={interval === 86400000} onClick={() => handleButtonGroupClick(86400000)}>1天</Button>
              <Button size='small' disabled={interval === 259200000} onClick={() => handleButtonGroupClick(259200000)}>3天</Button>
              <Button size='small' disabled={interval === 604800000} onClick={() => handleButtonGroupClick(604800000)}>7天</Button>
              <Button size='small' disabled={interval === 1209600000} onClick={() => handleButtonGroupClick(1209600000)}>14天</Button>
            </ButtonGroup>
            <Typography component='span'>自定义：</Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                format='yyyy-MM-dd HH:mm'
                value={from}
                onChange={(v) => { setInterval(0); setFrom(v) }}
                className={classes.timePicker}
                ampm={false}
                showTodayButton
                disableFuture
              />
              <Typography component='span'>到</Typography>
              <DateTimePicker
                format='yyyy-MM-dd HH:mm'
                value={to}
                onChange={(v) => { setInterval(0); setTo(v) }}
                className={classes.timePicker}
                ampm={false}
                showTodayButton
                disableFuture
              />
            </MuiPickersUtilsProvider>
          </Paper>
        </Grid>
        <Grid item sm={12} md={6} lg={4}>
          <Paper><CpuChart data={cpuData} /></Paper>
        </Grid>
        <Grid item sm={12} md={6} lg={4}>
          <Paper><MemChart data={memData} /></Paper>
        </Grid>
        <Grid item sm={12} md={6} lg={4}>
          <Paper><LoadChart data={loadData} /></Paper>
        </Grid>
        <Grid item sm={12} md={6} lg={4}>
          <Paper><NetRateChart data={netRateData} /></Paper>
        </Grid>
        <Grid item sm={12} md={6} lg={4}>
          <Paper><NetPacketsChart data={netPacketsData} /></Paper>
        </Grid>
        <Grid item sm={12} md={6} lg={4}>
          <Paper><DiskRateChart data={diskRateData} /></Paper>
        </Grid>
        <Grid item sm={12} md={6} lg={4}>
          <Paper><DiskReqChart data={diskReqData} /></Paper>
        </Grid>
        <Grid item sm={12} md={12} lg={12}>
          <TableContainer component={Paper}>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>设备名</TableCell>
                  <TableCell>挂载点</TableCell>
                  <TableCell>文件系统</TableCell>
                  <TableCell>总大小</TableCell>
                  <TableCell>已用大小</TableCell>
                  <TableCell>已用inode</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  mountsData.map((mount) => (
                    <TableRow key={mount.dev_name}>
                      <TableCell>{mount.dev_name}</TableCell>
                      <TableCell>{mount.mount_point}</TableCell>
                      <TableCell>{mount.fs_type}</TableCell>
                      <TableCell>{calcFromKB(mount.total_size)}</TableCell>
                      <TableCell>{`${calcFromKB(mount.total_size - mount.avail_size)} (${mount.used_size_percent / 100}%)`}</TableCell>
                      <TableCell>{`${mount.used_nodes_percent / 100}%`}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item sm={12} md={12} lg={12}>
          <TableContainer component={Paper}>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>用户名</TableCell>
                  <TableCell>登录IP</TableCell>
                  <TableCell>认证方式</TableCell>
                  <TableCell>登录时间</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  sshdData.map((sshd) => (
                    <TableRow key={sshd.username + sshd.time}>
                      <TableCell>{sshd.username}</TableCell>
                      <TableCell>{sshd.remote_host}</TableCell>
                      <TableCell>
                        {sshd.auth_method === 'password' ? (
                          'password'
                        ) : (
                          <Link
                            component='button'
                            variant='body2'
                            onClick={() => showDialog(sshd.auth_method)}
                          >
                            {textBeforeSpace(sshd.auth_method)}
                          </Link>)}
                      </TableCell>
                      <TableCell>{formatDate(sshd.time)}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item sm={12} md={12} lg={12}>
          <TableContainer component={Paper}>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>文件路径</TableCell>
                  <TableCell>操作类型</TableCell>
                  <TableCell>操作时间</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  fileMDData.map((fileMD) => (
                    <TableRow key={fileMD.path + fileMD.time}>
                      <TableCell>{fileMD.path}</TableCell>
                      <TableCell><FIleMDEvent event={fileMD.event} /></TableCell>
                      <TableCell>{formatDate(fileMD.time)}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Dialog onClose={() => setDialogOpen(false)} open={dialogOpen}>
        <DialogTitle>详细信息</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.dialogContent}>
            {dialogContent}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Navigation>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

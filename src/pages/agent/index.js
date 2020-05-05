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
  Button
} from '@material-ui/core'
import { RestoreFromTrash, Delete } from '@material-ui/icons'
import Navigation from '../../components/navigation'
import DistroLogo from '../../components/distrologo'
import StatusIcon from '../../components/statusicon'
import {
  requestDeleteAgent,
  requestRecoverAgent,
  requestAgentInfo
} from '../../api'

const useStyles = makeStyles((theme) => ({
  tableBorder: {
    borderLeftWidth: '1px',
    borderLeftStyle: 'solid',
    borderLeftColor: theme.palette.divider
  },
  actionCell: {
    padding: theme.spacing(1)
  },
  distroLogo: {
    verticalAlign: 'middle',
    display: 'inline-block',
    width: 24,
    height: 24
  }
}))

function App () {
  const classes = useStyles()

  const [agentInfo, setAgentInfo] = React.useState()

  const handleDeleteClick = async () => {
    await requestDeleteAgent(agentInfo.id) // async
    setAgentInfo({ ...agentInfo, deleted: true })
  }

  const handleRecoverClick = async () => {
    await requestRecoverAgent(agentInfo.id) // async
    setAgentInfo({ ...agentInfo, deleted: false })
  }

  React.useEffect(() => {
    (async () => {
      const id = new URLSearchParams(window.location.search).get('id')
      if (!id) window.location.href = '/agents'

      const content = await requestAgentInfo(id)
      setAgentInfo(content)
    })()
  }, [])

  return (
    <Navigation title='主机信息'>
      <TableContainer component={Paper}>
        {agentInfo &&
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.actionCell} colSpan={3} align='right'>
                  {agentInfo.deleted ? (
                    <Button
                      variant='outlined'
                      color='primary'
                      startIcon={<RestoreFromTrash />}
                      onClick={handleRecoverClick}
                    >
                      恢复
                    </Button>
                  ) : (
                    <Button
                      variant='outlined'
                      color='primary'
                      startIcon={<Delete />}
                      onClick={handleDeleteClick}
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
                  {agentInfo.status || 'unknown'} <StatusIcon status={agentInfo.status || 'unknown'} />
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

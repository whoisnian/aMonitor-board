import React from 'react'
import ReactDOM from 'react-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  CssBaseline,
  Paper,
  Tooltip,
  IconButton,
  Popper,
  Grow,
  MenuList,
  MenuItem,
  ClickAwayListener,
  FormControlLabel,
  Switch,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TablePagination
} from '@material-ui/core'
import { MoreHoriz } from '@material-ui/icons'
import Navigation from '../../components/navigation'
import DistroLogo from '../../components/distrologo'
import StatusIcon from '../../components/statusicon'
import {
  requestAllAgents,
  requestDeletedAgents,
  requestDeleteAgent,
  requestRecoverAgent
} from '../../api'

const useStyles = makeStyles((theme) => ({
  colID: {
    width: '64px',
    textAlign: 'center'
  },
  colDistro: {
    width: '96px',
    textAlign: 'center'
  },
  colHostname: {
    textAlign: 'left'
  },
  colIP: {
    width: '128px',
    textAlign: 'left'
  },
  colStatus: {
    width: '64px',
    textAlign: 'center'
  },
  colAction: {
    width: '64px',
    textAlign: 'center'
  },
  cellSwitch: {
    paddingTop: 0,
    paddingBottom: 0,
    color: theme.palette.text.primary
  },
  logoButton: {
    padding: 0
  },
  distroLogo: {
    verticalAlign: 'middle'
  }
}))

function App () {
  const classes = useStyles()

  const [deleted, setDeleted] = React.useState(false)
  const [agentList, setAgentList] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleMenuClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleDetailsClick = () => {
    window.location.href = '/agent?id=' + anchorEl.id
    setAnchorEl(null)
  }

  const handleChange = async () => {
    setDeleted(!deleted)

    const content = await (deleted ? requestAllAgents() : requestDeletedAgents())
    setAgentList(content)
  }

  const handleDeleteClick = () => {
    requestDeleteAgent(anchorEl.id) // async

    const id = parseInt(anchorEl.id)
    const pos = agentList.findIndex((v) => v.id === id)
    agentList.splice(pos, 1)

    setAgentList(agentList)
    setAnchorEl(null)
  }

  const handleRecoverClick = () => {
    requestRecoverAgent(anchorEl.id) // async

    const id = parseInt(anchorEl.id)
    const pos = agentList.findIndex((v) => v.id === id)
    agentList.splice(pos, 1)

    setAgentList(agentList)
    setAnchorEl(null)
  }

  React.useEffect(() => {
    (async () => {
      const content = await requestAllAgents()
      setAgentList(content)
    })()
  }, [])

  return (
    <Navigation title={deleted ? '主机列表（回收站）' : '主机列表'}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.colID}>编号</TableCell>
              <TableCell className={classes.colDistro}>发行版</TableCell>
              <TableCell className={classes.colHostname}>主机名</TableCell>
              <TableCell className={classes.colIP}>IP地址</TableCell>
              <TableCell className={classes.colStatus}>状态</TableCell>
              <TableCell className={classes.colAction}>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? agentList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : agentList
            ).map((agent) => (
              <TableRow hover key={agent.id}>
                <TableCell className={classes.colID}>{agent.id}</TableCell>
                <TableCell className={classes.colDistro}>
                  <Tooltip title={agent.distro} placement='top' arrow>
                    <span>
                      <IconButton className={classes.logoButton} disabled>
                        <DistroLogo className={classes.distroLogo} distro={agent.distro} />
                      </IconButton>
                    </span>
                  </Tooltip>
                </TableCell>
                <TableCell className={classes.colHostname}>{agent.hostname}</TableCell>
                <TableCell className={classes.colIP}>{agent.ip}</TableCell>
                <TableCell className={classes.colStatus}><StatusIcon status={agent.status || 'unknown'} /></TableCell>
                <TableCell className={classes.colAction}>
                  <IconButton id={agent.id} size='small' disableRipple disableFocusRipple onClick={handleMenuClick}>
                    <MoreHoriz />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                  <Paper>
                    <ClickAwayListener onClickAway={handleMenuClose}>
                      <MenuList autoFocusItem={Boolean(anchorEl)} onKeyDown={handleMenuClose}>
                        <MenuItem onClick={handleDetailsClick}>查看详情</MenuItem>
                        {deleted
                          ? <MenuItem onClick={handleRecoverClick}>立即恢复</MenuItem>
                          : <MenuItem onClick={handleDeleteClick}>立即删除</MenuItem>}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2} className={classes.cellSwitch}>
                <FormControlLabel
                  control={<Switch checked={deleted} onChange={handleChange} color='primary' name='deleted' />}
                  label='回收站'
                />
              </TableCell>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
                colSpan={4}
                count={agentList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                labelRowsPerPage='每页行数:'
                backIconButtonText='上一页'
                nextIconButtonText='下一页'
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
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

import React from 'react'
import ReactDOM from 'react-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  CssBaseline,
  Paper,
  IconButton,
  Popper,
  Grow,
  MenuList,
  MenuItem,
  ClickAwayListener,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TablePagination,
  Fab,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tooltip,
  ListItem
} from '@material-ui/core'
import { MoreHoriz, Add } from '@material-ui/icons'
import Navigation from '../../components/navigation'
import DistroLogo from '../../components/distrologo'
import StatusIcon from '../../components/statusicon'
import {
  requestAllAgents,
  requestGroupAgents,
  requestAddAgentToGroup,
  requestDeleteGroupAgent
} from '../../api'

const useStyles = makeStyles((theme) => ({
  colID: {
    width: '64px',
    textAlign: 'center'
  },
  colType: {
    width: '128px',
    textAlign: 'center'
  },
  colName: {
    textAlign: 'left'
  },
  colAddr: {
    textAlign: 'left'
  },
  textAddr: {
    display: 'inline-block',
    maxWidth: '300px',
    overflow: 'hidden'
  },
  colToken: {
    textAlign: 'left'
  },
  colTime: {
    width: '192px',
    textAlign: 'left'
  },
  colAction: {
    width: '64px',
    textAlign: 'center'
  },
  fab: {
    position: 'fixed',
    top: 'auto',
    left: 'auto',
    right: '30px',
    bottom: '30px'
  }
}))

function App () {
  const classes = useStyles()

  const [agentList, setAgentList] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [otherAgents, setOtherAgents] = React.useState([])

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

  const handleDeleteClick = () => {
    const groupID = new URLSearchParams(window.location.search).get('id')
    if (!groupID) window.location.href = '/groups'

    requestDeleteGroupAgent(groupID, anchorEl.id) // async

    const id = parseInt(anchorEl.id)
    const pos = agentList.findIndex((v) => v.id === id)
    agentList.splice(pos, 1)

    setAgentList(agentList)
    setAnchorEl(null)
  }

  const handleAddClick = async () => {
    const have = agentList.map(v => v.id)
    const all = await requestAllAgents()
    const nonexist = all.filter(v => !have.includes(v.id))
    setOtherAgents(nonexist)
    setDialogOpen(true)
  }

  const handleAddToGroup = async (agentID) => {
    const groupID = new URLSearchParams(window.location.search).get('id')
    if (!groupID) window.location.href = '/groups'

    await requestAddAgentToGroup(parseInt(groupID), agentID)

    const content = await requestGroupAgents(groupID)
    setAgentList(content)
    setDialogOpen(false)
  }

  const handleDialogClose = async () => {
    setDialogOpen(false)
  }

  React.useEffect(() => {
    (async () => {
      const id = new URLSearchParams(window.location.search).get('id')
      if (!id) window.location.href = '/groups'

      const content = await requestGroupAgents(id)
      setAgentList(content)
    })()
  }, [])

  return (
    <Navigation title='规则组主机管理'>
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
                        <MenuItem onClick={handleDeleteClick}>立即删除</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
                colSpan={6}
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
      <Fab
        color='primary'
        className={classes.fab}
        onClick={handleAddClick}
      >
        <Add />
      </Fab>
      <Dialog open={dialogOpen} scroll='paper' onClose={handleDialogClose}>
        <DialogTitle>添加主机</DialogTitle>
        <DialogContent>
          {otherAgents.map((agent) => (
            <ListItem key={agent.id} button onClick={() => handleAddToGroup(agent.id)}>
              <Typography color='textPrimary' noWrap>
                {agent.id}. {agent.hostname} ({agent.distro})
                <Typography color='textSecondary' noWrap>{agent.ip}</Typography>
              </Typography>
            </ListItem>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color='primary'>
            结束
          </Button>
        </DialogActions>
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

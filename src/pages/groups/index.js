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
  Fab
} from '@material-ui/core'
import { MoreHoriz, Add } from '@material-ui/icons'
import Navigation from '../../components/navigation'
import GroupDialog from '../../components/groupdialog'
import {
  requestAllGroups,
  requestDeleteGroup
} from '../../api'
import { formatDate } from '../../utils'

const useStyles = makeStyles((theme) => ({
  colID: {
    width: '64px',
    textAlign: 'center'
  },
  colName: {
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
  cellSwitch: {
    paddingTop: 0,
    paddingBottom: 0,
    color: theme.palette.text.primary
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

  const [ruleGroupList, setRuleGroupList] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [dialogOpen, setDialogOpen] = React.useState(false)

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
    window.location.href = '/group?id=' + anchorEl.id
    setAnchorEl(null)
  }

  const handleAgentsClick = () => {
    window.location.href = '/groupagents?id=' + anchorEl.id
    setAnchorEl(null)
  }

  const handleReceiversClick = () => {
    window.location.href = '/groupreceivers?id=' + anchorEl.id
    setAnchorEl(null)
  }

  const handleDeleteClick = () => {
    requestDeleteGroup(anchorEl.id) // async

    const id = parseInt(anchorEl.id)
    const pos = ruleGroupList.findIndex((v) => v.id === id)
    ruleGroupList.splice(pos, 1)

    setRuleGroupList(ruleGroupList)
    setAnchorEl(null)
  }

  const handleReload = async () => {
    const content = await requestAllGroups()
    setRuleGroupList(content)
  }

  React.useEffect(() => {
    (async () => {
      const content = await requestAllGroups()
      setRuleGroupList(content)
    })()
  }, [])

  return (
    <Navigation title='规则组管理'>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.colID}>编号</TableCell>
              <TableCell className={classes.colName}>规则组名称</TableCell>
              <TableCell className={classes.colTime}>创建时间</TableCell>
              <TableCell className={classes.colAction}>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? ruleGroupList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : ruleGroupList
            ).map((ruleGroup) => (
              <TableRow hover key={ruleGroup.id}>
                <TableCell className={classes.colID}>{ruleGroup.id}</TableCell>
                <TableCell className={classes.colName}>{ruleGroup.name}</TableCell>
                <TableCell className={classes.colTime}>{formatDate(ruleGroup.created_at)}</TableCell>
                <TableCell className={classes.colAction}>
                  <IconButton id={ruleGroup.id} size='small' disableRipple disableFocusRipple onClick={handleMenuClick}>
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
                        <MenuItem onClick={handleAgentsClick}>管理主机</MenuItem>
                        <MenuItem onClick={handleReceiversClick}>管理推送</MenuItem>
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
                colSpan={4}
                count={ruleGroupList.length}
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
        onClick={() => setDialogOpen(true)}
      >
        <Add />
      </Fab>
      <GroupDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        reload={handleReload}
      />
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

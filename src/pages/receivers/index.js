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
  Typography
} from '@material-ui/core'
import { MoreHoriz, Add } from '@material-ui/icons'
import Navigation from '../../components/navigation'
import ReceiverDialog from '../../components/receiverdialog'
import {
  requestAllReceivers,
  requestDeleteReceiver
} from '../../api'
import { formatDate } from '../../utils'

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

  const [receiverList, setReceiverList] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [editorOpen, setEditorOpen] = React.useState(false)
  const [editingReceiver, setEditingReceiver] = React.useState()

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

  const handleEditClick = () => {
    const id = parseInt(anchorEl.id)
    const pos = receiverList.findIndex((v) => v.id === id)

    setEditingReceiver(receiverList[pos])

    setEditorOpen(true)
    setAnchorEl(null)
  }

  const handleDeleteClick = () => {
    requestDeleteReceiver(anchorEl.id) // async

    const id = parseInt(anchorEl.id)
    const pos = receiverList.findIndex((v) => v.id === id)
    receiverList.splice(pos, 1)

    setReceiverList(receiverList)
    setAnchorEl(null)
  }

  const handleReload = async () => {
    const content = await requestAllReceivers()
    setReceiverList(content)
  }

  React.useEffect(() => {
    (async () => {
      const content = await requestAllReceivers()
      setReceiverList(content)
    })()
  }, [])

  return (
    <Navigation title='推送管理'>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.colID}>编号</TableCell>
              <TableCell className={classes.colType}>推送类型</TableCell>
              <TableCell className={classes.colName}>推送名称</TableCell>
              <TableCell className={classes.colAddr}>推送地址</TableCell>
              <TableCell className={classes.colToken}>身份凭据</TableCell>
              <TableCell className={classes.colTime}>创建时间</TableCell>
              <TableCell className={classes.colAction}>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? receiverList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : receiverList
            ).map((receiver) => (
              <TableRow hover key={receiver.id}>
                <TableCell className={classes.colID}>{receiver.id}</TableCell>
                <TableCell className={classes.colType}>{receiver.type}</TableCell>
                <TableCell className={classes.colName}>{receiver.name}</TableCell>
                <TableCell className={classes.colAddr}><Typography noWrap className={classes.textAddr}>{receiver.addr}</Typography></TableCell>
                <TableCell className={classes.colToken}>{receiver.token || '无'}</TableCell>
                <TableCell className={classes.colTime}>{formatDate(receiver.created_at)}</TableCell>
                <TableCell className={classes.colAction}>
                  <IconButton id={receiver.id} size='small' disableRipple disableFocusRipple onClick={handleMenuClick}>
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
                        <MenuItem onClick={handleEditClick}>编辑推送</MenuItem>
                        <MenuItem onClick={handleDeleteClick}>立即删除</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
            <ReceiverDialog
              open={editorOpen}
              receiver={editingReceiver}
              onClose={() => setEditorOpen(false)}
              reload={handleReload}
            />
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
                colSpan={7}
                count={receiverList.length}
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
      <ReceiverDialog
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

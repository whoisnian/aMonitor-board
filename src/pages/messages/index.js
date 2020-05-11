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
  TablePagination
} from '@material-ui/core'
import { MoreHoriz } from '@material-ui/icons'
import Navigation from '../../components/navigation'
import {
  requestAllMessages,
  requestDeleteMessage
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
  }
}))

function App () {
  const classes = useStyles()

  const [messageList, setMessageList] = React.useState([])
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

  const handleEditClick = () => {
    setAnchorEl(null)
  }

  const handleDeleteClick = () => {
    requestDeleteMessage(anchorEl.id) // async

    const id = parseInt(anchorEl.id)
    const pos = messageList.findIndex((v) => v.id === id)
    messageList.splice(pos, 1)

    setMessageList(messageList)
    setAnchorEl(null)
  }

  React.useEffect(() => {
    (async () => {
      const content = await requestAllMessages()
      setMessageList(content)
    })()
  }, [])

  return (
    <Navigation title='警报历史'>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.colID}>编号</TableCell>
              <TableCell className={classes.colName}>警报内容</TableCell>
              <TableCell className={classes.colName}>警报等级</TableCell>
              <TableCell className={classes.colName}>相关主机</TableCell>
              <TableCell className={classes.colName}>相关规则组</TableCell>
              <TableCell className={classes.colTime}>创建时间</TableCell>
              <TableCell className={classes.colAction}>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? messageList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : messageList
            ).map((message) => (
              <TableRow hover key={message.id}>
                <TableCell className={classes.colID}>{message.id}</TableCell>
                <TableCell className={classes.colName}>{message.content}</TableCell>
                <TableCell className={classes.colName}>{message.level}</TableCell>
                <TableCell className={classes.colName}>{message.agent_id}</TableCell>
                <TableCell className={classes.colName}>{message.group_id}</TableCell>
                <TableCell className={classes.colTime}>{formatDate(message.created_at)}</TableCell>
                <TableCell className={classes.colAction}>
                  <IconButton id={message.id} size='small' disableRipple disableFocusRipple onClick={handleMenuClick}>
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
                        <MenuItem onClick={handleEditClick}>编辑</MenuItem>
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
                count={messageList.length}
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

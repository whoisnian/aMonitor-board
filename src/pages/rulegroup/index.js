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
  requestRuleGroup,
  requestDeleteRule
} from '../../api'

const useStyles = makeStyles((theme) => ({
  colID: {
    width: '64px',
    textAlign: 'center'
  },
  colName: {
    textAlign: 'left'
  },
  colTime: {
    width: '128px',
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

  const [rules, setRules] = React.useState([])
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

  const handleDeleteClick = () => {
    requestDeleteRule(anchorEl.id) // async

    const id = parseInt(anchorEl.id)
    const pos = rules.findIndex((v) => v.id === id)
    rules.splice(pos, 1)

    setRules(rules)
    setAnchorEl(null)
  }

  React.useEffect(() => {
    (async () => {
      const id = new URLSearchParams(window.location.search).get('id')
      if (!id) window.location.href = '/rules'

      const content = await requestRuleGroup(id)
      setRules(content)
    })()
  }, [])

  return (
    <Navigation title='规则管理'>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.colID}>编号</TableCell>
              <TableCell className={classes.colName}>规则名称</TableCell>
              <TableCell className={classes.colTime}>生效目标</TableCell>
              <TableCell className={classes.colTime}>触发条件</TableCell>
              <TableCell className={classes.colTime}>触发事件</TableCell>
              <TableCell className={classes.colTime}>阈值</TableCell>
              <TableCell className={classes.colTime}>计算范围</TableCell>
              <TableCell className={classes.colTime}>静默时间</TableCell>
              <TableCell className={classes.colTime}>等级</TableCell>
              <TableCell className={classes.colAction}>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rules.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rules
            ).map((rule) => (
              <TableRow hover key={rule.id}>
                <TableCell className={classes.colID}>{rule.id}</TableCell>
                <TableCell className={classes.colName}>{rule.name}</TableCell>
                <TableCell className={classes.colTime}>{rule.target}</TableCell>
                <TableCell className={classes.colTime}>{rule.addition}</TableCell>
                <TableCell className={classes.colTime}>{rule.event}</TableCell>
                <TableCell className={classes.colTime}>{rule.threshold}</TableCell>
                <TableCell className={classes.colTime}>{rule.interval}</TableCell>
                <TableCell className={classes.colTime}>{rule.silent}</TableCell>
                <TableCell className={classes.colTime}>{rule.level}</TableCell>
                <TableCell className={classes.colAction}>
                  <IconButton id={rule.id} size='small' disableRipple disableFocusRipple onClick={handleMenuClick}>
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
                colSpan={10}
                count={rules.length}
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

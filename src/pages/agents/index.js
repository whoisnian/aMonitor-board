import React from 'react'
import ReactDOM from 'react-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  CssBaseline,
  Paper,
  Tooltip,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TablePagination
} from '@material-ui/core'
import { Search } from '@material-ui/icons'
import Navigation from '../../components/navigation'
import DistroLogo from '../../components/distrologo'
import StatusIcon from '../../components/statusicon'

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
  colStatus: {
    width: '64px',
    textAlign: 'center'
  },
  colAction: {
    width: '64px',
    textAlign: 'center'
  },
  logoButton: {
    padding: 0
  },
  distroLogo: {
    verticalAlign: 'middle'
  }
}))

function createData (id, hostname, distro, status) {
  return { id, hostname, distro, status }
}

const rows = [
  createData(1, 'host001', 'Alpine Linux v3.4', 'ok'),
  createData(2, 'host002', 'Arch Linux', 'ok'),
  createData(3, 'host003', 'CentOS Linux 8 (Core)', 'off'),
  createData(4, 'host004', 'Debian GNU/Linux 9 (stretch)', 'error'),
  createData(5, 'host005', 'Deepin 15.11', 'ok'),
  createData(6, 'host006', 'Fedora 30 (Workstation Edition)', 'error'),
  createData(7, 'host007 with long name', 'FreeBSD 13.0-CURRENT', 'ok'),
  createData(8, 'host008 with long name', 'Gentoo/Linux', 'ok'),
  createData(9, 'host009', 'Manjaro Linux', 'error'),
  createData(10, 'host010 long', 'openSUSE Leap 42.1 (x86_64)', 'off'),
  createData(11, 'host011 long', 'bionicpup64 8.0', 'ok'),
  createData(12, 'host012', 'Raspbian GNU/Linux', 'ok'),
  createData(13, 'host013', 'Red Hat Enterprise Linux Server 7.5 (Maipo)', 'error'),
  createData(14, 'host014', 'Ubuntu 18.04.4 LTS', 'error'),
  createData(15, 'host015', 'Other Linux (64 bit)', 'ok')
]

function App () {
  const classes = useStyles()

  const [agentList, setAgentList] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  React.useEffect(() => {
    setAgentList(rows)
  }, [])

  return (
    <Navigation title='主机列表'>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.colID}>编号</TableCell>
              <TableCell className={classes.colDistro}>发行版</TableCell>
              <TableCell className={classes.colHostname}>主机名</TableCell>
              <TableCell className={classes.colStatus}>状态</TableCell>
              <TableCell className={classes.colAction}>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? agentList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : agentList
            ).map((agent) => (
              <TableRow key={agent.id}>
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
                <TableCell className={classes.colStatus}><StatusIcon status={agent.status} /></TableCell>
                <TableCell className={classes.colAction}>
                  <IconButton size='small' disableRipple disableFocusRipple>
                    <Search />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
                colSpan={5}
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

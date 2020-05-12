import React from 'react'
import ReactDOM from 'react-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  CssBaseline,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  ListItem
} from '@material-ui/core'
import Navigation from '../../components/navigation'
import { requestOverviewInfo } from '../../api'
import { agentListFromLS, groupListFromLS } from '../../utils'

const useStyles = makeStyles((theme) => ({
  messageCard: {
    backgroundColor: theme.palette.info.light
  },
  alarmCard: {
    backgroundColor: theme.palette.error.light
  },
  okCard: {
    backgroundColor: theme.palette.success.light
  }
}))

function App () {
  const classes = useStyles()

  const [info, setInfo] = React.useState(null)
  const [recentAgents, setRecentAgents] = React.useState([])
  const [recentGroups, setRecentGroups] = React.useState([])

  const handleAgentClick = (id) => {
    window.location.href = '/agent?id=' + id
  }

  const handleGroupClick = (id) => {
    window.location.href = '/group?id=' + id
  }

  React.useEffect(() => {
    (async () => {
      const content = await requestOverviewInfo()
      setInfo(content)
    })()
    setRecentAgents(agentListFromLS)
    setRecentGroups(groupListFromLS)
  }, [])

  return (
    <Navigation title='概览'>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={4} lg={3}>
          <Card className={classes.messageCard}>
            <CardHeader title='近7日警报' />
            <CardContent>
              <Typography variant='h5'>
                {info ? info.messagesCount : 'loading'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={3}>
          <Card className={classes.alarmCard}>
            <CardHeader title='正在报警' />
            <CardContent>
              <Typography variant='h5'>
                {info ? info.errorAgentsCount : 'loading'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={3}>
          <Card className={classes.okCard}>
            <CardHeader title='运行正常' />
            <CardContent>
              <Typography variant='h5'>
                {info ? info.okAgentsCount : 'loading'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Card>
            <CardHeader title='最近使用主机' />
            <CardContent>
              {recentAgents.map((agent) => (
                <ListItem key={agent.id} button onClick={() => handleAgentClick(agent.id)}>
                  <Typography noWrap>
                    {agent.id}. {agent.hostname} (IP: {agent.ip})
                  </Typography>
                </ListItem>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Card>
            <CardHeader title='最近使用规则组' />
            <CardContent>
              {recentGroups.map((group) => (
                <ListItem key={group.id} button onClick={() => handleGroupClick(group.id)}>
                  <Typography noWrap>
                    {group.id}. {group.name}
                  </Typography>
                </ListItem>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
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

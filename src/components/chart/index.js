import React from 'react'
import Chart from 'chart.js'
import { calcFromBytes } from '../../utils'

// 新增LineWithLine表格类型，在原始折线图基础上增加数据跟踪线
Chart.defaults.LineWithLine = Chart.defaults.line
Chart.controllers.LineWithLine = Chart.controllers.line.extend({
  draw: function (ease) {
    Chart.controllers.line.prototype.draw.call(this, ease)

    if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
      const activePoint = this.chart.tooltip._active[0]
      const ctx = this.chart.ctx
      const x = activePoint.tooltipPosition().x
      const topY = this.chart.chartArea.top
      const bottomY = this.chart.chartArea.bottom

      ctx.save()
      ctx.beginPath()
      ctx.moveTo(x, topY)
      ctx.lineTo(x, bottomY)
      ctx.lineWidth = 2
      ctx.strokeStyle = '#3f51b5'
      ctx.stroke()
      ctx.restore()
    }
  }
})

const CpuChart = (props) => {
  const chartRef = React.useRef()

  const [config, setConfig] = React.useState(null)
  const [chart, setChart] = React.useState(null)

  React.useEffect(() => {
    const canvasCtx = chartRef.current.getContext('2d')
    const initialConfig = {
      type: 'LineWithLine',
      data: {
        labels: props.data.labels,
        datasets: [
          {
            label: 'CPU',
            data: props.data.data[0],
            fill: false,
            backgroundColor: '#ff9800',
            borderColor: '#ff9800',
            pointRadius: 0,
            borderWidth: 2
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'CPU使用率'
        },
        legend: {
          position: 'bottom'
        },
        tooltips: {
          intersect: false,
          axis: 'x',
          callbacks: {
            label: function (tooltipItem, data) {
              return 'CPU: ' + Math.round(tooltipItem.yLabel * 100) / 100 + '%'
            }
          }
        },
        animation: {
          duration: 0
        },
        scales: {
          xAxes: [{
            type: 'time',
            distribution: 'series',
            time: {
              tooltipFormat: 'MM-DD HH:mm:ss',
              minUnit: 'second',
              displayFormats: {
                second: 'HH:mm',
                minute: 'HH:mm',
                hour: 'HH:mm',
                day: 'MM-DD'
              }
            },
            ticks: {
              autoSkip: true,
              autoSkipPadding: 10,
              maxRotation: 0
            }
          }],
          yAxes: [{
            ticks: {
              min: 0,
              max: 100,
              callback: function (value) {
                return value + '%'
              },
              autoSkip: true,
              autoSkipPadding: 10,
              maxRotation: 0
            }
          }]
        }
      }
    }
    setConfig(initialConfig)
    setChart(new Chart(canvasCtx, initialConfig))
  }, [])

  React.useEffect(() => {
    if (config) {
      config.data.labels = props.data.labels
      config.data.datasets[0].data = props.data.data[0]
      chart.update()
    }
  })

  return (<canvas ref={chartRef} />)
}

const MemChart = (props) => {
  const chartRef = React.useRef()

  const [config, setConfig] = React.useState(null)
  const [chart, setChart] = React.useState(null)

  React.useEffect(() => {
    const canvasCtx = chartRef.current.getContext('2d')
    const initialConfig = {
      type: 'LineWithLine',
      data: {
        labels: props.data.labels,
        datasets: [
          {
            label: '内存',
            data: props.data.data[0],
            fill: false,
            backgroundColor: '#ff9800',
            borderColor: '#ff9800',
            pointRadius: 0,
            borderWidth: 2
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: '内存利用率'
        },
        legend: {
          position: 'bottom'
        },
        tooltips: {
          intersect: false,
          axis: 'x',
          callbacks: {
            label: function (tooltipItem, data) {
              return '内存: ' + Math.round(tooltipItem.yLabel * 100) / 100 + '%'
            }
          }
        },
        animation: {
          duration: 0
        },
        scales: {
          xAxes: [{
            type: 'time',
            distribution: 'series',
            time: {
              tooltipFormat: 'MM-DD HH:mm:ss',
              minUnit: 'second',
              displayFormats: {
                second: 'HH:mm',
                minute: 'HH:mm',
                hour: 'HH:mm',
                day: 'MM-DD'
              }
            },
            ticks: {
              autoSkip: true,
              autoSkipPadding: 10,
              maxRotation: 0
            }
          }],
          yAxes: [{
            ticks: {
              min: 0,
              max: 100,
              callback: function (value) {
                return value + '%'
              },
              autoSkip: true,
              autoSkipPadding: 10,
              maxRotation: 0
            }
          }]
        }
      }
    }
    setConfig(initialConfig)
    setChart(new Chart(canvasCtx, initialConfig))
  }, [])

  React.useEffect(() => {
    if (config) {
      config.data.labels = props.data.labels
      config.data.datasets[0].data = props.data.data[0]
      chart.update()
    }
  })

  return (<canvas ref={chartRef} />)
}

const LoadChart = (props) => {
  const chartRef = React.useRef()

  const [config, setConfig] = React.useState(null)
  const [chart, setChart] = React.useState(null)

  React.useEffect(() => {
    const canvasCtx = chartRef.current.getContext('2d')
    const initialConfig = {
      type: 'LineWithLine',
      data: {
        labels: props.data.labels,
        datasets: [
          {
            label: '负载_1min',
            data: props.data.data[0],
            fill: false,
            backgroundColor: '#ff9800',
            borderColor: '#ff9800',
            pointRadius: 0,
            borderWidth: 2
          },
          {
            label: '负载_5min',
            data: props.data.data[1],
            fill: false,
            backgroundColor: '#4caf50',
            borderColor: '#4caf50',
            pointRadius: 0,
            borderWidth: 2
          },
          {
            label: '负载_15min',
            data: props.data.data[2],
            fill: false,
            backgroundColor: '#2196f3',
            borderColor: '#2196f3',
            pointRadius: 0,
            borderWidth: 2
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: '系统平均负载'
        },
        legend: {
          position: 'bottom'
        },
        tooltips: {
          intersect: false,
          axis: 'x'
        },
        animation: {
          duration: 0
        },
        scales: {
          xAxes: [{
            type: 'time',
            distribution: 'series',
            time: {
              tooltipFormat: 'MM-DD HH:mm:ss',
              minUnit: 'second',
              displayFormats: {
                second: 'HH:mm',
                minute: 'HH:mm',
                hour: 'HH:mm',
                day: 'MM-DD'
              }
            },
            ticks: {
              autoSkip: true,
              autoSkipPadding: 10,
              maxRotation: 0
            }
          }],
          yAxes: [{
            ticks: {
              autoSkip: true,
              autoSkipPadding: 10,
              maxRotation: 0
            }
          }]
        }
      }
    }
    setConfig(initialConfig)
    setChart(new Chart(canvasCtx, initialConfig))
  }, [])

  React.useEffect(() => {
    if (config) {
      config.data.labels = props.data.labels
      config.data.datasets[0].data = props.data.data[0]
      config.data.datasets[1].data = props.data.data[1]
      config.data.datasets[2].data = props.data.data[2]
      chart.update()
    }
  })

  return (<canvas ref={chartRef} />)
}

const NetRateChart = (props) => {
  const chartRef = React.useRef()

  const [config, setConfig] = React.useState(null)
  const [chart, setChart] = React.useState(null)

  React.useEffect(() => {
    const canvasCtx = chartRef.current.getContext('2d')
    const initialConfig = {
      type: 'LineWithLine',
      data: {
        labels: props.data.labels,
        datasets: [
          {
            label: '下载速率',
            data: props.data.data[0],
            fill: false,
            backgroundColor: '#ff9800',
            borderColor: '#ff9800',
            pointRadius: 0,
            borderWidth: 2
          },
          {
            label: '上传速率',
            data: props.data.data[1],
            fill: false,
            backgroundColor: '#4caf50',
            borderColor: '#4caf50',
            pointRadius: 0,
            borderWidth: 2
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: '网络传输速率'
        },
        legend: {
          position: 'bottom'
        },
        tooltips: {
          intersect: false,
          axis: 'x',
          callbacks: {
            label: function (tooltipItem, data) {
              let label = data.datasets[tooltipItem.datasetIndex].label
              if (label) {
                label += ': '
              }
              return label + calcFromBytes(tooltipItem.yLabel) + '/s'
            }
          }
        },
        animation: {
          duration: 0
        },
        scales: {
          xAxes: [{
            type: 'time',
            distribution: 'series',
            time: {
              tooltipFormat: 'MM-DD HH:mm:ss',
              minUnit: 'second',
              displayFormats: {
                second: 'HH:mm',
                minute: 'HH:mm',
                hour: 'HH:mm',
                day: 'MM-DD'
              }
            },
            ticks: {
              autoSkip: true,
              autoSkipPadding: 10,
              maxRotation: 0
            }
          }],
          yAxes: [{
            ticks: {
              callback: function (value) {
                return calcFromBytes(value) + '/s'
              },
              autoSkip: true,
              autoSkipPadding: 10,
              maxRotation: 0
            }
          }]
        }
      }
    }
    setConfig(initialConfig)
    setChart(new Chart(canvasCtx, initialConfig))
  }, [])

  React.useEffect(() => {
    if (config) {
      config.data.labels = props.data.labels
      config.data.datasets[0].data = props.data.data[0]
      config.data.datasets[1].data = props.data.data[1]
      chart.update()
    }
  })

  return (<canvas ref={chartRef} />)
}

const NetPacketsChart = (props) => {
  const chartRef = React.useRef()

  const [config, setConfig] = React.useState(null)
  const [chart, setChart] = React.useState(null)

  React.useEffect(() => {
    const canvasCtx = chartRef.current.getContext('2d')
    const initialConfig = {
      type: 'LineWithLine',
      data: {
        labels: props.data.labels,
        datasets: [
          {
            label: '接收数据包',
            data: props.data.data[0],
            fill: false,
            backgroundColor: '#ff9800',
            borderColor: '#ff9800',
            pointRadius: 0,
            borderWidth: 2
          },
          {
            label: '发送数据包',
            data: props.data.data[1],
            fill: false,
            backgroundColor: '#4caf50',
            borderColor: '#4caf50',
            pointRadius: 0,
            borderWidth: 2
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: '网络传输数据包数'
        },
        legend: {
          position: 'bottom'
        },
        tooltips: {
          intersect: false,
          axis: 'x'
        },
        animation: {
          duration: 0
        },
        scales: {
          xAxes: [{
            type: 'time',
            distribution: 'series',
            time: {
              tooltipFormat: 'MM-DD HH:mm:ss',
              minUnit: 'second',
              displayFormats: {
                second: 'HH:mm',
                minute: 'HH:mm',
                hour: 'HH:mm',
                day: 'MM-DD'
              }
            },
            ticks: {
              autoSkip: true,
              autoSkipPadding: 10,
              maxRotation: 0
            }
          }],
          yAxes: [{
            ticks: {
              autoSkip: true,
              autoSkipPadding: 10,
              maxRotation: 0
            }
          }]
        }
      }
    }
    setConfig(initialConfig)
    setChart(new Chart(canvasCtx, initialConfig))
  }, [])

  React.useEffect(() => {
    if (config) {
      config.data.labels = props.data.labels
      config.data.datasets[0].data = props.data.data[0]
      config.data.datasets[1].data = props.data.data[1]
      chart.update()
    }
  })

  return (<canvas ref={chartRef} />)
}

const DiskRateChart = (props) => {
  const chartRef = React.useRef()

  const [config, setConfig] = React.useState(null)
  const [chart, setChart] = React.useState(null)

  React.useEffect(() => {
    const canvasCtx = chartRef.current.getContext('2d')
    const initialConfig = {
      type: 'LineWithLine',
      data: {
        labels: props.data.labels,
        datasets: [
          {
            label: '读取速率',
            data: props.data.data[0],
            fill: false,
            backgroundColor: '#ff9800',
            borderColor: '#ff9800',
            pointRadius: 0,
            borderWidth: 2
          },
          {
            label: '写入速率',
            data: props.data.data[1],
            fill: false,
            backgroundColor: '#4caf50',
            borderColor: '#4caf50',
            pointRadius: 0,
            borderWidth: 2
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: '磁盘读写速率'
        },
        legend: {
          position: 'bottom'
        },
        tooltips: {
          intersect: false,
          axis: 'x',
          callbacks: {
            label: function (tooltipItem, data) {
              let label = data.datasets[tooltipItem.datasetIndex].label
              if (label) {
                label += ': '
              }
              return label + calcFromBytes(tooltipItem.yLabel) + '/s'
            }
          }
        },
        animation: {
          duration: 0
        },
        scales: {
          xAxes: [{
            type: 'time',
            distribution: 'series',
            time: {
              tooltipFormat: 'MM-DD HH:mm:ss',
              minUnit: 'second',
              displayFormats: {
                second: 'HH:mm',
                minute: 'HH:mm',
                hour: 'HH:mm',
                day: 'MM-DD'
              }
            },
            ticks: {
              autoSkip: true,
              autoSkipPadding: 10,
              maxRotation: 0
            }
          }],
          yAxes: [{
            ticks: {
              callback: function (value) {
                return calcFromBytes(value) + '/s'
              },
              autoSkip: true,
              autoSkipPadding: 10,
              maxRotation: 0
            }
          }]
        }
      }
    }
    setConfig(initialConfig)
    setChart(new Chart(canvasCtx, initialConfig))
  }, [])

  React.useEffect(() => {
    if (config) {
      config.data.labels = props.data.labels
      config.data.datasets[0].data = props.data.data[0]
      config.data.datasets[1].data = props.data.data[1]
      chart.update()
    }
  })

  return (<canvas ref={chartRef} />)
}

const DiskReqChart = (props) => {
  const chartRef = React.useRef()

  const [config, setConfig] = React.useState(null)
  const [chart, setChart] = React.useState(null)

  React.useEffect(() => {
    const canvasCtx = chartRef.current.getContext('2d')
    const initialConfig = {
      type: 'LineWithLine',
      data: {
        labels: props.data.labels,
        datasets: [
          {
            label: '读取请求数',
            data: props.data.data[0],
            fill: false,
            backgroundColor: '#ff9800',
            borderColor: '#ff9800',
            pointRadius: 0,
            borderWidth: 2
          },
          {
            label: '写入请求数',
            data: props.data.data[1],
            fill: false,
            backgroundColor: '#4caf50',
            borderColor: '#4caf50',
            pointRadius: 0,
            borderWidth: 2
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: '磁盘读写请求数'
        },
        legend: {
          position: 'bottom'
        },
        tooltips: {
          intersect: false,
          axis: 'x'
        },
        animation: {
          duration: 0
        },
        scales: {
          xAxes: [{
            type: 'time',
            distribution: 'series',
            time: {
              tooltipFormat: 'MM-DD HH:mm:ss',
              minUnit: 'second',
              displayFormats: {
                second: 'HH:mm',
                minute: 'HH:mm',
                hour: 'HH:mm',
                day: 'MM-DD'
              }
            },
            ticks: {
              autoSkip: true,
              autoSkipPadding: 10,
              maxRotation: 0
            }
          }],
          yAxes: [{
            ticks: {
              autoSkip: true,
              autoSkipPadding: 10,
              maxRotation: 0
            }
          }]
        }
      }
    }
    setConfig(initialConfig)
    setChart(new Chart(canvasCtx, initialConfig))
  }, [])

  React.useEffect(() => {
    if (config) {
      config.data.labels = props.data.labels
      config.data.datasets[0].data = props.data.data[0]
      config.data.datasets[1].data = props.data.data[1]
      chart.update()
    }
  })

  return (<canvas ref={chartRef} />)
}

export {
  CpuChart,
  MemChart,
  LoadChart,
  NetRateChart,
  NetPacketsChart,
  DiskRateChart,
  DiskReqChart
}

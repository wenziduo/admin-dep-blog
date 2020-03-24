import * as React from 'react';
import * as echarts from 'echarts';
// import equal from './equal';
let timer
export default class LineChart extends React.Component {
  componentDidMount() {
    this.renderChart(this.props);
    this.resize();
    window.addEventListener('resize', this.resize);
    if (this.myChart) {
      this.myChart.on('click', (params) => {
        this.props.onClick(params)
      })
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   if (!equal(this.props, nextProps)) {
  //     this.renderChart(nextProps);
  //   }
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.resize);
  //   if (this.myChart) {
  //     this.myChart.dispose();
  //   }
  // }

  resize = () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      if (this.myChart) {
        this.myChart.resize(this.props.data)
      }
    }, 100);
  };

  renderChart(propsData) {
    const { data, color } = propsData;
    const { xName, yName } = propsData;
    this.myChart = echarts.init(this.chartContainer);
    const option = {
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          return `<div>
          <p>${params[0].name}</p>
          <p><span style="display:inline-block;margin-right:5px;border-radius:10px;
          width:9px;height:9px;background-color:#ff9329"></span>${params[0].value}</p>
        </div>`
        },
      },
      areaStyle: {
        normal: {
          // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(80,141,255,0.39)'
          }, {
            offset: 0.34,
            color: 'rgba(56,155,255,0.25)'
          }, {
            offset: 1,
            color: 'rgba(38,197,254,0.00)'
          }])
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.map((item) => item.date),
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed'
          }
        },
        name: xName
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed'
          }
        },
        name: yName
      },
      series: [{
        data: data.map((item) => item.value),
        type: 'line',
        smooth: true, // 这个是把线变成曲线
        areaStyle: { normal: {
          // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(80,141,255,0.39)'
          }, {
            offset: 0.34,
            color: 'rgba(56,155,255,0.25)'
          }, {
            offset: 1,
            color: 'rgba(38,197,254,0.00)'
          }])
        } },
        itemStyle: {
          normal: {
            color: color || '#1890ff'
          }
        },
        lineStyle: {
          normal: {
            width: 1,
            color: '#32A8FF'
          }
        }
      }],
      grid: {
        top: 15,
        left: 35,
        right: 10,
        bottom: 20,
        x2: 10,
      },
      addDataAnimation: true,
      animationDuration: 3000
    };
    this.myChart.setOption(option, true);
  }

  render() {
    return (
      <div
        style={{ height: this.props.height || '100%', width: this.props.width || '100%' }}
        ref={node => {
          this.chartContainer = node;
        }}
      />
    );
  }
}

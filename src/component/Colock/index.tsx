/**
 * @file 时钟组件
 * @auther caiwenduo
 */
import * as React from 'react';

class Colock extends React.Component {
  private canvasNode;
  componentDidMount() {
    this.handleStart();
  }
  handleStart = () => {
    const canvas = this.canvasNode;
    canvas.width = 250;
    canvas.height = 250;
    const ctx = canvas.getContext('2d');
    function Clock(opt) {
      // for (const key in opt) {
      //   if (key) {
      //     this[key] = opt[key];
      //   }
      // }
      Object.keys(opt).forEach(key => {
        this[key] = opt[key];
      })
      this.line();
    }
    Clock.prototype = {
      line() {
        // ctx.clearRect(0,0,canvas.width,canvas.height);
        const self = this;
        setInterval(() => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          self.bigCircle();
          self.drawTicks();
          self.drwPoints();
          ctx.save();
          ctx.font = '20px 微软雅黑';
          ctx.restore();
        }, 1000);
      },
      // 大圆
      bigCircle() {
        ctx.beginPath();
        ctx.save();
        ctx.lineWidth = this.bigLine;
        ctx.strokeStyle = this.bigColor;
        ctx.arc(this.bigX, this.bigY, this.bigR, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();
      },
      // 刻度
      drawTicks() {
        // 计算每一个刻度的弧度值
        const begScale = -Math.PI / 2; // 从12的位置为起始
        // 计算每一个的弧度线的弧度值
        const singleRadian = (2 * Math.PI) / 60;
        for (let i = 0; i < 60; i++) {
          let length;
          let width;
          if (i % 15 === 0) {
            length = this.tick.bigLeng;
            width = this.tick.bigWidth;
          } else {
            length = this.tick.smallLeng;
            width = this.tick.smallWidth;
          }
          const radian = begScale + singleRadian * i;
          const h1 = (this.bigR - this.bigLine / 2) * Math.sin(radian);
          const b1 = (this.bigR - this.bigLine / 2) * Math.cos(radian);
          // 刻度终点坐标
          const y1 = this.bigY + h1;
          const x1 = this.bigX + b1;
          const h2 = (this.bigR - this.bigLine / 2 - length) * Math.sin(radian);
          const b2 = (this.bigR - this.bigLine / 2 - length) * Math.cos(radian);
          // 起点坐标
          const x2 = this.bigX + b2;
          const y2 = this.bigY + h2;
          ctx.strokeStyle = this.tick.tickColor
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.lineWidth = width;
          ctx.stroke();
          ctx.restore();
        }
      },
      // 每一条指针
      drwPoints() {
        ctx.beginPath();

        // 给定义个时间
        const date = new Date();
        // 计算出时分秒
        let hous = date.getHours() % 12;
        let minutes = date.getMinutes();
        const seconds = date.getSeconds();
        minutes = minutes + seconds / 60;
        hous = hous + minutes / 60;
        // console.log(seconds)
        // 计算指针的弧度值
        const hourR = (hous * 2 * Math.PI) / 12 - Math.PI / 2;
        const minutesR = (minutes * 2 * Math.PI) / 60 - Math.PI / 2;
        const secondsR = (seconds * 2 * Math.PI) / 60 - Math.PI / 2;
        // console.log('secondsR', secondsR)
        // 每一条的指针的长度
        // ctx.beginPath();
        const {
          hoursLength,
          hoursWidth,
          minLength,
          minWidth,
          secondLength,
          secondWidth
        } = this.point;
        this.drawPointer(hoursLength, hourR, hoursWidth);
        this.drawPointer(minLength, minutesR, minWidth);
        this.drawPointer(secondLength, secondsR, secondWidth);
      },
      // 指针的长度
      drawPointer(length, radian, lineWidth) {
        const h = length * Math.sin(radian);
        // console.log(h)
        const b = length * Math.cos(radian);
        const x = this.bigX + b;
        const y = this.bigY + h;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(this.bigX, this.bigY);
        ctx.lineTo(x, y);
        ctx.lineWidth = lineWidth;
        ctx.stroke();
        ctx.restore();
      }
    };
    // tslint:disable-next-line:no-unused-expression
    new Clock({
      bigX: 125, // 圆心坐标L
      bigY: 125, // 圆心坐标Y
      bigR: 110, // 半径
      bigColor: '#FFF', // 大圆颜色
      bigLine: 1, // 大圆宽度
      tick: {
        bigLeng: 5, // 时刻度长度
        bigWidth: 2, // 时刻度宽度
        smallLeng: 0, // 分刻度长度
        smallWidth: 0, // 分刻度宽度
        tickColor: '#FFF'
      },
      point: {
        hoursLength: 60,
        hoursWidth: 4,
        minLength: 80,
        minWidth: 3,
        secondLength: 90,
        secondWidth: 1,
        pointerColor: '#FFF'
      }
    });
  };
  render() {
    return (
      <div>
        <canvas
          ref={node => {
            this.canvasNode = node;
          }}
        />
      </div>
    );
  }
}
export default Colock;

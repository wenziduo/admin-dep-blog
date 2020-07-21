import { Checkbox } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';

class PreviewElement extends React.Component {
  state = {
    checked: false,
  };
  handleCheckBoxChange = ({ target: { checked } }) => {
    this.setState(preState => ({ checked }));
  };
  render() {
    return (
      <div className="comon-preview">
        <div className="comon-preview-content">
          <Checkbox
            checked={this.state.checked}
            onChange={this.handleCheckBoxChange}
          >
            选中
          </Checkbox>
          <div>
            <button onClick={this.props.onClose}>返回</button>
            <button onClick={this.props.onSubmit.bind(this, this.state)}>
              确定
            </button>
          </div>
        </div>
      </div>
    );
  }
}
class Preview {
  constructor() {
    this.Ele = (
      <PreviewElement
        onOpen={this.open}
        onClose={this.close}
        onSubmit={(state) => { this.close();this.func(state) }}
      />
    );
  }
  open = () => {
    console.log('this.Ele', this.Ele);
    ReactDOM.render(this.Ele, document.getElementById('root-common'));
    return this;
  };
  submit = fn => {
    this.func = fn
    return this;
  };
  close = () => {
    ReactDOM.render(null, document.getElementById('root-common'));
    return this;
  };
  next = () => {
    let fn = this.task.shift();
    fn && fn();
  };
}
const preview = new Preview();
export default preview;

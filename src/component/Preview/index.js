import React from 'react'
import { Modal } from 'antd'

class Preview extends React.Component {
  state = {
    visible: false,
    imgUrl: ''
  }
  handleCancel = () => {
    this.setState({
      visible: false,
      imgUrl: ''
    })
  }
  setData = imgUrl => {
    this.setState({
      visible: true,
      imgUrl
    })
  }
  render() {
    return (
      <Modal
        visible={this.state.viaible}
        onCancel={this.handleCancel}
        footer={false}
      >
        {this.props.imgUrl && <img src={this.state.imgUrl} />}
      </Modal>
    )
  }
}

export default Preview

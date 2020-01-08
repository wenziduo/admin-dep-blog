import React from 'react'
// import MarkdownEditor from '@uiw/react-markdown-editor'
import MarkdownEditor from 'for-editor'
import { Button, message, Modal } from 'antd'
import ModalForm from './modal'
import './index.less'
let timer

class PostCreate extends React.Component {
  constructor() {
    super()
    this.state = {
      markdown: null,
      text: null
    }
    this.updateMarkdown = this.updateMarkdown.bind(this)
  }

  updateMarkdown(value) {
    this.setState({ markdown: value })
    this.getText()
  }
  // 获取解析后的text
  getText = () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      this.setState({
        text: this.markdownNode.$blockPreview.current.innerText
      })
    }, 300)
  }
  render() {
    return (
      <div className="page page-postCreate">
        <MarkdownEditor
          ref={node => {
            this.markdownNode = node
          }}
          value={this.state.markdown}
          onChange={this.updateMarkdown}
          preview
          subfield
          height={700}
        />
        <ModalForm stateProps={this.state} text={this.state.text} />
      </div>
    )
  }
}

export default PostCreate

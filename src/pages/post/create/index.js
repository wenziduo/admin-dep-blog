import React from 'react'
// import MarkdownEditor from '@uiw/react-markdown-editor'
import MarkdownEditor from 'for-editor'
import { Button, message, Modal } from 'antd'
import { fetchPostDetail } from './service'
import { getUrlParam } from '../../../utils'
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
  componentDidMount() {
    this.handleDefault()
  }
  handleDefault = async () => {
    const id = getUrlParam('id')
    console.log('id', id)
    if (id) {
      const resp = await fetchPostDetail({ _id: id })
      this.setState({
        markdown: resp.data.content,
        text: resp.data.text,
        ...resp.data
      })
    }
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
  // 上传图片
  handleAddImg = (e) => {
    console.log(e)
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
          addImg={this.handleAddImg}
          preview
          subfield
          height={700}
        />
        <ModalForm stateProps={this.state} />
      </div>
    )
  }
}

export default PostCreate

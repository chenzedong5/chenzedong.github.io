import React, { Component } from 'react';
import { Toast } from 'antd-mobile';
import Mshare from 'm-share';
import './index.less';
import { CDN } from 'config';
import Csv from './Csv';
import { withRouter } from "react-router-dom";
const colorArr = ['#de6338', '#61c9b1', '#51a5c8', '#4431c4', '#60cb49', '#e4b348']

class W extends Component {
  constructor(props) {
    super(props)
    this.timeOutEvent = null
  }
  componentDidMount() {
    //回退
    if (this.props.result.chineseName) {
      document.title = `${this.props.result.pTitle}测试`
    } else {
      this.props.history.push(this.props.match.url.replace(/\/psy_test.*$/, "/psy_test"))
      return
    }
    Toast.info('双击图片保存！！', 2);
  }
  backHome = () => {
    this.props.history.push(this.props.match.url.replace(/\/psy_test.*$/, "/psy_test"))
  }
  saveImg = () => {
    Mshare.popup({
      title: `最全面人格心理测试 — ${this.props.result.chineseName}，快来参与！`,
      desc: `最全面人格心理测试 — ${this.props.result.chineseName}，快来参与！`,
      link: window.location.href,
      imgUrl: CDN + this.props.result.shareImg,
      types: ['wx', 'wxline', 'qq', 'qzone', 'sina'],
      infoMap: {
        wx: {
          title: `最全面人格心理测试 — ${this.props.result.chineseName}，快来参与！`,
          desc: `最全面人格心理测试 — ${this.props.result.chineseName}，快来参与！`,
          link: window.location.href,
          imgUrl: CDN + this.props.result.shareImg
        }
      },
      fnDoShare: (type) => {
        console.log('分享成功');
      }
    });
  }

  onTouchMove = () => {
    clearTimeout(this.timeOutEvent);
    this.timeOutEvent = 0;
  }
  onTouchEnd = () => {
    clearTimeout(this.timeOutEvent);
    if (this.timeOutEvent != 0) {
      console.log('你点击了');
    }
    return false;
  }
  onTouchStart = () => {
    this.timeOutEvent = setTimeout(() => {
      this.timeOutEvent = 0;
      this.props.shareCount({ from: '保存图片', type: '分享' })
    }, 400)
  };
  render() {
    const { result } = this.props
    const maps = result.result || []
    const resultParams = {}
    resultParams.arr = maps.map((item, index) => {
      return {
        title: item.chineseName,
        point: item.score,
        description: item.textDetail,
        color: colorArr[index]
      }
    })
    resultParams.title = result.chineseName
    return (
      <div className='test-result-wap'>
        <div onTouchMove={this.onTouchMove} onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}>
          <Csv resultParams={resultParams} />
        </div>
        <div className='handle-bar'>
          <div type='primary' id="share" onClick={this.saveImg}>分享</div>
          <div type='primary' onClick={this.backHome}>返回首页</div>
        </div>
      </div>
    )
  }
}

export default withRouter(W)


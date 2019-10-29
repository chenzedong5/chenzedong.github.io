import React, { Component } from 'react';
import OptionRender from "./OptionRender"
import { Progress } from 'antd-mobile';
import styles from './index.module.less';
import { CDN } from "config";
import './index.less';
const ANWSER = ['', 'Strongly disagree', 'Disagree', 'Uncertainty', 'Agree', 'Totally agree']

class ScrollList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      scrollTo: 0,
      overTest: false,
      curent: 1,
    };
    this.result = []
  }
  componentDidMount() {
    let data = this.props.testList.childCategory.slice(0, 1)[0]
    this.setState({
      scrollTo: document.body.clientHeight - this.ul.scrollHeight - 340,
      list: this.state.list.concat(Object.assign({}, data, {
        row: this.questionRow.bind(this, data, 1)
      }))
    })
  }

  questionRow = (rowData, rowID) => {
    let sum = this.props.testList.childCategory.length

    return (
      <li key={rowID} className={styles.testDetail}>
        <img src={CDN + this.props.testList.img} alt="test's images" />
        <div className={styles.testitemlist}>
          <div>
            <p>{`${rowID}/${sum}. `}{rowData.text}</p>
            <div className='dot-left'></div>
          </div>
          <OptionRender choiceOption={this.choiceOption.bind(this, rowData, rowID)} />
        </div>
      </li>
    )
  };

  choiceOption(rowData, rowID, key) {
    this.result.push({
      choose: key,
      key: rowData.key,
      categoryName: rowData.categoryName
    })
    this.setState({
      list: this.state.list.concat({
        row: () =>
          <li style={{ float: 'right' }} key={`${rowID}_info`} className={`right-li ${styles.testDetail}`}>
            <div className={styles.testitemlist}>
              <div>
                <p>{ANWSER[key]}</p>
                <div className='dot-right'></div>
              </div>
            </div>
          </li>
      })
    }, () => {
      //test结束状态处理
      if (this.result.length === this.props.testList.childCategory.length) {
        this.setState({
          overTest: true,
          scrollTo: document.body.clientHeight - this.ul.scrollHeight - 80
        })
        return
      }
      if (this.state.curent === 12) {
        this.setStepInfo(rowID, 'The survey is almost done. Go on!')
      } else {
        this.setQuestion(rowID)
      }
    })
  }

  setStepInfo(rowID, info) {
    this.setState((preState) => {
      return Object.assign({}, preState, {
        list: preState.list.concat({
          row: () => <li key={`${preState.curent}_info`} className={styles.testDetail}>
            <img src={CDN + this.props.testList.img} alt="test's images" />
            <div className={styles.testitemlist}>
              <div style={{ color: 'white', backgroundColor: 'rgb(236, 120, 126)' }}>
                <p>{info}</p>
                <div style={{ backgroundColor: 'rgb(236, 120, 126)' }} className='dot-left'></div>
              </div>
            </div>
          </li>
        }),
      })
    }, () => {
      this.setState({
        scrollTo: document.body.clientHeight - this.ul.scrollHeight - 40
      })
    })
    setTimeout(() => {
      this.setQuestion(20)
    }, 2000)
  }

  setQuestion() {
    this.setState((preState) => {
      let data = this.props.testList.childCategory.slice(preState.curent, preState.curent + 1)[0]
      return Object.assign({}, preState, {
        list: preState.list.concat(Object.assign(data, {
          row: this.questionRow.bind(this, data, preState.curent + 1)
        })),
        curent: preState.curent + 1
      })
    }, () => {
      this.setState({
        scrollTo: document.body.clientHeight - this.ul.scrollHeight - 40
      })
    })
  }
  submit = () => {
    this.props.submitResult({
      _id: this.props._id,
      testList: this.result
    })
  }
  render() {
    const stylesd = {
      transform: `translateY(${this.state.scrollTo}px)`
    }
    return (
      <div className={`${styles.scrollList} scroll-test`}>
        <Progress
          unfilled={false}
          className='scroll-progress'
          percent={this.state.curent / (this.props.testList.childCategory && this.props.testList.childCategory.length) * 100}
          position="fixed" />
        <ul ref={(ref) => this.ul = ref} style={stylesd}>
          {this.state.list.map((item, index) => {
            return item.row && <span key={index}>{item.row(item)}</span>
          })}
        </ul>
        {this.state.overTest ? <div className={styles.submitButton}>
          <div onClick={this.submit}>提交</div>
        </div> : ''}
      </div>
    )
  }
}

export default ScrollList
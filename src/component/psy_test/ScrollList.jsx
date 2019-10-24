import React, { Component } from 'react';
import { Progress } from 'antd-mobile';
import styles from './index.module.less';

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
        {/* <img src={QINNIUFUC(this.props.testList.img)} alt="test's image" /> */}
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
            {/* <img src={QINNIUFUC(this.props.testList.img)} alt="test's image" /> */}
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
          {this.state.list.map(item => {
            return item.row && item.row(item)
          })}
        </ul>
        {this.state.overTest ? <div className={styles.submitButton}>
          <div onClick={this.submit}>提交</div>
        </div> : ''}
      </div>
    )
  }
}

class OptionRender extends Component {
  state = {
    choiceKey: -1
  }
  clickHandle = (e) => {
    if (this.state.choiceKey != -1 || !e.target.dataset.key) return
    this.setState({
      choiceKey: e.target.dataset.key
    })
    this.props.choiceOption(e.target.dataset.key)
  }
  render() {
    return (
      <ul onClick={this.clickHandle}>
        <li data-key={1} key={1} className={this.state.choiceKey == 1 ? styles.active : ''}>{ANWSER[1]}</li>
        <li data-key={2} key={2} className={this.state.choiceKey == 2 ? styles.active : ''}>{ANWSER[2]}</li>
        <li data-key={3} key={3} className={this.state.choiceKey == 3 ? styles.active : ''}>{ANWSER[3]}</li>
        <li data-key={4} key={4} className={this.state.choiceKey == 4 ? styles.active : ''}>{ANWSER[4]}</li>
        <li data-key={5} key={5} className={this.state.choiceKey == 5 ? styles.active : ''}>{ANWSER[5]}</li>
      </ul>
    )
  }
}

{/* <ScrollList submitResult={this.submitResult} testList={testList}/> */}

export default ScrollList
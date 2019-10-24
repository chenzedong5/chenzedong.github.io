import React, { useState, useEffect } from 'react';
import ScrollList from './ScrollList';
import { NavBar, Icon } from 'antd-mobile';
import './index.less';
import styles from './index.module.less';
import { CDN } from "config";

const TextDetail = props => {
  const [startTest, setStartTest] = useState(false)

  useEffect(() => {
    props.getTestList(props._id, props.category)
  }, []);

  const submitResult = (obj) => {
    obj._id = props._id
    props.submitResult(obj, props.category)
  }
  const back = () => {
    props.history.push(`${props.match.url}`)
  }
  const pushStartTest = () => {
    startTest(true)
  }
  const { testList } = props
  return (
    <div className='text-detail'>
      <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={back}>
        {testList.name}
      </NavBar>
      < div className='test-start'>
        <img src={CDN + props.testList.img} alt="test's images" />
        <div key='title' className='title'>
          <p className='title-1'>{props.testList.chineseName}</p>
          <p className='title-2'>{props.testList.name}</p>
        </div>
        <div className='test-start-btn' size='small' type='primary' onClick={props.pushStartTest}>开始测试</div>
        <div className='second' key='second'>
          <div>{props.testList.secondTitle}</div>
          <div className='third-title'>{props.testList.thirdTitle}</div>
        </div>
      </div>

      {/* { startTest ? <TestStart testList={testList} pushStartTest={pushStartTest} /> : '' }
     { testList._id && startTest ? <ScrollList submitResult={submitResult} testList={testList} /> : '' } */}
    </div >
  )
}

export default TextDetail

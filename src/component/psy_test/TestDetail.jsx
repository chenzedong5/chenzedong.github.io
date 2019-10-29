import React, { useState, useEffect } from 'react';
import ScrollList from './ScrollList';
import { NavBar, Icon } from 'antd-mobile';
import './index.less';
import { CDN } from "config";
import { withRouter } from "react-router-dom";

const TextDetail = props => {
  const [startTest, setStartTest] = useState(false)

  useEffect(() => {
    props.getTestList(props._id, props.category)
  }, []);

  const submitResult = (obj) => {
    props.submitResult(obj.testList, props._id)
  }
  const back = () => {
    props.history.push(`${props.match.url.replace(/\/psy_test.*$/, "/psy_test")}`)
  }

  const pushStartTest = () => {
    setStartTest(true)
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
      {!startTest ?
        <div className='test-start'>
          <img src={CDN + props.testList.img} alt="test's images" />
          <div key='title' className='title'>
            <p className='title-1'>{props.testList.chineseName}</p>
            <p className='title-2'>{props.testList.name}</p>
          </div>
          <div className='test-start-btn' size='small' type='primary' onClick={pushStartTest}>开始测试</div>
          <div className='second' key='second'>
            <div>{props.testList.secondTitle}</div>
            <div className='third-title'>{props.testList.thirdTitle}</div>
          </div>
        </div> :
        <ScrollList submitResult={submitResult} testList={testList} />
      }
    </div >
  )
}

export default withRouter(TextDetail) 

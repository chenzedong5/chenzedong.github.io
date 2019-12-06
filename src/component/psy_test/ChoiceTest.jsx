import React from 'react';
import styles from './index.module.less';
import { List } from 'antd-mobile';
import "./index.less";
import { CDN } from "../../config";
import { withRouter } from "react-router-dom";

const Item = List.Item;

const ChoiceTest = props => {
  const { psyList } = props
  return (
    <div className='choice-test'>
      <div>
        <List renderHeader={() => '精彩测评'} className="my-list" style={{ marginBottom: 20 }}>
          {psyList.map((item) => {
            return (
              <Item
                key={item._id}
                multipleLine
                onClick={() => {
                  props.history.push(`${props.match.url.replace(/\/list.*$/, "")}/detail?_id=${item._id}&category=${item.pTitle}`)
                }}>
                <div className='item-left'>
                  <img src={CDN + item.img} alt="test's images" />
                </div>
                <div className='item-right'>
                  <span className={styles.titleItem}>
                    {item.chineseName}
                  </span>
                  <div className={styles.secondTitle}>
                    <span>{item.secondTitle && item.secondTitle.slice(0, 27) + '...'}</span>
                  </div>
                  <div className='test-button' size='small' type='primary'>免费测试</div>
                  <span className='test-category'>{item.category}</span>
                </div>
              </Item>
            )
          })
          }
        </List>
        <div className="home-bottom-line">
          <div></div>
          <span>我也是有底线的</span>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(ChoiceTest)


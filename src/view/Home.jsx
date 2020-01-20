import React, { useEffect } from "react";
import styles from "./index.module.less";
import { connect } from "react-redux";
import * as ACTION from "actionType"
import { Link } from "react-router-dom"
import Test from "./Test.jsx";
import { Modal, Toast } from "antd-mobile"


function createModel(title, desc, cb, cb2, text1, text2) {
  Modal.alert(title, desc, [
    { text: text1 || '不是', onPress: cb || (() => console.log('cancel')) },
    {
      text: text2 || '是',
      onPress: cb2 || (() => { }),
    },
  ])
}


function sd() {
  createModel(
    "你知道错了吗",
    "",
    () => {
      sd()
    },
    () => {
      Modal.alert('爸爸原谅你了')
    },
    "不知道",
    "知道"
  )
}

function Home(props) {

  useEffect(() => {
    props.handleTest()

    createModel(
      '你是🐷吗',
      '你确定你是🐷???',
      () => createModel(
        "那你是人吗",
        "",
        () => {
          createModel(
            "你喜欢男人还是女人",
            "",
            () => {
              Modal.alert('不，你喜欢吴彦祖❤️')
            },
            () => {
              Modal.alert('不，你喜欢吴彦祖❤️')
            },
            "👱",
            "👩"
          )
        },
        () => {
          sd()
        },
        "是个人",
        "灰卡卡🐷"
      ),
      () => createModel(
        "你喜欢公🐷还是母🐷",
        "",
        () => {
          Modal.alert('爸爸也是这么想的😆')
        },
        () => {
          Modal.alert('爸爸也是这么想的😝')
        },
        "公🐷",
        "母🐷"
      )
    )
  }, [])



  return (
    <>
      <div className={styles.home}>
        <ul>
          <li>
            <Link to={props.match.url.replace(/\/home.*/, "") + "/psy_test"}></Link>
            <Test />
          </li>
        </ul>
      </div>
    </>
  );
}

export default connect(state => {
  return { test: state.commonState.test }
}, dispatch => {
  return {
    handleTest() {
      dispatch({ type: ACTION.HANDLE_COMMON_TEST })
    }
  }
})(Home)
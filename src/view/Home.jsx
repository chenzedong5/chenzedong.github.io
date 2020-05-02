import React, { useEffect } from "react";
import styles from "./index.module.less";
import { connect } from "react-redux";
import * as ACTION from "actionType"
import { Link } from "react-router-dom"
import Test from "./Test.jsx";
import { Modal, Toast } from "antd-mobile"
import picture from "../data/15E455V429260-R037.jpg";

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
      zhu()
    },
    "不知道",
    "知道"
  )
}

function zhu() {
  createModel(
    "你是发财运的🐷，还是走霉运的🐷",
    "",
    () => {
      Modal.alert('爸爸也是这么想的😆')
    },
    () => {
      Modal.alert('爸爸也是这么想的😝')
    },
    "发财运",
    "走霉运"
  )
}

function Home(props) {
  let urpparse = new URLSearchParams(window.location.hash.replace(/.*\?/, "?"))

  const ming = urpparse.get("ming")
  const ming2 = urpparse.get("ming2")

  const sdf = () => {
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
              Modal.alert('不，你喜欢进退两男')
            },
            () => {
              Modal.alert('不，你喜欢' + ming2)
            },
            "👱",
            "👩"
          )
        },
        () => {
          sd()
        },
        "是个人",
        ming + "🐷"
      ),
      () => zhu()
    )
  }



  return (
    <>
      <div className={styles.home}>
        <ul>
          <li onClick={sdf} style={{ width: 200, height: 100 }}>

            <img src={picture} style={{ width: "100vw", maxWidth: 600 }} />
            {/* <Test /> */}
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

//<Link to={props.match.url.replace(/\/home.*/, "") + "/psy_test"}></Link>
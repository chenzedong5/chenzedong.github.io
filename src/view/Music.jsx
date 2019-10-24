import React, { useEffect } from "react";
import styles from "./index.module.less";
import { connect } from "react-redux";
import * as ACTION from "actionType"

function Home(props) {

  useEffect(() => {
    props.handleTest()
  }, [])

  return (
    <>
      <div className={styles.home}>
        {props.test}
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
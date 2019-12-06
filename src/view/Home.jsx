import React, { useEffect } from "react";
import styles from "./index.module.less";
import { connect } from "react-redux";
import * as ACTION from "actionType"
import { Link } from "react-router-dom"
function Home(props) {

  useEffect(() => {
    props.handleTest()
  }, [])

  return (
    <>
      <div className={styles.home}>
        <ul>
          <li>
            <Link to={props.match.url.replace(/\/home.*/,"") + "/psy_test"}>心理测试</Link>
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
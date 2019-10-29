import React, { useEffect } from "react";
import styles from "./index.module.less";
import { connect } from "react-redux";
import * as ACTION from "actionType"
import { Switch, Redirect, Route } from 'react-router-dom';
import ChoiceTest from "../component/psy_test/ChoiceTest"
import TestDetail from "../component/psy_test/TestDetail"
import TestResult from "../component/psy_test/TestResult"

function Home(props) {
  const { match, psyList, result, testList, getTestList, submitResult } = props
  useEffect(() => {
    props.getPsyList()
  }, [])

  const backHome = () => {
    props.history.push(`${props.match.url}`)
  }

  return (
    <>
      <div className={styles.home}>
        <Switch>
          <Route path={match.url + '/list'} render={() => {
            return <ChoiceTest psyList={psyList} match={match} />
          }} />
          <Route exact path={match.url + '/detail'} render={({ location }) => {
            const urlQu = new URLSearchParams(location.search)
            return (
              <TestDetail
                _id={urlQu.get("_id")}
                category={urlQu.get("category")}
                getTestList={getTestList}
                testList={testList}
                submitResult={(...args) => {
                  submitResult(...args)
                  props.history.push(`${props.match.url}/result`);
                }}
              />
            )
          }} />
          <Route exact path={match.url + '/result'} render={(obj) => {
            return (
              <TestResult
                backHome={backHome}
                result={result}
              />
            )
          }} />
          {/* <Redirect to={`${match.url}/list`} /> */}
        </Switch>
      </div>
    </>
  );
}

export default connect(state => {
  return {
    psyList: state.psyTestState.psyList,
    testList: state.psyTestState.testList,
    result: state.psyTestState.result
  }
}, dispatch => {
  return {
    getPsyList() {
      dispatch({ type: ACTION.GET_PSY_LIST })
    },
    getTestList(_id) {
      dispatch({ type: ACTION.GET_TEST_LIST, payload: { _id } })
    },
    submitResult(testList, _id) {
      dispatch({ type: ACTION.PUSH_TEST_RESULT, payload: { testList, _id } })
    }
  }
})(Home)
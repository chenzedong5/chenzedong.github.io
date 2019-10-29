import React, { useEffect, useCallback } from "react";
import styles from "./index.module.less";
import { connect } from "react-redux";
import * as ACTION from "actionType"
import { Switch, Redirect, Route } from 'react-router-dom';
import ChoiceTest from "../component/psy_test/ChoiceTest"
import TestDetail from "../component/psy_test/TestDetail"
import TestResult from "../component/psy_test/TestResult"

function Home(props) {

  const { match, getPsyList, psyList, result, testList, getTestList, submitResult, history } = props

  useEffect(() => {
    getPsyList()
  }, [])

  const handleResult = useCallback((...args) => {
    submitResult(...args, () => {
      history.push(`${match.url}/result`);
    })
  }, [history, match.url, submitResult])

  return (
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
              submitResult={handleResult}
            />
          )
        }} />
        <Route exact path={match.url + '/result'} render={(obj) => {
          return (<TestResult result={result} />)
        }} />
        <Redirect to={`${match.url}/list`} />
      </Switch>
    </div>
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
    submitResult(testList, _id, cb) {
      dispatch({ type: ACTION.PUSH_TEST_RESULT, payload: { testList, _id, cb } })
    }
  }
})(Home)
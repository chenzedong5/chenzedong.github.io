import {
  takeLatest,
  fork,
  all,
  put,
  delay
} from 'redux-saga/effects';
import * as ACTION from "actionType"
import bigfive from "../data/bigfive.json"
import testLists from "../data/test.json"

function* asyncGetPsyList(action) {
  yield put({
    type: ACTION.HANDLE_PSY_TESR,
    payload: {
      psyList: bigfive
    }
  })
}

function* asyncGetTestList(action) {
  const {
    _id
  } = action.payload
  let oneBigFive = bigfive.find(i => i._id === _id)

  yield put({
    type: ACTION.HANDLE_PSY_TESR,
    payload: {
      testList: oneBigFive
    }
  })
}

export default function* rootSaga() {
  let sagas = [function* () {
    yield takeLatest(ACTION.GET_PSY_LIST, asyncGetPsyList);
    yield takeLatest(ACTION.GET_TEST_LIST, asyncGetTestList)
  }]
  yield all(sagas.map(saga => fork(saga)));
}
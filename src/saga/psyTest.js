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
import _ from "lodash"

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
  let childCategory = []
  for (let i in oneBigFive.childCategory) {
    childCategory = childCategory.concat(oneBigFive.childCategory[i].testList)
  }

  yield put({
    type: ACTION.HANDLE_PSY_TESR,
    payload: {
      testList: {
        ...oneBigFive,
        childCategory: _.sortBy(childCategory, o => o.num)
      }
    }
  })
}

function getDownScore(l) {
  let s = [5, 4, 3, 2, 1]
  return s[l - 1]
}

function handles(arr) {
  let obj = {}
  arr.forEach(item => {
    if (!obj[item.categoryName]) {
      if (item.key == 1) {
        obj[item.categoryName] = Number(item.choose)
      } else {
        obj[item.categoryName] = getDownScore(Number(item.choose))
      }
    } else {
      if (item.key == 1) {
        obj[item.categoryName] += Number(item.choose)
      } else {
        obj[item.categoryName] += getDownScore(Number(item.choose))
      }
    }
  })
  return obj
}

function* asyncPushTestResult(action) {
  const {
    _id,
    testList,
    cb
  } = action.payload

  let psyObj = bigfive.find(item => item._id === _id)

  const _obj = handles(testList)
  const reObj = {}
  const maps = []
  for (let i in _obj) {
    reObj[i] = testLists.find(item => {
      return item.category === i && item.sum === _obj[i]
    })
    let detailObj = psyObj.childCategory.find(item => item.name === i)
    maps.push({
      textDetail: reObj[i].textDetail,
      chineseName: detailObj ? detailObj.chineseName : '',
      category: reObj[i].category,
      score: reObj[i].score,
    })
  }

  const result = {
    name: psyObj.name,
    chineseName: psyObj.chineseName,
    secondTitle: psyObj.secondTitle,
    persons: psyObj.persons,
    _id: psyObj._id,
    img: psyObj.img,
    result: maps,
    pTitle: psyObj.pTitle,
  }

  yield put({
    type: ACTION.HANDLE_PSY_TESR,
    payload: {
      result
    }
  })
  cb && cb()
}

export default function* rootSaga() {
  let sagas = [function* () {
    yield takeLatest(ACTION.GET_PSY_LIST, asyncGetPsyList);
    yield takeLatest(ACTION.GET_TEST_LIST, asyncGetTestList)
    yield takeLatest(ACTION.PUSH_TEST_RESULT, asyncPushTestResult)
  }]
  yield all(sagas.map(saga => fork(saga)));
}
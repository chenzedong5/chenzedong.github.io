import * as React from "react";
import { runSaga, io } from "little-saga";
import { useSaga } from "../hook";
import _ from "lodash";

function* fn(...arg) {
  let ret = yield io.call(function* () {
    yield 23;
    return 23;
  });
  while (true) {
    yield io.take("ACTION");
  }
}

function* fn2() {

  yield io.fork(fn);
  yield io.fork(fn);
}

function reducer(state, action) {
  switch (action.type) {
    case "ACTION":
      return { a: 1 };
    default:
      return {};
  }
}

function App() {
  const [state, dispatch] = useSaga({
    saga: fn2,
    args: [1, 2, 4],
    reducer: reducer
  });

  let arr = [1, 1, 2, 0, "", [], {}, false, 0]

  let a = _.transform({ a: 1, b: 2, c: 3 }, (ret, values, key) => {
    values > 1 && ret.push(key)
  }, [])

  console.log(a)

  return (
    <div
      className="App"
      onClick={() => {
        dispatch({ type: "ACTION" });
      }}
    >
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}


export default App

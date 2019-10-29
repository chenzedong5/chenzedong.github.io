import React from "react";
import styles from "./index.module.less";
const ANWSER = ['', 'Strongly disagree', 'Disagree', 'Uncertainty', 'Agree', 'Totally agree']
class OptionRender extends React.Component {
  state = {
    choiceKey: -1
  }
  clickHandle = (e) => {
    if (this.state.choiceKey != -1 || !e.target.dataset.key) return
    this.setState({
      choiceKey: e.target.dataset.key
    })
    this.props.choiceOption(e.target.dataset.key)
  }
  render() {
    return (
      <ul onClick={this.clickHandle}>
        <li data-key={1} key={1} className={this.state.choiceKey == 1 ? styles.active : ''}>{ANWSER[1]}</li>
        <li data-key={2} key={2} className={this.state.choiceKey == 2 ? styles.active : ''}>{ANWSER[2]}</li>
        <li data-key={3} key={3} className={this.state.choiceKey == 3 ? styles.active : ''}>{ANWSER[3]}</li>
        <li data-key={4} key={4} className={this.state.choiceKey == 4 ? styles.active : ''}>{ANWSER[4]}</li>
        <li data-key={5} key={5} className={this.state.choiceKey == 5 ? styles.active : ''}>{ANWSER[5]}</li>
      </ul>
    )
  }
}

export default OptionRender
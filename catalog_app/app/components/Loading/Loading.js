import React, {Component} from 'react'

class Loading extends Component {
  state = {
    text: 'Loading',
  }

  componentDidMount() {
    const stopper = this.state.text + '...'

    this.interval = window.setInterval(() => {
      this.state.text === stopper
        ? this.setState(() => ({text: 'Loading'}))
        : this.setState(prevState => ({text: prevState.text + '.'}))
    }, 300)
  }

  componentWillUmount() {
    window.cleatInterval(this.interval)
  }

  render() {
    return <span>{this.state.text}</span>
  }
}

export default Loading

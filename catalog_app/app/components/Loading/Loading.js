import React, {Component} from 'react'

// Loading component inspired in the Tyler McGinnis Loading component
// https://gist.github.com/tylermcginnis/29f885fdb5d9d5206e6fedc9168134aa
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

  componentWillUnmount() {
    window.clearInterval(this.interval)
  }

  render() {
    return <span>{this.state.text}</span>
  }
}

export default Loading

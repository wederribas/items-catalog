import React, {Component} from 'react'
import {Title} from 'components'
import {fetchItem} from 'helpers/api'
import {description} from './styles.css'
import {listContainer} from '../../assets/styles/styles.css'

class Item extends Component {
  state = {
    item: null,
  }
  componentDidMount() {
    fetchItem(this.props.match.params.id).then(resp => {
      this.setState({
        item: resp,
      })
    })
  }
  render() {
    return (
      <div className={listContainer}>
        {this.state.item ? (
          <section>
            <Title text={this.state.item.name} />
            <p className={description}>
              <b>{'Description: '}</b>
              {this.state.item.description}
            </p>
          </section>
        ) : (
          <span>{'Loading'}</span>
        )}
      </div>
    )
  }
}

export default Item

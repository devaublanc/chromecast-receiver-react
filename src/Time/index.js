import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

import styles from './index.css'

export default class Time extends Component {
    static propTypes = {
        start: PropTypes.string,
        remaining: PropTypes.string,
        end: PropTypes.string,
        customClass: PropTypes.string
    }

    static defaultProps = {
        start: '00:00:00',
        remaining: '00:00:00',
        end: '00:00:00',
        customClass: null
    }

    constructor() {
        super();
        this.state = {
            displayRemaining: false
        }
    }

    render() {

        const {
            start,
            remaining,
            end,
            customClass
        } = this.props

        const {
            displayRemaining
        } = this.state

        return (
            <div className={classNames(styles.root, {
                [customClass]: customClass
            })} onClick={ () => { this.setState({displayRemaining: !displayRemaining}) }}>
                <span className={ styles.time }>{ displayRemaining ? remaining : start } / { end }</span>
            </div>
        )
    }
}

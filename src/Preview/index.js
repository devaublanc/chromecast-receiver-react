import React, { PropTypes } from 'react'
import classNames from 'classnames'

import styles from './index.css'

const Preview = ({
    customClass = null,
    posX = null,
    second = '00:00',
    sprite = null,
    position = {
        left: 0,
        top: 0
    }
}) =>

<div
    style={{
        left: posX
    }}
    className={ classNames(styles.root, {
        [customClass]: customClass
    })}>
    <div
        style={{
            backgroundImage: `url(${sprite})`,
            backgroundPosition: `${position.left * -1}px ${position.top}px`
        }}
        className={ styles.picture }>
    </div>
    <div className={ styles.time }>{ second }</div>
</div>

Preview.propTypes = {
    customClass: PropTypes.string,
    posX: PropTypes.number,
    second: PropTypes.string,
    position: PropTypes.shape({
        left: PropTypes.number,
        top: PropTypes.number
    }),
    sprite: PropTypes.string
}

export default Preview

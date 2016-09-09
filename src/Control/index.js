import React, { PropTypes } from 'react'
import classNames from 'classnames'

import Icon from '../Icon'
import styles from './index.css'

const Control = ({
    action = () => {},
    icon = '',
    customClass = null,
    disabled = false,
    active = false
}) =>

<div
    className={classNames(styles.root, {
        [customClass]: customClass,
        [styles.disabled]: disabled
    })}
    onClick={ () => {
        if (!disabled) {
            action()
        }
    }}>
    <Icon name={ `${icon}${(active ? 'Active' : '')}` } />
</div>

Control.propTypes = {
    action: PropTypes.func,
    icon: PropTypes.string,
    customClass: PropTypes.string,
    disabled: PropTypes.bool,
    active: PropTypes.bool
}

export default Control

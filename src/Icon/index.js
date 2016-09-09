import React, { PropTypes } from 'react'
import classNames from 'classnames'
import styles from './index.css'

const Icon = ({
    name = '',
    customClass = null
}) =>


<i className={ classNames(styles[name], {
    [customClass]: (customClass)
}) }></i>

Icon.propTypes = {
    name: PropTypes.string,
    customClass: PropTypes.string
}

export default Icon

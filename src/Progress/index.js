import React, { PropTypes } from 'react'
import classNames from 'classnames'

import { getPercent } from '../helpers'
import styles from './index.css'

const Progress = ({
    isLive = false,
    min = 0,
    max = 100,
    limit = 0,
    value = 0,
    mouseUp = () => {},
    mouseDown = () => {},
    slide = () => {},
    mouseMove = () => {},
    seekAllowed = true,
    customClass = null,
    isMini = false
}) =>

<div className={ classNames(styles.root, {
    [customClass]: customClass
})}>
    <div
        className={ classNames(styles.progress, {
            [styles.progressLive]: isLive,
            [styles.mini]: isMini
        })}
        style={{
            width: getPercent(value, max)
        }}>
    </div>
    <input
        type="range"
        className={ classNames(styles.range, {
            [styles.rangeLive]: isLive,
            [styles.unauthorized]: !seekAllowed
        })}
        min={ min }
        max={ max }
        disabled={ isLive }
        value={ value }
        onChange={(e) => {
            const value = parseInt(e.target.value);
            const newValue = value > limit ? limit : value;
            slide(newValue);
        }}
        onMouseDown={(e) => {
            const value = parseInt(e.target.value);
            const newValue = value > limit ? limit : value;
            mouseDown(newValue);
        }}
        onMouseUp={(e) => {
            const value = parseInt(e.target.value);
            const newValue = value > limit ? limit : value;
            mouseUp(newValue);
        }}
        onMouseMove={(e) => {
            mouseMove(e);
        }}
    />
</div>

Progress.propTypes = {
    mouseUp: PropTypes.func,
    mouseDown: PropTypes.func,
    slide: PropTypes.func,
    mouseMove: PropTypes.func,
    mouseOver: PropTypes.func,
    isLive: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
    limit: PropTypes.number,
    value: PropTypes.number,
    seekAllowed: PropTypes.bool,
    customClass: PropTypes.string,
    isMini: PropTypes.bool
}

export default Progress

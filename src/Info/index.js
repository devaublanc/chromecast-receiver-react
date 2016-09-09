import React, { PropTypes } from 'react'
import classNames from 'classnames'

import Icon from '../Icon'

import styles from './index.css'

const Info = ({
    title = null,
    customClass = null,
    channelId = null,
    csa = null,
    logo = null,
    isLiked = false,
    isBookmarked = false,
    bookmarkAllowed = true,
    onLikeClick = () => {},
    onBookmarkAddClick = () => {},
    onChannelClick = () => {}
}) =>

<div className={ classNames(styles.root, {
    [customClass]: customClass
})}>
    <img
        src={ logo }
        onClick={ onChannelClick }
        alt="channel"
        className={ classNames(styles.logo, {
            [styles[`channel${channelId}`]]: channelId
        })} />
    <div className={ styles.title }>
        {title}
    </div>
    <div className={ styles.csa }>
        <Icon name={`csa${csa}`}
            customClass={ styles.iconCsa }/>
    </div>
</div>

Info.propTypes = {
    customClass: PropTypes.string,
    title: PropTypes.string,
    channelId: PropTypes.number,
    csa: PropTypes.number,
    isLiked: PropTypes.bool,
    isBookmarked: PropTypes.bool,
    bookmarkAllowed: PropTypes.bool,
    onBookmarkAddClick: PropTypes.func,
    onLikeClick: PropTypes.func,
    onChannelClick: PropTypes.func,
    logo: PropTypes.string
}

export default Info

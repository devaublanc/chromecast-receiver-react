import React, { PropTypes } from 'react'
import classNames from 'classnames'

import Control from '../Control'
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

    <div className={ styles.actions }>
        <div className={ styles.btn }>
            <Control
                action={ onLikeClick }
                customClass={ styles.btnHeart }
                tooltip={{
                    text: isLiked ? 'Ne plus recommander ce programme' : 'Recommander ce programme',
                    id: 'btnHeart',
                    place: 'top'
                }}
                icon={ isLiked ? 'heartActive' : 'heart' } />
        </div>
        <div className={ styles.btn }>
            <Control
                action={ () => {
                    if (bookmarkAllowed) {
                        onBookmarkAddClick()
                    }
                }}
                customClass={ classNames({
                    [styles.btnDisabled]: !bookmarkAllowed
                })}
                tooltip={{
                    text: bookmarkAllowed ? (isBookmarked ? 'Retirer le bookmark' : 'Ajouter au bookmark') : 'Bientôt disponible',
                    id: 'btnBookmark',
                    place: 'top'
                }}
                icon={ isBookmarked ? 'removeBookmark' : 'addbookmark' } />
        </div>
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

import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

import Info from '../Info'

import styles from './index.css'

export default class Footer extends Component {

    static propTypes = {
        visible: PropTypes.bool,
        title: PropTypes.string,
        logo: PropTypes.string,
        children: PropTypes.element,
        channelId: PropTypes.number,
        csa: PropTypes.number,
        isLiked: PropTypes.bool,
        isBookmarked: PropTypes.bool,
        bookmarkAllowed: PropTypes.bool,
        onChannelClick: PropTypes.func,
        onLikeClick: PropTypes.func,
        onBookmarkAddClick: PropTypes.func
    }

    static defaultProps = {
        children: null,
        visible: false,
        logo: null,
        title: '',
        csa: null,
        isLiked: false,
        isBookmarked: false,
        bookmarkAllowed: true,
        onLikeClick: () => {},
        onBookmarkAddClick: () => {},
        onChannelClick: () => {}
    }

    constructor() {
        super();
        // initial state
    }

    render () {

        const {
            visible,
            logo,
            csa,
            channelId,
            title,
            isBookmarked,
            bookmarkAllowed,
            isLiked,
            onChannelClick,
            onLikeClick,
            onBookmarkAddClick,
            children
        } = this.props;

        return (
            <div className={classNames(styles.root, {
                [styles.visible]: visible
            })}>
                <div>
                    <Info
                        customClass={ styles.info }
                        title={ title }
                        logo={ logo }
                        channelId={ channelId }
                        isBookmarked={ isBookmarked }
                        bookmarkAllowed={ bookmarkAllowed }
                        isLiked={ isLiked }
                        onBookmarkAddClick={ onBookmarkAddClick }
                        onLikeClick={ onLikeClick }
                        onChannelClick={ onChannelClick }
                        csa={ csa } />
                </div>
                { children }
            </div>
        )
    }
}

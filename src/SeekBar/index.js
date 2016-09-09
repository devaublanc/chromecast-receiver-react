import React, { Component, PropTypes } from 'react'

import Progress from '../Progress'
import Preview from '../Preview'

import styles from './index.css'
import { formatSeconds } from '../helpers'

export default class SeekBar extends Component {

    static propTypes = {
        actions: PropTypes.shape({
            seek: PropTypes.func,
            slide: PropTypes.func
        }),
        progress: PropTypes.shape({
            liveProgress: PropTypes.number,
            liveDuration: PropTypes.number,
            fluxProgress: PropTypes.number,
            isProgressLiveVisible: PropTypes.bool,
            seekProgress: PropTypes.number,
            fluxDuration: PropTypes.number
        }),
        preview: PropTypes.shape({
            position: PropTypes.shape({
                left: PropTypes.number,
                top: PropTypes.number
            }),
            previewPosX: PropTypes.number,
            second: PropTypes.number,
            sprite: PropTypes.string
        }),
        getPreview: PropTypes.func,
        seekAllowed: PropTypes.bool,
        isLive: PropTypes.bool,
        isReplay: PropTypes.bool
    }

    static defaultProps = {
        actions: {},
        progress: {},
        isLive: false,
        isReplay: false,
        seekAllowed: true,
        getPreview: () => {},
        preview: null
    }

    handleMouseMove = () => {
        this.setState({
            previewVisible: true
        });
    }

    handleMouseOut = () => {
        this.setState({
            previewVisible: false
        });
    }

    handeMouseDown = () => {
        this.setState({
            previewVisible: false
        });
    }

    hasPreview = () => {
        const { previewVisible } = this.state;
        const { preview, isLive } = this.props;
        return previewVisible && preview && !isLive
    }

    constructor() {
        super();
        this.state = {
            previewVisible: false,
            preview: null
        }
    }

    render() {

        const {
            actions,
            progress,
            isLive,
            isReplay,
            seekAllowed,
            preview
        } = this.props;


        return (

            <div className={ styles.root } onMouseDown={ this.handeMouseDown }>
                { this.hasPreview() &&
                    <Preview
                        customClass={ styles.preview }
                        sprite={ preview.sprite }
                        position={ preview.position }
                        second={ formatSeconds(preview.second) }
                        posX={ preview.previewPosX } />
                }
                <div
                    onMouseMove={ this.handleMouseMove }
                    onMouseOut={ this.handleMouseOut }
                    className={ styles.progressContainer }>
                    <div>
                        {
                            isLive && progress.isProgressLiveVisible &&
                                <Progress
                                    isLive={ true }
                                    min={ 0 }
                                    max={ progress.liveDuration }
                                    value={ progress.liveProgress }
                                    customClass={ styles.progress }
                                />
                        }

                        <Progress
                            isLive={ false }
                            min={ 0 }
                            max={ progress.fluxDuration }
                            limit={ isLive ? progress.liveProgress : progress.fluxDuration }
                            value={ progress.seekProgress }
                            slide={ actions.slide }
                            mouseMove={ isReplay ? actions.getPreview : () => {}}
                            mouseUp={ actions.seek }
                            customClass={ styles.progress }
                            seekAllowed={ seekAllowed }
                        />

                    </div>
                </div>
            </div>

        )
    }
}

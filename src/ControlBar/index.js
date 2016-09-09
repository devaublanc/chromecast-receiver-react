import React, {PropTypes} from 'react'
import classNames from 'classnames'

import Control from '../Control'
import Time from '../Time'
import SeekBar from '../SeekBar'

import styles from './index.css'
import { formatSeconds } from '../helpers'

const ControlBar = ({
    actions = {},
    cast = {},
    isPlaying = true,
    progress = {},
    volume = 0,
    tracks = [],
    audioTrackIdx = 0,
    fullscreen = false,
    isLive = false,
    isLiveVisible = false,
    isReplay = false,
    canplay = false,
    seekAllowed = true,
    preview = null
}) =>

<div className={ styles.root }>


    <SeekBar
        isLive={ isLive }
        isReplay={ isReplay }
        progress={ progress }
        actions={ actions }
        seekAllowed={ seekAllowed }
        preview={ preview }
    />


    <div className={ styles.controls }>
        {
            !isPlaying &&
                <Control
                disabled={ !canplay }
                action={ actions.play }
                customClass={ styles.control }
                icon="play" />
        }
        {
            isPlaying &&
                <Control
                action={ actions.pause }
                disabled={ !canplay }
                customClass={ styles.control }
                icon="pause" />
        }

        <Control
            action={ seekAllowed ? actions.startOver : () => {} }
            customClass={ classNames(styles.control, {
                [styles.noStartover]: !seekAllowed
            })}
            tooltip={{
                text: (seekAllowed ? 'Retour au début' : 'Retour au début non disponible sur cette chaîne'),
                id: 'startover',
                place: 'top'
            }}
            icon="startover" />


        <Time
            start={ formatSeconds(progress.seekProgress) }
            remaining={ formatSeconds(progress.fluxDuration - progress.seekProgress) }
            end={ formatSeconds(progress.fluxDuration) } />

        {
            isLive && !isLiveVisible &&
            <div className={ styles.live }>LIVE</div>
        }

        <div className={ styles.floatRight }>
            <Control
                customClass={ styles.control }
                action={ actions.toggleFullScreen }
                icon={fullscreen ? 'fullscreenBack' : 'fullscreen'} />
        </div>
    </div>

</div>

ControlBar.propTypes = {
    actions: PropTypes.object,
    isPlaying: PropTypes.bool,
    progress: PropTypes.object,
    volume: PropTypes.number,
    tracks: PropTypes.array,
    audioTrackIdx: PropTypes.number,
    fullscreen: PropTypes.bool,
    isLive: PropTypes.bool,
    isLiveVisible: PropTypes.bool,
    isReplay: PropTypes.bool,
    isHotReplay: PropTypes.bool,
    canplay: PropTypes.bool,
    seekAllowed: PropTypes.bool,
    preview: PropTypes.object
}


export default ControlBar

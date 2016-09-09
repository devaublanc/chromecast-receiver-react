import React, { Component } from 'react';

import Splash from '../Splash';
import Loader from '../Loader';
import Footer from '../Footer';
import ControlBar from '../ControlBar';

import consts from '../consts'

import styles from './index.css';

/* global dashjs, cast */
const PROTOCOL = "urn:x-cast:org.dashif.dashjs";
const APPLICATION_TITLE = "Molotov.tv";

class Player extends Component {

    player = null
    video = null
    receiver = null
    mediaManeger = null
    messageBus = null

    state = {
        splash: true,
        loading: false,

        asset: {
            url: '',
            token: '',
            assetId: '',
            assetType: null,
            urlParams: {},
            startAt: 0,
            endAt: 0,
            tracks: []
        },

        broadcast: {
            broadcastId: 0,
            title: '',
            channelId: 0,
            channelLogo: '',
            isLive: false,
            csa: null,
            isBookmarked: false,
            isLiked: false,
            channelPoster: null
        },

        // times
        mpdPublishTime: null,
        liveProgress: 0,
        liveDuration: 0,
        seekProgress: 0,
        watchingTime: 0,
        fluxDuration: 0,
        inactivity: 0,
        delay: 0,
    };


    /**
     * Load the stream
     * @param  {object} media cast
     * @return {undefined}
     */
    loadFlux = (contentId, asset) => {
        console.log('contentId', contentId);
        console.log('asset', asset);
        const protectionConfig = this.getProtectionConfig(asset.token);
        this.loader(true);
        this.video.setMediaKeys(null).then(() => {
            this.player.setProtectionData(protectionConfig);
            this.player.attachSource(contentId);
            this.player.play();
        });
    }

    /**
     * Set the loader status
     * @param  {bool} status of loader
     * @return {undefined}
     */
    loader = (status) => {
        this.setState({
            loading: status
        });
    }

    /************************************************************************************************************************************************
    /************************************************************************************************************************************************
    ***************************************************************** GETTERS ***********************************************************************
    /************************************************************************************************************************************************
    /************************************************************************************************************************************************/


    /**
    * Return protection object mandatory for DRM stream
    * @param {string} token drm token
    * @return {object} protection
    */
    getProtectionConfig = (token) => {
        return {
            'com.widevine.alpha': {
                drmtoday: true,
                serverURL: 'https://lic.drmtoday.com/license-proxy-widevine/cenc/',
                httpRequestHeaders: {
                    'x-dt-auth-token': token
                }
            }
        }
    }

    /**
     * get channel logo
     * @param  {number} channelId of channel
     * @param  {string} type of src
     * @return {string} url
     */
    getLogo = (channelId, type) => {
        if (!channelId) return;
        const assoc = {
            logo: `${consts.urlLogo}${channelId}.png`,
            poster: `${consts.urlPoster}${channelId}.png`
        }
        return assoc[type];
    }

    /**
     * Check if the broadcast is live
     * @return {bool} Is Live
     */
    isLive = () => {
        return this.state.broadcast.isLive;
    }

    /**
     * Check if the broadcast is replay
     * @return {bool} Is Replay
     */
    isReplay = () => {
        return !this.isLive();
    }

    /**
     * Check if live progress is visible
     * @return {undefined}
     */
    isLiveVisible = () => {
        // return (this.getLiveProgress() >= this.state.seekProgress + 30) && this.state.isLiveRunning;
        return false;
    }

    /************************************************************************************************************************************************
    /************************************************************************************************************************************************
    ************************************************************* HANDLE EVENTS ********************************************************************
    /************************************************************************************************************************************************
    /************************************************************************************************************************************************/

    /************************************************************/
    /********************** Video EVENTS ************************/
    /************************************************************/

    /**
     * On player dash fire event STREAM_INITIALIZED
     * @return {undefined}
     */
    handleStreamInitialized = () => {
        this.setState({
            splash: false
        });
    }

    handleCanplay = () => {
        this.loader(false);
    }

    /**
     * On player dash fire event BUFFER_EMPTY
     * @return {undefined}
     */
    handleBufferEmpty = () => {
        this.loader(true);
    }

    /**
     * On player dash fire event BUFFER_LOADED
     * @return {undefined}
     */
    handleBufferLoaded = () => {
        this.loader(false);
    }

    /************************************************************/
    /********************** MediaManager EVENTS *****************/
    /************************************************************/

    /**
     * On Media manager receive a media
     * @return {undefined}
     */
    onMediaManagerLoad = (e) => {
        const media = e.data.media;
        const {
            asset,
            broadcast,
        } = media.metadata

        this.setState({
            asset,
            broadcast
        });

        this.loadFlux(media.contentId, asset);
    }


    /**
     * On Media manager receive a message
     * @return {undefined}
     */
    onDashMessage = (e) => {
        const message = e.message;
        console.debug('Message received', JSON.stringify(message));
    }

    /************************************************************************************************************************************************
    /************************************************************************************************************************************************
    ********************************************************** COMPONENT LIFECYCLE ******************************************************************
    /************************************************************************************************************************************************
    /************************************************************************************************************************************************/

    shouldComponentUpdate(nextProps, nextState) {
        return !nextState.splash
    }

    componentDidMount() {

        this.video = this.refs['video'];


        /////////// INIT CAST ///////////

        // init receiver
        this.receiver = cast.receiver.CastReceiverManager.getInstance();
        const appConfig = new cast.receiver.CastReceiverManager.Config();
        appConfig.statusText = APPLICATION_TITLE;
        this.messageBus = this.receiver.getCastMessageBus(PROTOCOL);

        // attach mediaManager
        this.mediaManager = new cast.receiver.MediaManager(this.video);
        this.mediaManager.setMediaElement(this.video);
        this.mediaManager.onLoad = this.onMediaManagerLoad;


        ///////// INIT DASH.JS /////////

        // init player
        this.player = dashjs.MediaPlayer().create();
        this.player.initialize();
        this.player.attachView(this.video);
        this.player.attachVideoContainer(this.refs['container']);


        ///////// BIND EVENTS /////////
        this.player.on(
            dashjs.MediaPlayer.events.CAN_PLAY,
            this.handleCanplay
        );

        this.player.on(
            dashjs.MediaPlayer.events.STREAM_INITIALIZED,
            this.handleStreamInitialized
        );

        this.player.on(
            dashjs.MediaPlayer.events.BUFFER_EMPTY,
            this.handleBufferEmpty
        );

        this.player.on(
            dashjs.MediaPlayer.events.BUFFER_LOADED,
            this.handleBufferLoaded
        );

        // Cast events
        this.receiver.onSenderDisconnected = (event) => {
            if ((this.receiver.getSenders().length === 0)
            && (event.reason === cast.receiver.system.DisconnectReason.REQUESTED_BY_SENDER)) {
                window.close();
            }
        };

        // Video events
        this.receiver.start(appConfig);
    }

    render() {

        const {
            loading,
            splash,
            asset,
            broadcast,
            liveDuration,
            liveProgress,
            isProgressLiveVisible,
            seekProgress,
            fluxDuration
        } = this.state;

        const {
            getLogo
        } = this;


        return (

            <div className={ styles.root }>
                <div className={ styles.player } ref="container">
                    { splash && <Splash /> }
                    { loading && <Loader /> }
                    <video
                        ref="video"
                        autoPlay="false"
                        className={ styles.video } />

                    <Footer
                        visible={ true }
                        logo={ getLogo(broadcast.channelId, 'logo') }
                        channelId={ broadcast.channelId }
                        csa={ broadcast.csa }
                        title={ broadcast.title }
                        isLiked={ broadcast.isLiked }
                        isBookmarked={ broadcast.isBookmarked }>
                        <ControlBar
                            tracks={ asset.tracks }
                            progress={{
                                liveDuration,
                                liveProgress,
                                isProgressLiveVisible,
                                seekProgress,
                                fluxDuration
                            }}
                            canplay={ true }
                            isLive={ this.isLive() }
                            isLiveVisible={ this.isLiveVisible() }
                            isReplay={ this.isReplay() }
                            isPlaying={ true } />
                    </Footer>
                </div>
            </div>

        );
    }
}

export default Player;

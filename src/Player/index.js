import React, { Component } from 'react';

import Splash from '../Splash';
import Loader from '../Loader';

import './index.css';

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
        loading: false
    };


    /**
     * Load the stream
     * @param  {object} media cast
     * @return {undefined}
     */
    loadFlux = ({ contentId, metadata }) => {
        const protectionConfig = this.getProtectionConfig(metadata.asset.token);
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
        this.loadFlux(e.data.media);
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
            splash
        } = this.state;


        return (
            <div className="Player" ref="container">
                { splash && <Splash /> }
                { loading && <Loader /> }
                <video ref="video" autoPlay="false" className="Player-video"></video>
            </div>
        );
    }
}

export default Player;

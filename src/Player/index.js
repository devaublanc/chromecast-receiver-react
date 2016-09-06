import React, { Component } from 'react';
import './index.css';

/* global dashjs, cast */
const PROTOCOL = "urn:x-cast:org.dashif.dashjs";

class Player extends Component {

    player = null
    video = null
    receiver = null
    mediaManeger = null
    messageBus = null

    getProtectionConfig = (token) =>{
        return {
            'com.widevine.alpha': {
                drmtoday: true,
                serverURL: 'https://lic.drmtoday.com/license-proxy-widevine/cenc/',
                httpRequestHeaders: {
                    'x-dt-auth-token': token
                }
            }
        };
    }

    loadStream = ({ contentId, metadata }) => {
        const protectionConfig = this.getProtectionConfig(metadata.asset.token);

        this.video.setMediaKeys(null).then(() => {
            console.log('============================= set protection and play');
            this.player.setProtectionData(protectionConfig);
            this.player.attachSource(contentId);
            console.log('=============================this.player.play();');
            this.player.play();
        });



    }

    onLoad = (e) => {
        console.log('onLoad++++++++++++++++++++++++++++', e);
        this.loadStream(e.data.media);

        // this.video.addEventListener("timeupdate", onVideoTime.bind(this));
        // this.video.addEventListener("durationchange", onVideoDuration.bind(this));
        // this.video.addEventListener("ended", onVideoEnded.bind(this));
    }

    onDashMessage = (e) => {
        var message = e.message;
        console.debug('Message received', JSON.stringify(message));
    }

    componentDidMount() {

        this.video = this.refs['video'];


        /////////// INIT CAST ///////////

        // init receiver
        this.receiver = cast.receiver.CastReceiverManager.getInstance();
        const appConfig = new cast.receiver.CastReceiverManager.Config();
        appConfig.statusText = "DashJS Molotov Receiver";
        this.messageBus = this.receiver.getCastMessageBus(PROTOCOL);

        // attach mediaManager
        this.mediaManager = new cast.receiver.MediaManager(this.video);
        this.mediaManager.setMediaElement(this.video);
        this.mediaManager.onLoad = this.onLoad;


        ///////// INIT DASH.JS /////////

        // init player
        this.player = dashjs.MediaPlayer().create();
        this.player.initialize();
        this.player.attachView(this.video);
        this.player.attachVideoContainer(this.refs['container']);


        ///////// BIND EVENTS /////////

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
        return (
            <div className="Player" ref="container">
                <video ref="video" autoPlay="false" className="Player-video"></video>
            </div>
        );
    }
}

export default Player;

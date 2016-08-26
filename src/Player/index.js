import React, { Component } from 'react';
import './index.css';

/* global MediaPlayer, Dash, cast */
const PROTOCOL = "urn:x-cast:org.dashif.dashjs";

class Player extends Component {

    player = null
    video = null
    receiver = null
    mediaManeger = null
    messageBus = null

    loadStream = (newMedia) => {
        this.media = newMedia;

        console.log("this.media", this.media);
        let url, assetId, token;

        // url = media.contentId;
        // assetId = media.customData.drmParams.assetId;
        // token = media.customData.drmParams.token;
        // HACK: remove this shit

        url = 'http://v.cdn3.live.mlflux.net/public/france3/france3.isml/france3.mpd';
        assetId = 'france3';
        token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE0NzIyMjMxMjksImp0aSI6IjU3YzA1Nzk5Mjg5ODQiLCJjcnQiOiJbe1wiYXNzZXRJZFwiOlwiZnJhbmNlM1wiLFwic3RvcmVMaWNlbnNlXCI6ZmFsc2UsXCJwcm9maWxlXCI6e1wicmVudGFsXCI6e1wiYWJzb2x1dGVFeHBpcmF0aW9uXCI6XCIyMDE2LTA4LTI2VDIwOjUyOjA5KzAyOjAwXCIsXCJwbGF5RHVyYXRpb25cIjoxNDQwMDAwMH19LFwibWVzc2FnZVwiOlwiTGljZW5zZSBncmFudGVkXCIsXCJvdXRwdXRQcm90ZWN0aW9uXCI6e1wiZGlnaXRhbFwiOnRydWUsXCJhbmFsb2d1ZVwiOnRydWUsXCJlbmZvcmNlXCI6ZmFsc2V9fV0iLCJvcHREYXRhIjoie1widXNlcklkXCI6XCI4ZjNhYjAwNWEzN2Y0N2U5MDNhYWJmYTFjOWFlMTRlNDdkZTQxM2I3XCIsXCJzZXNzaW9uSWRcIjpcImF2MDVmNG9ia2ZiMW5ubXE0bmxnXCIsXCJtZXJjaGFudFwiOlwibW9sb3RvdlwifSJ9.npP-tnRutAA9qxgj3Wzk1TlIy8nLE5nsom4T-mltmlCy_3dSfyqUW7TnMta9yaTaRJs-mkSVTru1QOrsh-BZ3A';

        const dataVideo = {
            name: assetId,
            url: url,
            browsers: '',
            protData: {
                'com.widevine.alpha': {
                    drmtoday: true,
                    serverURL: 'https://lic.drmtoday.com/license-proxy-widevine/cenc/',
                    httpRequestHeaders: {
                        'x-dt-auth-token': token
                    }
                }
            }
        }

        this.player.attachSource(dataVideo.url, null, dataVideo.protData);

    }

    onLoad = (e) => {
        console.log('onLoad====');
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
        this.player = new MediaPlayer(new Dash.di.DashContext());
        this.player.startup();
        this.player.setAutoPlay(true);
        this.player.attachView(this.video);


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
            <div className="Player">
                <video ref="video" autoPlay className="Player-video"></video>
            </div>
        );
    }
}

export default Player;

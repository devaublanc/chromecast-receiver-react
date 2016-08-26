import React, { Component } from 'react';
import logo from './logo.svg';
import './index.css';

const PROTOCOL = "urn:x-cast:org.dashif.dashjs";
const CHANNEL = "org.dashif.dashjs.channel";

class Player extends Component {

    init = (messageBus, mediaManager) => {
        console.log('init', messageBus, mediaManager);
        console.log("init====");
        this.messageBus = messageBus;
        this.messageBus.addEventListener(cast.receiver.CastMessageBus.EventType.MESSAGE, this.onDashMessage);

        this.mediaManager = mediaManager;
        this.mediaManager.setMediaElement(this.video);
        this.mediaManager.onLoad = this.onLoad;

        this.player = new MediaPlayer(new Dash.di.DashContext());

        this.player.startup();
        this.player.setAutoPlay(true);
        this.player.attachView(this.video);
    }

    startVideo = (newMedia) => {
        this.media = newMedia;

        console.log("this.media", this.media);
        var url, assetId, token, urlParams;

        // url = media.contentId;
        // assetId = media.customData.drmParams.assetId;
        // token = media.customData.drmParams.token;
        // HACK: remove this shit

        url = 'http://v.cdn3.live.mlflux.net/public/france3/france3.isml/france3.mpd';
        assetId = 'france3';
        token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE0NzIyMTc3NDMsImp0aSI6IjU3YzA0MjhmZDYwMjEiLCJjcnQiOiJbe1wiYXNzZXRJZFwiOlwiZnJhbmNlM1wiLFwic3RvcmVMaWNlbnNlXCI6ZmFsc2UsXCJwcm9maWxlXCI6e1wicmVudGFsXCI6e1wiYWJzb2x1dGVFeHBpcmF0aW9uXCI6XCIyMDE2LTA4LTI2VDE5OjIyOjIzKzAyOjAwXCIsXCJwbGF5RHVyYXRpb25cIjoxNDQwMDAwMH19LFwibWVzc2FnZVwiOlwiTGljZW5zZSBncmFudGVkXCIsXCJvdXRwdXRQcm90ZWN0aW9uXCI6e1wiZGlnaXRhbFwiOnRydWUsXCJhbmFsb2d1ZVwiOnRydWUsXCJlbmZvcmNlXCI6ZmFsc2V9fV0iLCJvcHREYXRhIjoie1widXNlcklkXCI6XCI4ZjNhYjAwNWEzN2Y0N2U5MDNhYWJmYTFjOWFlMTRlNDdkZTQxM2I3XCIsXCJzZXNzaW9uSWRcIjpcImF2MDQ1M29ia2ZiMW5ubXE0aXNnXCIsXCJtZXJjaGFudFwiOlwibW9sb3RvdlwifSJ9._s_yFUIH2CWFXaW3n_05ulc2FgQEeKqIQPAL5q4p--JK4xmyvP3uISVI6NNCVfyHF8ZkzAcFmdcSXBucnIb9lA';

        var dataVideo = {
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


        console.log("dataVideo.protData", dataVideo.protData);


        // this.video.addEventListener('stalled', onVideoBuffering.bind(this), false);
        // this.video.addEventListener('waiting', onVideoBuffering.bind(this), false);
        // this.video.addEventListener('playing', onVideoPlaying.bind(this),  false);

        this.player.attachSource(dataVideo.url, null, dataVideo.protData);

        // $scope.showSplashScreen = false;
        // $scope.showSpinner = true;
        // $scope.showVideo = true;
        // $scope.showStats = false;
        //
        // // setTimeout(update, graphUpdateInterval);
        //
        // $scope.$apply();
    }


    onLoad = (e) => {
        console.log('onLoad====');
        this.startVideo(e.data.media);

        // this.video.addEventListener("timeupdate", onVideoTime.bind(this));
        // this.video.addEventListener("durationchange", onVideoDuration.bind(this));
        // this.video.addEventListener("ended", onVideoEnded.bind(this));
    }

    onDashMessage = (e) => {
        var message = e.message;
        console.debug('Message received', JSON.stringify(message));
    }

    componentDidMount() {
        console.log('componentDidMount');


        this.video = this.refs['video'];


        const receiver = cast.receiver.CastReceiverManager.getInstance();
        const appConfig = new cast.receiver.CastReceiverManager.Config();
        appConfig.statusText = "DashJS Molotov Receiver";


        const messageBus = receiver.getCastMessageBus(PROTOCOL);
        const mediaManager = new cast.receiver.MediaManager(this.video);


        this.init(messageBus, mediaManager);

        receiver.onSenderDisconnected = function(event) {
            if ((receiver.getSenders().length === 0) && (event.reason === cast.receiver.system.DisconnectReason.REQUESTED_BY_SENDER)) {
                window.close();
            }
        };

        receiver.start(appConfig);
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Chromecast Receiver React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <video ref="video" autoPlay></video>
            </div>
        );
    }
}

export default Player;

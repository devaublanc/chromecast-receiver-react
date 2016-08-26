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

    loadStream = (newMedia) => {
        this.media = newMedia;

        console.log("this.media", this.media);
        let url, assetId, token;

        // url = media.contentId;
        // assetId = media.customData.drmParams.assetId;
        // token = media.customData.drmParams.token;
        // HACK: remove this shit

        url = 'http://v.cdn3.live.mlflux.net/public/franceo/franceo.isml/franceo.mpd';
        token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE0NzIyMjYwOTQsImp0aSI6IjU3YzA2MzJlOTRhNTEiLCJjcnQiOiJbe1wiYXNzZXRJZFwiOlwiZnJhbmNlb1wiLFwic3RvcmVMaWNlbnNlXCI6ZmFsc2UsXCJwcm9maWxlXCI6e1wicmVudGFsXCI6e1wiYWJzb2x1dGVFeHBpcmF0aW9uXCI6XCIyMDE2LTA4LTI2VDIxOjQxOjM0KzAyOjAwXCIsXCJwbGF5RHVyYXRpb25cIjoxNDQwMDAwMH19LFwibWVzc2FnZVwiOlwiTGljZW5zZSBncmFudGVkXCIsXCJvdXRwdXRQcm90ZWN0aW9uXCI6e1wiZGlnaXRhbFwiOnRydWUsXCJhbmFsb2d1ZVwiOnRydWUsXCJlbmZvcmNlXCI6ZmFsc2V9fV0iLCJvcHREYXRhIjoie1widXNlcklkXCI6XCI4ZjNhYjAwNWEzN2Y0N2U5MDNhYWJmYTFjOWFlMTRlNDdkZTQxM2I3XCIsXCJzZXNzaW9uSWRcIjpcImF2MDY2YTBia2ZiMW5ubXE0cjQwXCIsXCJtZXJjaGFudFwiOlwibW9sb3RvdlwifSJ9.IFpkgphCHE8V9eoed1Vcj8q5kgBZij-MiDY7g4rV0Jf5QmwediqZWFcOn0-mbDeL3GipD9sWIFQ1yhlbOXZaiA';


        const protData = {
            'com.widevine.alpha': {
                drmtoday: true,
                serverURL: 'https://lic.drmtoday.com/license-proxy-widevine/cenc/',
                httpRequestHeaders: {
                    'x-dt-auth-token': token
                }
            },
            'com.microsoft.playready': {
                drmtoday: true,
                serverURL: 'https://lic.drmtoday.com/license-proxy-headerauth/drmtoday/RightsManager.asmx',
                httpRequestHeaders: {
                    'x-dt-auth-token': token
                }
            }
        }

        this.video.setMediaKeys(null).then(() => {
            console.log('============================= set protection and play');
            this.player.setProtectionData(protData);
            this.player.attachSource(url);
            console.log('=============================this.player.play();');
            this.player.play();
        });



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

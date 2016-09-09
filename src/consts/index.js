export default {
    apiBasePath: 'https://fapi.molotov.tv',
    urlPoster: 'http://images.molotov.tv/data/mobile/channels-splash-4/poster-',
    urlLogo: 'http://images.molotov.tv/data/mobile/channels-web-player/channel-',
    urlCdnDecision: 'http://hopx.cedexis.com/zones/1/customers/18559/apps/2/decision',
    version: '1.5.0',
    replayType: {
        replay_official: 1,
        replay_molotov: 2,
        future: 3,
        live: 4,
        hot_replay: 5
    },
    liveDelay: 30,
    stableBufferTime: 30,
    bandwidthSafetyFactor: 0.9,
    enableBufferOccupancyABR: true,
    fastSwitchEnable: false,
    errors: {
        download: 'Error while downloading (open console for more details)',
        key_session: 'Error DRM (open console for more details)',
        user: 'Oops... une erreur est survenue'
    }
}

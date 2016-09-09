export const diffSeconds = (min, max) => {
    const start = new Date(min),
        end = new Date(max),
        diff = start.getTime() - end.getTime();

    return max === 0 ? 0 : Math.round(Math.abs(diff / 1000));
}

export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const secondes = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

    return `${hours}:${minutes}:${secondes}`;
}

export const formatSeconds = (secs) => {

    let hours = Math.floor(secs / 3600);
    let minutes = Math.floor((secs - (hours * 3600)) / 60);
    let seconds = secs - (hours * 3600) - (minutes * 60);

    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${hours}:${minutes}:${seconds}`
}

export const getPercent = (value, total) => {
    return `${((value / total) * 100)}%`;
};

export const requestFullScreen = (container) => {
    if (container.requestFullscreen) {
        container.requestFullscreen();
    }
    else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
    }
    else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
    }
}

export const isLive = (start, end) => {
    const startAt = new Date(start);
    const endAt = new Date(end);
    const now = new Date();

    return (now >= startAt && now <= endAt);

}

export const getQueryString = (field, url) => {
    var href = url ? url : window.location.href;
    var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
    var string = reg.exec(href);
    return string ? string[1] : 0;
}


export const getParameterByName = (name, url) => {
    if (!url) url = window.location.href;

    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export const exitFullScreen = () => {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
    else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

export const isDocumentInFullScreenMode = () => {
    return ((document.fullscreenElement && document.fullscreenElement !== null) ||
      document.mozFullScreen || document.webkitIsFullScreen);
}

export const queryString = () => {
    let queryString = {};
    let query = window.location.search.substring(1);
    let vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=');
        if (typeof queryString[pair[0]] === 'undefined') {
            queryString[pair[0]] = decodeURIComponent(pair[1]);
        }
        else if (typeof queryString[pair[0]] === 'string') {
            let arr = [ queryString[pair[0]],decodeURIComponent(pair[1]) ];
            queryString[pair[0]] = arr;
        }
        else {
            queryString[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }
    return queryString;
}

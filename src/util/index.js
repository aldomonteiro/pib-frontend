
export const setfbAsyncInit = async () => {
    window.fbAsyncInit = function () {
        window.FB.init({
            appId: process.env.REACT_APP_FACEBOOK_APP_ID,
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v3.1'
        });
        window.fbApiInit = true;
    };

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/pt_BR/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}

export const fbEnsureInit = (callback) => {
    if (!window.fbApiInit) {
        setTimeout(function () { fbEnsureInit(callback); }, 50);
    } else {
        if (callback) {
            callback();
        }
    }
}

export const fbLoadPages = accessToken => {
    return new Promise(async (resolve) => {
        window.FB.api(`/me/accounts?access_token=${accessToken}`, (response) => {
            resolve(response);
        });
    });
}

export const fbRequestPagePicture = (page) => {
    return new Promise(async (resolve, reject) => {
        window.FB.api(`/${page.id}/picture`, { type: 'small', redirect: '0' }, (response) => {
            if (!response || response.error) reject();
            let pagePicture = {
                id: page.id,
                name: page.name,
                pictureUrl: response.data.url
            }
            resolve(pagePicture);
        });
    });
}

export const fbGetLoginStatus = async () => {
    if (window.FB) {
        return new Promise(async (resolve) => {
            window.FB.getLoginStatus(response => {
                resolve(response);
            })
        });
    }
}

export const fbLogout = () => {
    return new Promise(async (resolve) => {
        window.FB.logout(response => {
            resolve(response);
        })
    });
}

export const choices_kinds = () => {
    return [
        { id: 'tradicional', name: 'Tradicional' },
        { id: 'especial', name: 'Especial' },
        { id: 'doce', name: 'Doce' },
    ];
}

export const choices_sizes = () => {
    return [
        { id: 'mini', name: 'Mini', order: 1 },
        { id: 'pequena', name: 'Pequena', order: 2 },
        { id: 'media', name: 'Média', order: 3 },
        { id: 'grande', name: 'Grande', order: 4 },
        { id: 'gigante', name: 'Gigante', order: 5 }
    ];
}

const degreesToRadians = degrees => degrees * Math.PI / 180;

export const distanceBetweenCoordinates = (lat1, lon1, lat2, lon2) => {
    var earthRadiusKm = 6371;

    var dLat = degreesToRadians(lat2 - lat1);
    var dLon = degreesToRadians(lon2 - lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadiusKm * c;
}

export const onlyHour = date => new Intl.DateTimeFormat('pt-BR').format(date);

export const ORDERSTATUS_PENDING = 0;
export const ORDERSTATUS_CONFIRMED = 1;
export const ORDERSTATUS_VIEWED = 2;
export const ORDERSTATUS_ACCEPTED = 3;
export const ORDERSTATUS_PRINTED = 4;
export const ORDERSTATUS_DELIVERED = 5;
export const ORDERSTATUS_REJECTED = 8;
export const ORDERSTATUS_CANCELLED = 9;

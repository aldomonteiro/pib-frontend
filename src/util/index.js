
export const setfbAsyncInit = () => {
    window.fbAsyncInit = function () {
        window.FB.init({
            appId: '267537643995936',
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

export const choices_kinds = () => {
    return [
        { id: 'tradicional', name: 'Tradicional' },
        { id: 'especial', name: 'Especial' },
        { id: 'doce', name: 'Doce' },
    ];
}

export const choices_sizes = () => {
    return [
        { id: 'mini', name: 'Mini' },
        { id: 'pequena', name: 'Pequena' },
        { id: 'media', name: 'Média' },
        { id: 'grande', name: 'Grande' },
        { id: 'gigante', name: 'Gigante' },
    ];
}


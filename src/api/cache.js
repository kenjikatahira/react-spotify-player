import axios from 'axios'
import Cache from 'js-cache'

export default () => {
    const cacheable = true,
        cache = new Cache();

    axios.interceptors.request.use(request => {
        const blacklist = [
            'https://api.spotify.com/v1/me/player/currently-playing'
        ]

        if (request.method === 'get' && cacheable) {
            let url = request.url;

            const _cached = cache.get(url);

            if (_cached && !blacklist.includes(url)) {
                _cached.__fromCache = true;

                // console.log(`"${url}" served from cache`);

                request.data = _cached;

                // Set the request adapter to send the cached response and prevent the request from actually running
                request.adapter = () => {
                    return Promise.resolve({
                        data: _cached,
                        status: request.status,
                        statusText: request.statusText,
                        headers: request.headers,
                        config: request,
                        request: request
                    });
                };
            }
        }

        return request;

    }, error => Promise.reject(error));

    axios.interceptors.response.use(response => {

        const isCacheable = !response.config.params || (response.config.params && response.config.params.__cache !== false);

        if (cacheable && isCacheable) {
            let url = response.config.url;

            if (response.config.method === 'get') {
                cache.set(url, response.data);
            } else {
                cache.del(response.config.url);
                const uri = url.replace(response.config.http.api.base_url, ''),
                    parentUri = /(.*)\/([a-z0-9\-]+)\/?$/ig.exec(uri);

                if (parentUri)
                    cache.del(`${response.config.http.api.base_url}${parentUri[1]}`);
                const urls = Object.keys(cache.debug());

                for (const _url of urls) {
                    if (_url.match(/^[^?]+/)[0] === response.config.url)
                        cache.del(_url);
                }
            }
        }

        return response;
    }, error => Promise.reject(error));
}

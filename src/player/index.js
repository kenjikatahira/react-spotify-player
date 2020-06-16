import axios from 'axios';
import { getSession }  from '../utils';
import delay from 'delay';

class Player {
    constructor() {
        console.log(`player - v0.1`);
        this.device_id = null;
        this.commands = {
            play : {
                method : 'put',
                url : 'https://api.spotify.com/v1/me/player/play'
            },
            pause : {
                method : 'put',
                url : 'https://api.spotify.com/v1/me/player/pause'
            },
            next : {
                method : 'post',
                url : 'https://api.spotify.com/v1/me/player/next'
            },
            previous : {
                method : 'post',
                url : 'https://api.spotify.com/v1/me/player/previous'
            },
            volume : {
                method : 'put',
                url : 'https://api.spotify.com/v1/me/player/volume',
                params : {
                    volume_percent : 0
                }
            }
        }
    }



    static next(update) {
        const spotify = new this();
        spotify.run('next');
        update();
        return spotify;
    }

    static previous(update) {
        const spotify = new this();
        spotify.run('previous');
        update();
        return spotify;
    }

    static pause(update) {
        const spotify = new this();
        spotify.run('pause');
        update();
        return spotify;
    }

    static play(update) {
        const spotify = new this();
        spotify.run('play');
        update();
        return spotify;
    }

    run(action) {
        let config = this.commands[action];
        Object.assign( config, {
            headers : {
                'content-type' : 'application/json',
                'authorization' : `${getSession().token_type} ${getSession().access_token}`
            }
        });
        axios(config);
    }

    static async init(config) {
        console.log('INIT_',config);

        const spotify = new this();

        await delay(1000);

        const player = new window.Spotify.Player({
            playerInstance: new window.Spotify.Player({ name: "..." }),
            name: 'Kenjicas Player',
            getOAuthToken: callback => {
                callback(getSession().access_token);
            },
            volume: 0.5
        });

        player.connect().then(success => success && console.log('The Web Playback SDK successfully connected to Spotify!'));

        player.addListener('ready', ({ device_id }) => {
            console.log('REAADYYYYYY');
            console.log('Device ID', device_id);

            this.device_id = device_id;

            fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
                method: 'PUT',
                body: JSON.stringify({ uris: [config.uri] }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getSession().access_token}`
                }
            });
        });

        return spotify;
    }
}

export default Player;

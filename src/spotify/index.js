import { getSession } from '../utils';

let _device;
/*
* Inicia a instancia do spotify
* @function init
*/
export const init = async ({currentTrack,setDeviceId}) => {
    console.log('____init___');
    const player = new window.Spotify.Player({
        playerInstance: new window.Spotify.Player({ name: 'Kenjicas Player_' }),
        name: 'Kenjicas Player',
        getOAuthToken: callback => callback(getSession().access_token),
        volume: 0.5
    });
    player.addListener('ready', ({device_id}) => {
        window.localStorage.setItem('device_id', device_id);
        console.log('Ready - Device ID', device_id);
    });

    // update status - action
    player.connect().then(() => {
        player.addListener('player_state_changed', ({ position,duration,track_window: { current_track } }) => {
            // getStatus({ position,duration,current_track })
        });
    })

    return player;
}

const Musixmatch = require("musixmatch");

const config = {
    apikey: 'd16756853f45d514d790b880d2131da9',
    baseURL: 'https://api.musixmatch.com/ws/1.1/',
    corsURL: 'http://localhost:3000/',
    format: 'json',
    options: {
        headers : {
            'Access-Control-Allow-Origin' : '*'
        }
    }
}

const msx = Musixmatch(config)

msx.chartArtists({ country: 'us', page: 1, page_size: 3 }).then(function (data) {
    console.log(data.artist_list)
}).catch(function (err) {
    console.log(err.stack)
})

export default function() {
    msx.chartArtists({ country: 'us', page: 1, page_size: 3 }).then(function (data) {
        console.log(data.artist_list)
    }).catch(function (err) {
        console.log(err.stack)
    })
}

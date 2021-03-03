import WaveSurfer from 'wavesurfer.js';


import { Base } from './base'
import { getLastUrlPath } from '../utils/url'
import { IMAGE_FOLDER, IMAGE_FOLDER_BLOG } from '../config'
export class Sound extends Base{

    constructor(router) {
        super(
            router, 
            'sound',
            `http://ee.testeando.website/index.php/sound?slug=${getLastUrlPath()}`,
            true,
            'sound'
        )
    }

    show() {
        this.src = document.querySelector('#audio').getAttribute('src')
        this.button = document.querySelector('#audio-button')


        this.wavesurfer = WaveSurfer.create({
            container: '#audio',
            waveColor: '#B087FF',
            progressColor: 'purple',
            barWidth: 3,
            barHeight: 1, // the height of the wave
            barGap: null
        });

        const $time = document.querySelector('#current-time')
        
        this.wavesurfer.on('audioprocess', (sec) => {
            console.log(timeFormat(sec))
            $time.innerHTML = timeFormat(sec)

        })

        this.wavesurfer.load(document.querySelector('#audio').getAttribute('src'))

        this.button.onclick = this.wavesurfer.playPause.bind(this.wavesurfer)

        
    }

    mapData(data) {
        data.images = data.images.map(image => ({
            ...image,
            col_id_11: image.col_id_11
                .replace('{filedir_8}', IMAGE_FOLDER)
                .replace('{filedir_6}', IMAGE_FOLDER_BLOG),
            
        }))

        return {
            ...data,
            audio: data.audio
                .replace('{filedir_8}', IMAGE_FOLDER)
                .replace('{filedir_6}', IMAGE_FOLDER_BLOG),
        }
    }

    destroy() {

    }
}

function timeFormat(duration)
{   
    // Hours, minutes and seconds
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}
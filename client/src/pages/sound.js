import WaveSurfer from 'wavesurfer.js';
import moment from 'moment'

import { Base } from './base'
import { getLastUrlPath } from '../utils/url'
import { IMAGE_FOLDER, IMAGE_FOLDER_BLOG } from '../config'
export class Sound extends Base{

    constructor(router) {
        super(
            router, 
            'sound',
            `//res-extensa.com/index.php/sound?slug=${getLastUrlPath()}`,
            true,
            'sound'
        )
    }

    show() {
        this.src = document.querySelector('#audio').getAttribute('src')
        this.button = document.querySelector('.audio-button')
        this.buttonPlay = document.querySelector('#button-play')
        this.buttonPause = document.querySelector('#button-pause')

        
        this.buttonPause.style.display = "none"
        

        this.wavesurfer = WaveSurfer.create({
            container: '#audio',
            waveColor: '#B087FF',
            progressColor: 'purple',
            barWidth: 3,
            barHeight: 1,
            barGap: null,
            responsive: true,
        });

        const $time = document.querySelector('#current-time')
        
        this.wavesurfer.on('audioprocess', (sec) => {
            $time.innerHTML = timeFormat(sec)
        })

        this.wavesurfer.on('pause', (sec) => {
            this.buttonPause.style.display = "none"
            this.buttonPlay.style.display = "block"
        })

        this.wavesurfer.on('play', (sec) => {
            this.buttonPause.style.display = "block"
            this.buttonPlay.style.display = "none"
        })

        this.wavesurfer.load(document.querySelector('#audio').getAttribute('src'))

        this.button.onclick = this.wavesurfer.playPause.bind(this.wavesurfer)

        
    }
    
    
    mapData(data) {
        data.images = data.images.map(image => ({
            ...image,
            col_id_1: image.col_id_1
                .replace('{filedir_5}', IMAGE_FOLDER)
                .replace('{filedir_6}', IMAGE_FOLDER_BLOG),
            
        }))

        return {
            ...data,
            date: moment(data.date, 'X').format('L'),
            audio: data.audio
                .replace('{filedir_5}', IMAGE_FOLDER)
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
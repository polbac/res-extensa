import Navigo from 'navigo';
import 'babel-polyfill';

import { Random } from './pages/random'
import { Chronological } from './pages/chronological'
import { Extracts } from './pages/extracts'
import { About } from './pages/about'
import { Image } from './pages/image'
import { Sound } from './pages/sound'
import { Video } from './pages/video'
import { Text } from './pages/text'

import { createNavigation } from './components/nav/nav'
import { createSearch } from './components/nav/search'


const EventEmitter = require('events')
global.eventEmitter = new EventEmitter()

require('./styles/main.css')

fetch('https://res-extensa.com/index.php/site')
  .then(res => res.text())
  .then(res => {
    var st = document.createElement("style");                        // Create a <p> node
    st.innerHTML = res
    document.querySelector("body").appendChild(st)
  })

const router = new Navigo(null, false);

let page = null;

const gotoPage = Section => {
  if (page) {
    page.destroy()
  }

  page = new Section(router)
}

window.onload = () => {
  router.on('/chronological', function () {
      gotoPage(Chronological)
    })
  router.on('/extracts', function () {
      gotoPage(Extracts)
    })
  router.on('/about', function () {
      gotoPage(About)
    })
  router.on('/text/*', function () {
      gotoPage(Text)
    })
  router.on('/sound/*', function () {
      console.log('so')
      gotoPage(Sound)
    })
  router.on('/video/*', function () {
      gotoPage(Video)
    })
  router.on('/image/*', function () {
      gotoPage(Image)
    })

  router.on(function (a) {
      gotoPage(Random)
    })  
  
  router.resolve()
    

  createNavigation(router)
  createSearch(router)
  
}

window.onresize = () => {
  if (page.resize) {
    page.resize()
  }
}


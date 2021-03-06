import Navigo from 'navigo';
import 'babel-polyfill';

import { Random } from './pages/random'
import { Chronological } from './pages/chronological'
import { Extracts } from './pages/extracts'
import { Landing } from './pages/landing'
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

const router = new Navigo(null, false);

let page = null;

const gotoPage = Section => {
  if (page) {
    page.destroy()
  }

  page = new Section(router)
}

window.onload = () => {
  router
    .on('/random', function () {
      gotoPage(Random)
    })
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
      gotoPage(Landing)
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
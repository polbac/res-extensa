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

window.page = null;

const gotoPage = Section => {
  if (window.page) {
    window.page.destroy()
  }

  window.page = new Section(router)
}

window.onload = () => {
  router.on('/chronological', function () {
      gotoPage(Chronological)
      window.currentPage = 'Chronological'
    })
  router.on('/extracts', function () {
      gotoPage(Extracts)
      window.currentPage = 'Extracts'
    })
  router.on('/about', function () {
      gotoPage(About)
      window.currentPage = 'About'
    })
  router.on('/text/*', function () {
      gotoPage(Text)
      window.currentPage = 'Text'
    })
  router.on('/sound/*', function () {
      gotoPage(Sound)
      window.currentPage = 'Sound'
    })
  router.on('/video/*', function () {
      gotoPage(Video)
      window.currentPage = 'Video'
    })
  router.on('/image/*', function () {
      gotoPage(Image)
      window.currentPage = 'Image'
    })

  router.on(function () {
      gotoPage(Random)
      window.currentPage = 'Random'
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


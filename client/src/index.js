import Navigo from 'navigo';
import { Random } from './pages/random'
import { Chronological } from './pages/chronological'
import { Extracts } from './pages/extracts'
import { Landing } from './pages/landing'
import { About } from './pages/about'

import { createNavigation } from './components/nav'
require('./styles/main.css')

const router = new Navigo('http://localhost:3000/', false);

let page = null;

const gotoPage = Section => {
  if (page) {
    page.destroy()
  }

  page = new Section()
}

router
  .on('/', function () {
    gotoPage(Landing)
  })  
  .on('random', function () {
    gotoPage(Random)
  })
  .on('chronological', function () {
    gotoPage(Chronological)
  })
  .on('extracts', function () {
    gotoPage(Extracts)
  })
  .on('about', function () {
    gotoPage(About)
  })
  .on('text/:slug', function () {
    
  })
  .on('video/:slug', function () {
    
  })
  .on('image/:slug', function () {
    
  })
  .resolve();

  createNavigation(router)
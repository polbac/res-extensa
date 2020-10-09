import Navigo from 'navigo';
import landing from './pages/landing';
const router = new Navigo('http://localhost:3000/', true);

function start() {
  landing.show();
}

start()
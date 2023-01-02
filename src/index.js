import button from './components/button';
import pageHome from './pages/home';
import pageChats from './pages/chats';
import page404 from './pages/404';
import Router from './utils/router.js';
import './reset.css';
import './variables.css';
import './styles.css';

const router = new Router({
    home: pageHome(),
    chats: pageChats(),
    404: page404,
});
router.init();

import PageSignIn from './pages/sign-in';
import PageSignUp from './pages/sign-up';
import PageChats from './pages/chats';
import PageAccount from './pages/account';
import PageLogout from './pages/logout';
import Page404 from './pages/404';
import Page500 from './pages/500';
import Router from './utils/router';
import './variables.css';
import './reset.css';
import './styles.css';

const router = new Router({
    logout: new PageLogout(),
    'sign-in': new PageSignIn(),
    'sign-up': new PageSignUp(),
    messenger: new PageChats(),
    settings: new PageAccount(),
    'page-404': new Page404(),
    'page-500': new Page500(),
});
router.init();
export default router;

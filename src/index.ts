import PageHome from './pages/home';
import PageChats from './pages/chats';
import PageAccount from './pages/account';
import Page404 from './pages/404';
import Page500 from './pages/500';
import Router from './utils/router';
import './variables.css';
import './reset.css';
import './styles.css';

const router = new Router({
    signIn: new PageHome({ type: 'signIn' }),
    signUp: new PageHome({ type: 'signUp' }),
    chats: new PageChats(),
    account: new PageAccount(),
    page404: new Page404(),
    page500: new Page500(),
});
router.init();
export default router;

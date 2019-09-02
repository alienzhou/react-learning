// cSpell: ignore Alienact
import Alienact from 'alienact';
import {
    Router,
    Route,
    history
} from 'alienact-router';
import './index.less';
import Todo from '@src/pages/todo';
import Simple from '@src/pages/simple';
import Home from '@src/pages/home';

const BASE = process.env.NODE_ENV === 'production' ? '/react-learning/example' : '';

class App extends Alienact.Component {
    render() {
        return (
            <section>
                <h1 className="top-title">Alienact</h1>
                <h2 className="top-sub-title">a set of tiny react tech-stack implements</h2>
                <Router history={history}>
                    <Route path={BASE + '/todo'} component={Todo} />
                    <Route path={BASE + '/simple'} component={Simple} />
                    <Route path={BASE + '/'} component={Home} />
                </Router>
            </section>
        );
    }
}

Alienact.render(<App />, document.getElementById('root'));

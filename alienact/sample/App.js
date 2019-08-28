// cSpell: ignore Alienact
import Alienact from 'alienact';
import './index.less';

function switchByUrl() {
    if (window.location.pathname === '/todo') {
        import('@src/pages/todo').then(mod => {
            const TodoApp = mod.default;
            Alienact.render(<TodoApp />, document.getElementById('root'));
        });
    }
    else {
        import('@src/pages/simple').then(mod => {
            const SimpleApp = mod.default;
            Alienact.render(<SimpleApp />, document.getElementById('root'));
        });
    }
}

switchByUrl();

import dva from 'dva';
import './index.css';
import { useRouterHistory } from 'dva/router';
import { createHashHistory } from 'history';

const app = dva({
    history: useRouterHistory(createHashHistory)({ queryKey: false }),
});

app.model(require("./models/collection"));
app.model(require("./models/login"));
app.model(require("./models/register"));
app.model(require("./models/user"));

app.router(require('./router'));
app.start('#root');

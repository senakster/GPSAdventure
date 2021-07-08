import { createBrowserHistory } from 'history';
import config from '_config';

export const history = createBrowserHistory({ basename: config.basename });
import Reacttron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
import reacttronSaga from 'reactotron-redux-saga';

if (process.env.NODE_ENV === 'development') {
  const tron = Reacttron.configure()
    .use(reactotronRedux())
    .use(reacttronSaga())
    .connect();

  tron.clear();

  console.tron = tron;
}

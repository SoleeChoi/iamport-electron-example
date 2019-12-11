// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import type { HashHistory } from 'history';

export default function createRootReducer(history: HashHistory) {
  return combineReducers<{}, *>({
    router: connectRouter(history)
  });
}

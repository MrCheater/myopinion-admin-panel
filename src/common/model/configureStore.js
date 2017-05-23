import { createStore, applyMiddleware, bindActionCreators, compose } from 'redux';
import thunk from 'redux-thunk'
import { reducer }  from './reducer';

export function configureStore(initialState, thunkExtraArguments) {
    return createStore(reducer, initialState, compose(
        applyMiddleware(
            thunk.withExtraArgument(thunkExtraArguments)
        ),
        (global.window && window.devToolsExtension) ? window.devToolsExtension() : f => f
    ));
}
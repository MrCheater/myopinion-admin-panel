import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '../common/model/configureStore';
import cookies from 'cookies-js';
import { config } from '../common/model/config';
import Axios from 'axios';
import { browserHistory } from 'react-router';
import { getRoutes } from '../common/controller/getRoutes';

export class AdminPanelClient {
    static getAccessToken() {
        return cookies.get('access_token');
    };

    static getAxios() {
        const axios = Axios.create({
            baseURL : config.externalUrl,
        });
        axios.interceptors.request.use(function (config) {
            config.headers = {
                Authorization : 'Bearer ' + AdminPanelClient.getAccessToken()
            };
            return config;
        });
        return axios;
    }

    static getThunkExtraArguments() {
        return {
            axios : AdminPanelClient.getAxios()
        };
    }

    static main(initialState) {
        const store = configureStore(
            initialState,
            AdminPanelClient.getThunkExtraArguments()
        );

        ReactDOM.render((
            <Provider store = {store}>
                {getRoutes(browserHistory, '/admin-panel')}
            </Provider>
        ), document.getElementById('app'));
    }
}







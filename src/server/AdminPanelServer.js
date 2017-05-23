import http from 'http';
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import { Cookies } from './Cookies';
import Axios from 'axios';
import { config } from '../common/model/config'
import { configureStore } from '../common/model/configureStore';
import { Provider } from 'react-redux';
import { RouterContext, match } from 'react-router';
import { getRoutes } from '../common/controller/getRoutes';

export class AdminPanelServer {
    static getFullHtml(reactMarkup, state) {
        return html`
            <html>
            <head>
                <link rel="icon" href="https://myopinion.io/static/favicon.ico" />
                <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
                <meta charset="utf-8">
                <link rel="stylesheet" type="text/css" href="/adminPanelStyle.css"> </link>
            </head>
            <body>
                <script type="text/javascript">
                    window.REDUX_STATE=${JSON.stringify(state)}
                </script>
                <div id = "app">
                    ${reactMarkup}
                </div>
                <script type="text/javascript" async src="/adminPanel.js"></script>
            </body>
        `;
    }

    static getCookies(req, res) {
        const cookies = new Cookies(req, res);
        return {
            get(key) {
                try {
                    return cookies.get(key);
                } catch (e) {}
            },
            set(key, value, options) {
                try {
                    return cookies.set(key, value, options);
                } catch (e) {}
            }
        };
    }

    static getAxios(req, res) {
        const cookies = AdminPanelServer.getCookies(req, res);

        const axios = Axios.create({
            baseURL : config.externalUrl
        });
        axios.interceptors.request.use(function (config) {
            config.headers = {
                Authorization : 'Bearer ' + cookies.get('access_token')
            };
            return config;
        });

        return axios
    }

    static handler(req, res) {
        const axios = AdminPanelServer.getAxios(req, res);

        const thunkExtraArguments = {
            axios
        };

        const store = configureStore(undefined, thunkExtraArguments);

        match({routes : getRoutes(), location : req.url }, (error, redirectLocation, renderProps) => {
            if (redirectLocation) {
                res.writeHead(302, {'Location': (req.socket.encrypted ? 'https://' : 'http://') + req.headers.host + redirectLocation.pathname + redirectLocation.search});
                res.end();
            }
            else if (error) {
                res.writeHead(500, {'Content-Type': 'text/html'});
                res.end(error.message);
            }
            else if (!renderProps) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end('Not found');
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/html',
                    'Cache-Control': 'no-cache'
                });
                const reactMarkup = ReactDOMServer.renderToStaticMarkup(
                    <Provider store = {store}>
                        <RouterContext {...renderProps} />
                    </Provider>
                );
                res.end(AdminPanelServer.getFullHtml(reactMarkup, store.getState()));
            }
        });
    }

    static server() {
        http.createServer(AdminPanelServer.handler).listen(3002);
    }
}
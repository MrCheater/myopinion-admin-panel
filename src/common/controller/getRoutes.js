import React from 'react';
import { Router, Route, Redirect, IndexRoute } from 'react-router';
import { PageIndex } from './PageIndex';
import { PageMetrics } from './PageMetrics';
import { App } from '../view/App';

export function getRoutes(history, baseUrl = '') {
    return (
        <Router history = {history}>
            <Route path = {baseUrl || '/'} component = {App}>
                <IndexRoute component = {PageIndex}/>
                <Route path = {baseUrl + '/metrics'} component = {PageMetrics}/>
                <Redirect from = '*' to = {baseUrl + '/'}/>
            </Route>
        </Router>
    );
}
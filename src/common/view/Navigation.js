import React from 'react';
import { Link } from 'react-router';
import styles from './Navigation.scss';

export class Navigation extends React.Component {
    render() {
        return (
            <div className = {styles['root']}>
                {[
                    {href : '/admin-panel/', text : 'Users'},
                    {href : '/admin-panel/metrics', text : 'Metrics'}
                ].map(({href, text}, index) => (
                    <Link
                        key = {index}
                        to = {href}
                        className = {styles['link']}
                        activeClassName = {styles['link'] + ' ' + styles['link--active']}
                    >
                        {text}
                    </Link>
                ))}
            </div>
        );
    }
}
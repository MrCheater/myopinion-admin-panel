import * as React from 'react';
import { elasticsearch } from '../../../../app/server/config';
import { UsersTable } from './UsersTable';
import styles from './Index.scss';

export class Index extends React.Component {
    componentDidMount() {
        this.props.actionCreators.getUsersList();
    }

    render() {
        const { users, usersSortType, actionCreators } = this.props;
        return (
            <div className = {styles['page']}>
                <div className = {styles['clear']}/>
                <div className = {styles['content']}>
                    <div>
                        Analytics: <br/>
                        <ul>
                            <li><a href={`http://${elasticsearch.kibanaHost}:5601/goto/c421147d2f9814181eb44f6585468e26`} target='_blank'>Events Log</a></li>
                            <li><a href={`http://${elasticsearch.kibanaHost}:5601/goto/7a8750f2aac0d96d4d6111db680008ce`} target='_blank'>Main Dashboard</a></li>
                            <li><a href={`http://${elasticsearch.kibanaHost}:5601/goto/8c1d8f1fe5f2efe902a60aa33d73b542`} target='_blank'>Client errors</a></li>
                        </ul>
                    </div>
                    <UsersTable
                        users = {users}
                        usersSortType = {usersSortType}
                        actionCreators = {actionCreators}
                    />
                </div>
            </div>
        );
    }
}
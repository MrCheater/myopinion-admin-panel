import * as React from 'react';
import { getSortedUsers } from '../model/utils/getSortedUsers';
import { ERole, ERoleToString } from '../model/enums/ERole';
import { ESortType } from '../model/enums/ESortType';
import styles from './UsersTable.scss';

export const UsersTable = ({ users, usersSortType, actionCreators }) => (
    <div className = {styles['table']}>
        <div className = {styles['tr']}>
            <div className = {styles['th']} onClick = {() => {
                actionCreators.updateUsersSortType(ESortType.BY_ID)
            }}>
                ID
            </div>
            <div className = {styles['th'] + ' ' + styles['th--primary-id']} onClick = {() => {
                actionCreators.updateUsersSortType(ESortType.BY_PRIMARY_ID)
            }}>
                PrimaryID
            </div>
            <div className = {styles['th']} onClick = {() => {
                actionCreators.updateUsersSortType(ESortType.BY_NAME)
            }}>
                Name
            </div>
            <div className = {styles['th']} onClick = {() => {
                actionCreators.updateUsersSortType(ESortType.BY_ROLE)
            }}>
                Role
            </div>
            <div className = {styles['th']} onClick = {() => {
                actionCreators.updateUsersSortType(ESortType.BY_GENDER)
            }}>
                Gender
            </div>
            <div className = {styles['th']}>
                Linked Accounts
            </div>
            <div className = {styles['th']} onClick = {() => {
                actionCreators.updateUsersSortType(ESortType.BY_CREATED_AT)
            }}>
                Created At
            </div>
            <div className = {styles['th']} onClick = {() => {
                actionCreators.updateUsersSortType(ESortType.BY_DISABLED)
            }}>
                Disabled
            </div>
            <div className = {styles['th']}>
                Poll created
            </div>
            <div className = {styles['th']}>
                Vote count
            </div>
            <div className = {styles['th']}>
                Danger zone
            </div>
        </div>
        {getSortedUsers(users, usersSortType).map(({_id, primaryId, profile, role, createdAt, linkedAccounts, disabled, pollCount, voteCount, deleted}, index) => (
            <div
                key = {index}
                className = {styles['tr']}
            >
                <div className = {styles['td']}>
                    {_id}
                </div>
                <div className = {styles['td'] + ' ' + styles['td--primary-id']}>
                    {primaryId}
                </div>
                <div className = {styles['td']}>
                    {profile.firstName + ' ' + profile.lastName}
                </div>
                <div className = {styles['td']}>
                    <select
                        onChange = {(e)=>{
                            actionCreators.updateUserRole(_id, e.target.value)
                        }}
                        value = {role}
                    >
                        {Object.keys(ERole).map((eRole, index) => (
                            <option
                                key = {index}
                                value = {ERoleToString(eRole)}
                                disabled = {eRole === ERole.ANON}
                            >
                                {ERoleToString(eRole)}
                            </option>
                        ))}
                    </select>
                </div>
                <div className = {styles['td']}>
                    {profile.gender}
                </div>
                <div className = {styles['td']}>
                    {linkedAccounts.map(({profileUrl, provider}, index)=>(
                        <div key = {index}>
                            <a href = {profileUrl}>
                                {provider}
                            </a>
                        </div>
                    ))}
                </div>
                <div className = {styles['td']}>
                    {new Date(createdAt).toLocaleString('en-US')}
                </div>
                <div className = {styles['td']}>
                    <select
                        onChange = {(e)=>{
                            actionCreators.updateUserDisabledStatus(_id, (e.target.value == 'true'))
                        }}
                        value = {(!!disabled).toString()}
                    >
                        <option value = 'true'>
                            true
                        </option>
                        <option value = 'false'>
                            false
                        </option>
                    </select>
                </div>
                <div className = {styles['td']}>
                    {pollCount}
                </div>
                <div className = {styles['td']}>
                    {voteCount}
                </div>
                <div className = {styles['td']}>
                    {(role == ERoleToString(ERole.ADMIN)) ? ('User is admin') : (
                        <button onClick = {() => {
                            actionCreators.deleteUser(_id);
                        }}>
                            Delete
                        </button>
                    )}
                </div>
            </div>
        ))}
    </div>
);
import { ESortType } from '../enums/ESortType';

export function getSortedUsers(users, sortType) {
    const sortedUsers = [...users];
    switch(sortType) {
        case ESortType.BY_ID:
            sortedUsers.sort((a, b) => {
                if(a._id > b._id) { return 1; }
                else if(a._id < b._id) { return -1; }
                else { return 0; }
            });
            break;
        case ESortType.BY_PRIMARY_ID:
            sortedUsers.sort((a, b) => {
                if(a.primaryId > b.primaryId) { return 1; }
                else if(a.primaryId < b.primaryId) { return -1; }
                else { return 0; }
            });
            break;
        case ESortType.BY_NAME:
            sortedUsers.sort((a, b) => {
                const aName = a.profile.firstName + ' ' + a.profile.lastName;
                const bName = b.profile.firstName + ' ' + b.profile.lastName;
                if(aName > bName) { return 1; }
                else if(aName < bName) { return -1; }
                else { return 0; }
            });
            break;
        case ESortType.BY_ROLE:
            sortedUsers.sort((a, b) => {
                if(a.role > b.role) { return 1; }
                else if(a.role < b.role) { return -1; }
                else { return 0; }
            });
            break;
        case ESortType.BY_GENDER:
            sortedUsers.sort((a, b) => {
                if(a.profile.gender > b.profile.gender) { return 1; }
                else if(a.profile.gender < b.profile.gender) { return -1; }
                else { return 0; }
            });
            break;
        case ESortType.BY_CREATED_AT:
            sortedUsers.sort((a, b) => {
                if(a.createdAt > b.createdAt) { return 1; }
                else if(a.createdAt < b.createdAt) { return -1; }
                else { return 0; }
            });
            break;
        case ESortType.BY_DISABLED:
            sortedUsers.sort((a, b) => {
                if(a.disabled > b.disabled) { return 1; }
                else if(a.disabled < b.disabled) { return -1; }
                else { return 0; }
            });
            break;
    }
    return sortedUsers;
}
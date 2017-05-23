import { EAction } from './enums/EAction';

export let actionCreators;
actionCreators = {
    globalErrorHandler(err) {
        if(process.env === 'production') {
            console.error(err);
        } else {
            throw err;
        }
    },
    updateUsersSortType(usersSortType) {
        return {
            type : EAction.UPDATE_USERS_SORT_TYPE,
            usersSortType
        };
    },
    getUsersListStart() {
        return {
            type : EAction.GET_USERS_LIST_START
        };
    },
    getUsersListComplete(users) {
        return {
            users,
            type : EAction.GET_USERS_LIST_COMPLETE
        };
    },
    getUsersListFail(err) {
        return {
            err,
            type : EAction.GET_USERS_LIST_FAIL
        };
    },
    getUsersList() {
        return (dispatch, getState, { axios }) => {
            dispatch(actionCreators.getUsersListStart());
            const request = axios.get('/api/users', {
                params: {
                    pollCount : 'yes',
                    voteCount : 'yes'
                }
            });
            request.then(
                (res) => dispatch(actionCreators.getUsersListComplete(res.data)),
                (err) => dispatch(actionCreators.getUsersListFail(err))
            ).catch(actionCreators.globalErrorHandler);
            return request;
        };
    },

    getMetricsBehaviorCohortsWeekStart() {
        return {
            type : EAction.GET_METRICS_BEHAVIOR_COHORTS_WEEK_START
        };
    },
    getMetricsBehaviorCohortsWeekComplete({view, vote, share}) {
        return {
            view,
            vote,
            share,
            type : EAction.GET_METRICS_BEHAVIOR_COHORTS_WEEK_COMPLETE
        };
    },
    getMetricsBehaviorCohortsWeekFail(err) {
        return {
            err,
            type : EAction.GET_METRICS_BEHAVIOR_COHORTS_WEEK_FAIL
        };
    },

    getMetricsBehaviorCohortsWeek(params) {
        return (dispatch, getState, { axios }) => {
            const state = getState();
            const intervalType = state.metrics.intervalType;
            const ignoreInternalIp = state.metrics.ignoreInternalIp;
            dispatch(actionCreators.getMetricsBehaviorCohortsWeekStart());
            const request = axios.get('/api/metrics/behavior-cohorts/week', { params : {
                intervalType,
                ignoreInternalIp,
                ...params
            }});
            request.then(
                (res) => dispatch(actionCreators.getMetricsBehaviorCohortsWeekComplete(res.data)),
                (err) => dispatch(actionCreators.getMetricsBehaviorCohortsWeekFail(err))
            ).catch(actionCreators.globalErrorHandler);
            return request;
        };
    },
    updateUserRoleStart(userId, role) {
        return {
            type : EAction.UPDATE_USER_ROLE_START,
            userId,
            role
        };
    },
    updateUserRoleComplete(userId, role) {
        return {
            type : EAction.UPDATE_USER_ROLE_COMPLETE,
            userId,
            role
        };
    },
    updateUserRoleFail(userId, role, err) {
        return {
            type : EAction.UPDATE_USER_ROLE_FAIL,
            userId,
            role,
            err
        };
    },
    updateUserRole(userId, role) {
        return (dispatch, getState, { axios }) => {
            dispatch(actionCreators.updateUserRoleStart(userId, role));
            const request = axios.post('/api/users/' + userId + '/roles', {
                role
            });
            request.then(
                () => dispatch(actionCreators.updateUserRoleComplete(userId, role)),
                (err) => dispatch(actionCreators.updateUserRoleFail(userId, role, err))
            ).catch(actionCreators.globalErrorHandler);
            return request;
        };
    },
    updateUserDisabledStatusStart(userId, disabled) {
        return {
            type : EAction.UPDATE_USER_DISABLE_STATUS_START,
            userId,
            disabled
        };
    },
    updateUserDisabledStatusComplete(userId, disabled) {
        return {
            type : EAction.UPDATE_USER_DISABLE_STATUS_COMPLETE,
            userId,
            disabled
        };
    },
    updateUserDisabledStatusFail(userId, disabled, err) {
        return {
            type : EAction.UPDATE_USER_DISABLE_STATUS_FAIL,
            userId,
            disabled,
            err
        };
    },
    updateUserDisabledStatus(userId, disabled) {
        return (dispatch, getState, { axios }) => {
            dispatch(actionCreators.updateUserDisabledStatusStart(userId, disabled));
            let request;
            if(disabled) {
                request = axios.put('/api/disabled-users/' + userId);
            } else {
                request = axios.delete('/api/disabled-users/' + userId);
            }
            request.then(
                () => dispatch(actionCreators.updateUserDisabledStatusComplete(userId, disabled)),
                (err) => dispatch(actionCreators.updateUserDisabledStatusFail(userId, disabled, err))
            ).catch(actionCreators.globalErrorHandler);
            return request;
        };
    },
    deleteUserStart(userId) {
        return {
            type: EAction.DELETE_USER_START,
            userId
        };
    },
    deleteUserComplete(userId) {
        return {
            type: EAction.DELETE_USER_COMPLETE,
            userId
        };
    },
    deleteUserFail(userId, err) {
        return {
            type: EAction.DELETE_USER_FAIL,
            userId,
            err
        };
    },
    deleteUser(userId) {
        return (dispatch, getState, { axios }) => {
            dispatch(actionCreators.deleteUserStart(userId));
            const request = axios.delete('/api/users/' + userId);
            request.then(
                () => dispatch(actionCreators.deleteUserComplete(userId)),
                (err) => dispatch(actionCreators.deleteUserFail(userId, err))
            ).catch(actionCreators.globalErrorHandler);
            return request;
        };
    },
    updateMetricsIntervalTypeStart(intervalType) {
        return {
            type: EAction.UPDATE_METRICS_INTERVAL_TYPE_START,
            intervalType
        };
    },
    updateMetricsIntervalTypeComplete(intervalType) {
        return {
            type: EAction.UPDATE_METRICS_INTERVAL_TYPE_COMPLETE,
            intervalType
        };
    },
    updateMetricsIntervalTypeFail(intervalType) {
        return {
            type: EAction.UPDATE_METRICS_INTERVAL_TYPE_FAIL,
            intervalType
        };
    },
    updateMetricsIntervalType(intervalType) {
        return (dispatch, getState) => {
            const state = getState();
            const prevMetricsIntervalType = state.metrics.intervalType;
            dispatch(actionCreators.updateMetricsIntervalTypeStart(intervalType));
            dispatch(actionCreators.getMetricsBehaviorCohortsWeek({
                intervalType
            })).then(
                () => dispatch(actionCreators.updateMetricsIntervalTypeComplete(intervalType)),
                () => dispatch(actionCreators.updateMetricsIntervalTypeFail(prevMetricsIntervalType))
            );
        };
    },
    updateChartSeriesType(chartSeriesType) {
        return {
            type: EAction.UPDATE_METRICS_CHART_SERIES_TYPE,
            chartSeriesType
        };
    },
    updateMetricsIgnoreInternalIpStart(ignoreInternalIp) {
        return {
            type: EAction.UPDATE_METRICS_IGNORE_INTERNAL_IP_START,
            ignoreInternalIp
        };
    },
    updateMetricsIgnoreInternalIpComplete(ignoreInternalIp) {
        return {
            type: EAction.UPDATE_METRICS_IGNORE_INTERNAL_IP_COMPLETE,
            ignoreInternalIp
        };
    },
    updateMetricsIgnoreInternalIpFail(ignoreInternalIp) {
        return {
            type: EAction.UPDATE_METRICS_IGNORE_INTERNAL_IP_FAIL,
            ignoreInternalIp
        };
    },
    updateMetricsIgnoreInternalIp(ignoreInternalIp) {
        return (dispatch, getState) => {
            const state = getState();
            const prevIgnoreInternalIp = state.metrics.ignoreInternalIp;
            dispatch(actionCreators.updateMetricsIgnoreInternalIpStart(ignoreInternalIp));
            dispatch(actionCreators.getMetricsBehaviorCohortsWeek({
                ignoreInternalIp
            })).then(
                () => dispatch(actionCreators.updateMetricsIgnoreInternalIpComplete(ignoreInternalIp)),
                () => dispatch(actionCreators.updateMetricsIgnoreInternalIpFail(prevIgnoreInternalIp))
            );
        };
    }
};


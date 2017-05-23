import { EAction } from './enums/EAction';
import { ESortType } from './enums/ESortType';
import { EIntervalType } from './enums/EIntervalType';
import { EChartSeriesType } from './enums/EChartSeriesType';

const initialState = {
    users : [],
    usersSortType : ESortType.BY_ID,
    metrics : {
        ignoreInternalIp : true,
        chartSeriesType : EChartSeriesType.FULL_STACKED_AREA,
        intervalType : EIntervalType.PER_DAY
    }
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case EAction.GET_USERS_LIST_COMPLETE: {
            return {
                ...state,
                users: action.users
            };
        } case EAction.UPDATE_USER_ROLE_COMPLETE: {
            const users = [...state.users];
            for (let i = users.length; i--;) {
                if (users[i]._id === action.userId) {
                    users[i] = {
                        ...users[i],
                        role: action.role
                    };
                    break;
                }
            }
            return {
                ...state,
                users
            };
        }
        case EAction.UPDATE_USER_DISABLE_STATUS_COMPLETE: {
            const users = [...state.users];
            for (let i = users.length; i--;) {
                if (users[i]._id === action.userId) {
                    users[i] = {
                        ...users[i],
                        disabled: action.disabled
                    };
                    break;
                }
            }
            return {
                ...state,
                users
            };
        }
        case EAction.DELETE_USER_COMPLETE: {
            const users = state.users.filter(
                ({_id}) => _id !== action.userId
            );
            return {
                ...state,
                users
            };
        }
        case EAction.UPDATE_USERS_SORT_TYPE: {
            return {
                ...state,
                usersSortType : action.usersSortType
            };
        }
        case EAction.GET_METRICS_BEHAVIOR_COHORTS_WEEK_COMPLETE: {
            return {
                ...state,
                metrics: {
                    ...state.metrics,
                    view : action.view,
                    vote : action.vote,
                    share : action.share,
                }
            };
        }
        case EAction.UPDATE_METRICS_INTERVAL_TYPE_START:
        case EAction.UPDATE_METRICS_INTERVAL_TYPE_COMPLETE:
        case EAction.UPDATE_METRICS_INTERVAL_TYPE_FAIL: {
            return {
                ...state,
                metrics: {
                    ...state.metrics,
                    intervalType : action.intervalType
                }
            };
        }
        case EAction.UPDATE_METRICS_CHART_SERIES_TYPE: {
            return {
                ...state,
                metrics: {
                    ...state.metrics,
                    chartSeriesType : action.chartSeriesType
                }
            };
        }
        case EAction.UPDATE_METRICS_IGNORE_INTERNAL_IP_COMPLETE:
        case EAction.UPDATE_METRICS_IGNORE_INTERNAL_IP_FAIL: {
            return {
                ...state,
                metrics: {
                    ...state.metrics,
                    ignoreInternalIp : action.ignoreInternalIp
                }
            };
        }
        default:
            return state
    }
}
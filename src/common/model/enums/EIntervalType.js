export const EIntervalType = {
    PER_DAY     : 'PER_DAY',
    PER_SESSION : 'PER_SESSION'
};

export function EIntervalTypeToString(type) {
    switch(type) {
        case EIntervalType.PER_DAY    : return 'per day';
        case EIntervalType.PER_SESSION: return 'per session';
    }
}
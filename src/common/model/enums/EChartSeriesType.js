export const EChartSeriesType = {
    AREA              : 'AREA',
    STACKED_AREA      : 'STACKED_AREA',
    FULL_STACKED_AREA : 'FULL_STACKED_AREA',
};

export function EChartSeriesTypeToString(type) {
    switch(type) {
        case EChartSeriesType.AREA              : return 'area';
        case EChartSeriesType.STACKED_AREA      : return 'stackedArea';
        case EChartSeriesType.FULL_STACKED_AREA : return 'fullStackedArea';
    }
}
import React from 'react';
import styles from './Metrics.scss';
import { EIntervalType, EIntervalTypeToString } from '../model/enums/EIntervalType';
import { EChartSeriesType, EChartSeriesTypeToString } from '../model/enums/EChartSeriesType';

export class Metrics extends React.Component {
    componentDidMount() {
        window.jQuery = window.$ = require('jquery');

        require('devextreme/dist/js/dx.all');

        if(!this.props.metrics.view || !this.props.metrics.share || !this.props.metrics.vote) {
            this.props.actionCreators.getMetricsBehaviorCohortsWeek();
        } else {
            this.renderMetrics();
        }
    }

    renderMetrics = () => {
        $("#metrics_view").dxChart({
            palette: "Bright",
            dataSource: this.props.metrics.view,
            commonSeriesSettings: {
                type: EChartSeriesTypeToString(this.props.metrics.chartSeriesType),
                argumentField: "date"
            },
            title: `Poll Views Count ${EIntervalTypeToString(this.props.metrics.intervalType)}`,
            series: [
                { valueField: "c0", name: "0" },
                { valueField: "c1", name: "1" },
                { valueField: "c3", name: "2-3" },
                { valueField: "c10", name: "4-10" },
                { valueField: "cMore", name: "10+" }
            ],
            tooltip: {
                enabled: true
            },
            argumentAxis: {
                valueMarginsEnabled: false
            },
            "export": {
                enabled: true
            },
            legend: {
                verticalAlignment: "bottom",
                horizontalAlignment: "center"
            }
        }).dxChart("instance");

        $("#metrics_vote").dxChart({
            palette: "Bright",
            dataSource: this.props.metrics.vote,
            commonSeriesSettings: {
                type: EChartSeriesTypeToString(this.props.metrics.chartSeriesType),
                argumentField: "date"
            },
            title: `Poll Votes Count ${EIntervalTypeToString(this.props.metrics.intervalType)}`,
            series: [
                { valueField: "c0", name: "0" },
                { valueField: "c1", name: "1" },
                { valueField: "c3", name: "2-3" },
                { valueField: "c10", name: "4-10" },
                { valueField: "cMore", name: "10+" }
            ],
            tooltip: {
                enabled: true
            },
            argumentAxis: {
                valueMarginsEnabled: false
            },
            "export": {
                enabled: true
            },
            legend: {
                verticalAlignment: "bottom",
                horizontalAlignment: "center"
            }
        }).dxChart("instance");


        $("#metrics_share").dxChart({
            palette: "Bright",
            dataSource: this.props.metrics.share,
            commonSeriesSettings: {
                type: EChartSeriesTypeToString(this.props.metrics.chartSeriesType),
                argumentField: "date"
            },
            title: `Poll Share Count ${EIntervalTypeToString(this.props.metrics.intervalType)}`,
            series: [
                { valueField: "c0", name: "0" },
                { valueField: "c1", name: "1" },
                { valueField: "c3", name: "2-3" },
                { valueField: "c10", name: "4-10" },
                { valueField: "cMore", name: "10+" }
            ],
            tooltip: {
                enabled: true
            },
            argumentAxis: {
                valueMarginsEnabled: false
            },
            "export": {
                enabled: true
            },
            legend: {
                verticalAlignment: "bottom",
                horizontalAlignment: "center"
            }
        }).dxChart("instance");
    };

    componentWillReceiveProps(nextProps) {
        if((nextProps.metrics !== this.props.metrics) &&
        nextProps.metrics.view && nextProps.metrics.share && nextProps.metrics.vote) {
            setTimeout(this.renderMetrics);
        }
    }

    updateMetricsIntervalType = (e) => {
        this.props.actionCreators.updateMetricsIntervalType(e.target.value);
    };

    updateChartSeriesType = (e) => {
        this.props.actionCreators.updateChartSeriesType(e.target.value);
    };

    updateMetricsIgnoreInternalIp = (e) => {
        this.props.actionCreators.updateMetricsIgnoreInternalIp(e.target.checked);
    };

    render() {
        return (
            <div className = {styles['root']}>
                <div className = {styles['controls']}>
                    <div className = {styles['control']}>
                        <div className = {styles['control__caption']}>
                            Interval Type
                        </div>
                        <select
                            value = {this.props.metrics.intervalType}
                            onChange = {this.updateMetricsIntervalType}
                        >
                            {Object.values(EIntervalType).map((value, index) => (
                                <option
                                    key = {index}
                                    value = {value}
                                >
                                    {EIntervalTypeToString(value)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className = {styles['control']}>
                        <div className = {styles['control__caption']}>
                            Chart Series Type
                        </div>
                        <select
                            value = {this.props.metrics.chartSeriesType}
                            onChange = {this.updateChartSeriesType}
                        >
                            {Object.values(EChartSeriesType).map((value, index) => (
                                <option
                                    key = {index}
                                    value = {value}
                                >
                                    {EChartSeriesTypeToString(value)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className = {styles['control']}>
                        <div className = {styles['control__caption']}>
                            Ignore Internal IP
                        </div>
                        <input
                            type = 'checkbox'
                            onChange = {this.updateMetricsIgnoreInternalIp}
                            checked = {this.props.metrics.ignoreInternalIp}
                        />
                    </div>
                </div>
                {this.props.metrics.view ? (
                    <div id = 'metrics_view'/>
                ) : null}
                {this.props.metrics.vote ? (
                    <div id = 'metrics_vote'/>
                ) : null}
                {this.props.metrics.share ? (
                    <div id = 'metrics_share'/>
                ) : null}
            </div>
        );
    }
}
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Metrics } from '../view/Metrics';
import { actionCreators } from '../model/actionCreators';

export function mapStateToProps(state) {
    return {
        metrics: state.metrics,
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        actionCreators : bindActionCreators(actionCreators, dispatch)
    }
}

export const PageMetrics = connect(mapStateToProps, mapDispatchToProps)(Metrics);
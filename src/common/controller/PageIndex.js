import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Index } from '../view/Index';
import { actionCreators } from '../model/actionCreators';

export function mapStateToProps(state) {
    return {
        users: state.users,
        usersSortType: state.usersSortType
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        actionCreators : bindActionCreators(actionCreators, dispatch)
    }
}

export const PageIndex = connect(mapStateToProps, mapDispatchToProps)(Index);
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dispatchActions as fuActions, mapToProps as fuMapToProps } from '../../api/fu/selector';
import { dispatchActions as positionsActions, mapToProps as positionsMapToProps } from '../../api/positions/selector';
import { dispatchActions as currencyActions, mapToProps as currencyMapToProps } from '../../api/currency/selector';
import Spinner from '../Spinner';
import Table from '../Table';
import CurrencyContainer from '../../api/currency/container';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { data: null };
        this.load = this.load.bind(this);
    }

    componentDidMount() {
        this.load();
        this.interval = global.setInterval(this.load, 10000);
    }

    // shouldComponentUpdate(nextProps, nextState) { // todo
    //     return !nextProps.fu.loading && !nextProps.positions.loading;
    // }

    componentWillUnmount() {
        global.clearInterval(this.interval);
    }

    load() {
        const { actions } = this.props;
        Promise.all([
            actions.fu.read(),
            actions.positions.read()
        ])
            .then((res) => {
                const [fu, positions] = res;
                const positionsData = positions.payload;
                const fuData = fu.payload;
                const tableData = positionsData.reduce((acc, next) => {
                    const { fuOriginId, data, id } = next;
                    const { currency } = data;
                    const currentFu = fuData.find(v => v.id === fuOriginId);
                    const { name } = currentFu;
                    return !name ? acc : acc.concat(Object.assign({}, currency, { name, id }));
                }, []);

                return Promise.all(tableData.map(val => actions.currency.readConvert({
                    to: 'USD',
                    from: val.ccy,
                    amount: val.notionalValue
                })))
                    .then((arr) => {
                        const responses = arr.map(v => v.payload);
                        const data = tableData.map((val) => {
                            const selected = responses.find(v => v.query.from === val.ccy);
                            val.rate = selected.info.quote;
                            val.calculated = selected.result;
                            return val;
                        });
                        this.setState(() => ({ data }));
                    });
            });
    }

    render() {
        const { data } = this.state;
        return (
            <div className="container">
                <div className="row center-xs">
                    <CurrencyContainer />
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        {data ? <Table data={data} /> : <Spinner />}
                    </div>
                </div>
            </div>
        );
    }
}

Main.propTypes = { // todo finish validation
    actions: PropTypes.shape({}).isRequired
};

const combinedMapTpProps = state => (
    {
        fu: fuMapToProps(state),
        positions: positionsMapToProps(state),
        currency: currencyMapToProps(state)
    }
);

const combinedDispatchActions = dispatch => ({
    actions: {
        fu: fuActions(dispatch),
        positions: positionsActions(dispatch),
        currency: currencyActions(dispatch)
    }
});

export default connect(combinedMapTpProps, combinedDispatchActions)(Main);

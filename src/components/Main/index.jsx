import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dispatchActions as fuActions, mapToProps as fuMapToProps } from '../../api/fu/selector';
import { dispatchActions as positionsActions, mapToProps as positionsMapToProps } from '../../api/positions/selector';
import { dispatchActions as currencyActions, mapToProps as currencyMapToProps } from '../../api/currency/selector';
import Spinner from '../Spinner';
import Table from '../Table';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
        // this.load = this.load.bind(this);
    }

    componentDidMount() {
        this.load();
        // this.interval = global.setInterval(this.load, 10000);
    }

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
                const rates = positions.payload.map(val => val.data.currency.ccy);
                // console.log('rates', rates);

                const tableData = positionsData.reduce((acc, next) => {
                    const { fuOriginId, data, id } = next;
                    const { currency } = data;
                    const currentFu = fuData.find(v => v.id === fuOriginId);
                    const { name } = currentFu;
                    if (!name) {
                        return acc;
                    }
                    return acc.concat(Object.assign({}, currency, { name, id }));
                }, []);


                // return {
                //     tableData,
                //     rates,
                // };
                // return {
                //     tableData,
                //     currencies
                // };
                actions.currency.read(rates);
                this.setState(() => ({ data: tableData }));
            });
    }

    render() {
        const { data } = this.state;
        return data ? <Table data={data} /> : <Spinner />;
    }
}

Main.propTypes = {
    // actions: PropTypes.shape({}).isRequired,
    // fu: PropTypes.shape({
    //     data: PropTypes.shape({
    //         entities: PropTypes.shape({
    //             // name: PropTypes.string.isRequired
    //         }).isRequired,
    //         result: PropTypes.arrayOf([]).isRequired
    //     })
    // }).isRequired
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

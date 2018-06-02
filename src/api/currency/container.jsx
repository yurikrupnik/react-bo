import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { mapToProps, dispatchActions } from './selector';

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                from: 'PHP',
                amount: '12',
                result: ''
            }
        };
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderCalculator = this.renderCalculator.bind(this);
    }

    componentDidMount() {
        const { render } = this.props;
        if (typeof render !== 'function') {
            this.props.readCurrencies().then(this.submit);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true; // todo
    }

    submit() {
        this.props.readConvert({
            to: 'USD',
            from: this.state.form.from,
            amount: this.state.form.amount
        })
            .then((res) => {
                this.setState((prevState) => {
                    return {
                        form: Object.assign({}, prevState.form, { result: res.payload.result })
                    };
                });
            });
    }

    handleChange(name) {
        return (event) => {
            event.persist();
            this.setState((prevState, prevProps) => {
                return {
                    form: Object.assign({}, prevState.form, { [name]: event.target.value })
                };
            }, this.submit);
        };
    }

    renderCalculator() {
        const { currencies } = this.props;
        const { form } = this.state;
        return (
            <div className="col-xs-12">
                <Card>
                    <CardContent>
                        <CardActions>
                            <div className="col-xs-6">
                                <TextField
                                    select
                                    label="Currency"
                                    value={form.from}
                                    onChange={this.handleChange('from')}
                                    SelectProps={{
                                        MenuProps: {},
                                    }}
                                    fullWidth
                                    name="from"
                                    margin="normal"
                                >
                                    {Object.values(currencies || {}).map(option => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.id}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="col-xs-6">
                                <TextField
                                    label="National Value"
                                    value={form.amount}
                                    fullWidth
                                    name="amount"
                                    onChange={this.handleChange('amount')}
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    margin="normal"
                                />
                            </div>
                        </CardActions>
                        <Typography color="textSecondary">
                            <span>Calculated Value (in USD)  </span>
                            <span>{form.result}</span>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }

    render() {
        const { render } = this.props;
        if (typeof render === 'function') {
            return render(this.props);
        }
        return this.renderCalculator();
    }
}

Container.defaultProps = {
    render: null
};

Container.propTypes = { // todo finish validation
    render: PropTypes.func
};


export default connect(mapToProps, dispatchActions)(Container);

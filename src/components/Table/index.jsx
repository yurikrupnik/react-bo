import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { CSVLink } from 'react-csv';

function FinancialTable(props) {
    const { data } = props;
    return (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Financial Unit Name</TableCell>
                        <TableCell numeric>Notional Value</TableCell>
                        <TableCell numeric>Rate</TableCell>
                        <TableCell>Currency</TableCell>
                        <TableCell numeric>Calculated Value (in USD)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(v => (
                        <TableRow key={v.id}>
                            <TableCell component="th" scope="row">
                                {v.name}
                            </TableCell>
                            <TableCell numeric>{v.notionalValue}</TableCell>
                            <TableCell numeric>{v.rate}</TableCell>
                            <TableCell>{v.ccy}</TableCell>
                            <TableCell>{v.calculated}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <CSVLink
                data={data}
                filename="my-file.csv"
            >
                <Button color="primary" >
                    Export to Excel
                </Button>
            </CSVLink>
        </Paper>
    );
}
FinancialTable.defaultProps = {
    data: []
};

FinancialTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        notionalValue: PropTypes.number.isRequired,
        rate: PropTypes.number.isRequired,
        ccy: PropTypes.string.isRequired,
        calculated: PropTypes.number.isRequired,
    }))
};

export default FinancialTable;

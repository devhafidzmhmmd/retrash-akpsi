import React from 'react';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip
} from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';

const products = [
    {
        name: 'Andi Saputra',
        address: 'RT 03 / RW 05, Jl. Melati No. 12',
        bill: 'Rp15.000',
        status: 'Paid',
    },
    {
        name: 'Rina Marlina',
        address: 'RT 04 / RW 02, Jl. Anggrek No. 8',
        bill: 'Rp15.000',
        status: 'Unpaid',
    },
    {
        name: 'Budi Hartono',
        address: 'RT 01 / RW 01, Jl. Cempaka No. 5',
        bill: 'Rp15.000',
        status: 'Paid',
    },
    {
        name: 'Siti Aminah',
        address: 'RT 02 / RW 06, Jl. Dahlia No. 14',
        bill: 'Rp15.000',
        status: 'Pending',
    },
    {
        name: 'Dedi Kurniawan',
        address: 'RT 05 / RW 03, Jl. Flamboyan No. 22',
        bill: 'Rp15.000',
        status: 'Paid',
    },
];


const ProductPerformance = () => {
    return (

        <DashboardCard title="Resident Payment Status">
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    NAME
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    ADDRESS
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    BILL
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    STATUS
                                </Typography>
                            </TableCell>
                            {/* <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    BILL
                                </Typography>
                            </TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.name}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {product.name}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box>
                                        <Typography
                                            color="textSecondary"
                                            sx={{
                                                fontSize: "13px",
                                            }}
                                        >
                                            {product.address}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={400}>
                                        {product.bill}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        sx={{
                                            px: "4px",
                                            backgroundColor: product.status === 'Paid' ? '#00c292' : '#fc4b6c',
                                            color: "#fff",
                                        }}
                                        size="small"
                                        label={product.status}
                                    ></Chip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
    );
};

export default ProductPerformance;

import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Box, Grid, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

export default function Dashboard(props) {
    const orderTableRows = props.newOrders.map((current) => {
        return(
        <TableRow key={current.id}>
            <TableCell>
                <Link className="link" href={route("dashboard.orders.show", current.id)}>
                    {`Замовлення #${current.id}`}
                </Link>
            </TableCell>
            <TableCell>
                {`${current.total} грн`}
            </TableCell>
        </TableRow>);
    });

    const clientsTableRows = props.newClients.map((current) => {
        return(
        <TableRow key={current.id}>
            <TableCell>
                <Link className="link" href={route("dashboard.clients.show", current.id)}>
                    {`${current.first_name} ${current.last_name}`}
                </Link>
            </TableCell>
            <TableCell>
                {current.phone}
            </TableCell>
            <TableCell>
                {current.email}
            </TableCell>
        </TableRow>);
    });

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Grid item xs={12} >
                <Box component={Paper}
                sx={{width: "100%", display: "flex", alignItems:"center", justifyContent:"space-between", boxShadow: 'none'}}>
                    <Typography variant="h2" sx={{fontSize: "48px"}}>
                        {`Вітаємо, ${props.auth.user.name}! Останні новини`}
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={5}>
                    <Box component={Paper}
                    className="main-content__item main-content__item--white">

                    <Typography variant="h3" sx={{fontSize: "36px", marginBottom: '16px'}}>
                        Останні замовлення
                    </Typography>

                    <TableContainer component={Paper} sx={{boxShadow: "none"}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Номер
                                    </TableCell>
                                    <TableCell>
                                        Загальна вартість
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orderTableRows}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </Box>
            </Grid>
            <Grid item xs={7}>
                    <Box component={Paper}
                    className="main-content__item main-content__item--white">

                    <Typography variant="h3" sx={{fontSize: "36px", marginBottom: '16px'}}>
                        Нові клієнти
                    </Typography>

                    <TableContainer component={Paper} sx={{boxShadow: "none"}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Ім'я
                                    </TableCell>
                                    <TableCell>
                                        Телефон
                                    </TableCell>
                                    <TableCell>
                                        Електрона адреса
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {clientsTableRows}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Grid>
        </AuthenticatedLayout>
    );
}

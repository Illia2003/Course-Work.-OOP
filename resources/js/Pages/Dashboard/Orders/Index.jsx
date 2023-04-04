import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/inertia-react";
import { Box, Button, Grid, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";

function Index ({orders}){
    const { delete: destroy } = useForm();

    const createTableRows = orders.map((current) => {
            return(
            <TableRow key={current.id}>
                <TableCell>
                    <Link className="link" href={route("dashboard.orders.show", current.id)}>
                        {`#${current.id}`}
                    </Link>
                </TableCell>
                <TableCell>
                    <Link className="link" href={route("dashboard.clients.show", current.client.id)}>
                        {`${current.client.first_name} ${current.client.last_name}`}
                    </Link>
                </TableCell>
                <TableCell>
                    {current.status.name}
                </TableCell>
                <TableCell>
                    {`${current.total} грн`}
                </TableCell>
                <TableCell>
                    <Link className="link" href={route("dashboard.orders.edit", current.id)}>
                        <Button className="btn btn--secondary">Редагувати</Button>
                    </Link>
                    <form onSubmit={() => destroy(route("dashboard.orders.destroy", current.id))} style={{marginLeft: "8px", display: "inline-block"}}>
                        <Button className="btn btn--secondary" type="submit">Видалити</Button>
                    </form>
                </TableCell>
            </TableRow>);
        });

        return(
            <Authenticated>
                <Grid item xs={12} >
                    <Box component={Paper}
                    className="main-content__item" 
                    sx={{width: "100%", display: "flex", alignItems:"center", justifyContent:"space-between"}}>
                        <Typography variant="h3" sx={{fontSize: "36px"}}>
                            Замовлення
                        </Typography>
                        <Link className="link" href={route("dashboard.orders.create")}>
                            <Button className="btn btn--main">Створити замовлення</Button>
                        </Link>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box component={Paper}
                    className="main-content__item main-content__item--white">
                    <TableContainer component={Paper} sx={{boxShadow: "none"}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Номер
                                    </TableCell>
                                    <TableCell>
                                        Клієнт
                                    </TableCell>
                                    <TableCell>
                                        Статус замовлення
                                    </TableCell>
                                    <TableCell>
                                        Загальна вартість
                                    </TableCell>
                                    <TableCell>
                                        Дії
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {createTableRows}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </Box>
                </Grid>
            </Authenticated>
        );
}

export default Index;
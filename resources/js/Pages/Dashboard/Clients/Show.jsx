import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/inertia-react";
import { Box, Button, Grid, Link, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import React from "react";

export default function Show({client}){

    const { delete:destroy } = useForm();

    const ordersTableRows = client.orders.map((current) => {
        let dateCreated = new Date(current.created_at);

        return (<TableRow>
            <TableCell>
                <Link href={route("dashboard.orders.show", current.id)}>
                    {`#${current.id}`}
                </Link>
            </TableCell>
            <TableCell>
                {`${current.total} грн`}
            </TableCell>
            <TableCell>
                {`${dateCreated.getDate()}-${dateCreated.getMonth()}-${dateCreated.getFullYear()}`}
            </TableCell>
        </TableRow>);
    });

   return(
            <Authenticated>
                <Grid item xs={12}>
                    <Box component={Paper} className="main-content__item" sx={{width: "100%", display: "flex", alignItems:"center", justifyContent:"flex-start"}}>
                        <Link className="link" href={route("dashboard.clients.index")}>
                            <Button className="btn btn--secondary" sx={{marginRight: "16px"}}>Повернутися</Button>
                        </Link>
                        <Typography variant="h3" sx={{fontSize: "36px"}}>
                            {`${client.first_name} ${client.last_name}`}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box component={Paper} className="main-content__item main-content__item--white">
                        <Typography variant="h5">Контакта інформація</Typography>
                        <TableContainer component={Paper} sx={{boxShadow: "none"}}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            Індентифікатор:
                                        </TableCell>
                                        <TableCell>
                                            {client.id}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Ім'я:
                                        </TableCell>
                                        <TableCell>
                                            {client.first_name}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Прізвище:
                                        </TableCell>
                                        <TableCell>
                                            {client.last_name}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Номер телефону:
                                        </TableCell>
                                        <TableCell>
                                            <Link href={`tel:${client.phone}`}>{client.phone}</Link>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Електрона адреса:
                                        </TableCell>
                                        <TableCell>
                                        <Link href={`mailto:${client.email}`}>{client.email}</Link>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box component="div" sx={{width: "100%", display: "flex", alignItems:"center", justifyContent:"flex-end", marginTop: "16px"}}>
                            <Link className="link" href={route("dashboard.clients.edit", client.id)}>
                                <Button className="btn btn--secondary">Редагувати</Button>
                            </Link>
                            <form onSubmit={() => destroy(route("dashboard.clients.delete", client.id))} style={{marginLeft: "8px", display: "inline-block"}}>
                                <Button className="btn btn--secondary" type="submit">Видалити</Button>
                            </form>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box component={Paper} className="main-content__item main-content__item--white">
                        <Typography variant="h5">Історія замовлень</Typography>
                        <TableContainer component={Paper} sx={{boxShadow: "none"}}>
                            <Table>
                                <TableBody>
                                    {ordersTableRows}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Grid>
            </Authenticated>
        );
}

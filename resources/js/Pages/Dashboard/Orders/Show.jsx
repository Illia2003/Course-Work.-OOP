import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/inertia-react";
import { Box, Button, Grid, Link, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableRow, Typography } from "@mui/material";
import React from "react";

export default function Show({order}){

    const { delete:destroy } = useForm();

    const orderItemsRows = order.products.map((current) => {
        return(
            <TableRow key={current.id}>
                <TableCell sx={{paddingLeft: "0px"}}>
                    {current.product.name}
                </TableCell>
                <TableCell>
                    {current.quantity}
                </TableCell>
                <TableCell sx={{paddingRight: "0px"}}>
                    {`${current.total} грн`}
                </TableCell>
            </TableRow>
        );
    });

    const orderMetaDataRows = order.order_meta.map((current) => {
        return(
            <TableRow key={current.id}>
                <TableCell>
                    {current.name}
                </TableCell>
                <TableCell>
                    {current.value}
                </TableCell>
            </TableRow>
        );
    });

    console.log(order);

   return(
            <Authenticated>
                <Grid item xs={12}>
                    <Box component={Paper} className="main-content__item" sx={{width: "100%", display: "flex", alignItems:"center", justifyContent:"flex-start"}}>
                        <Link className="link" href={route("dashboard.orders.index")}>
                            <Button className="btn btn--secondary" sx={{marginRight: "16px"}}>Повернутися</Button>
                        </Link>
                        <Typography variant="h3" sx={{fontSize: "36px"}}>
                            {`Замовлення: #${order.id}`}
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={6}>
                    <Box component={Paper} className="main-content__item main-content__item--white" sx={{width: "100%"}}>
                        <Box component="div">
                            <Typography variant="h4">
                                {`Позиції`}
                            </Typography>

                            <TableContainer component={Paper} sx={{boxShadow: "none"}}>
                                <Table>
                                    <TableBody>
                                        {orderItemsRows}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell sx={{paddingLeft: "0px"}}>
                                                <Typography variant="h4" sx={{fontSize: "24px"}}>
                                                    Загалом:
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                
                                            </TableCell>
                                            <TableCell sx={{paddingRight: "0px", width: "100%"}}>
                                                <Typography variant="h4" sx={{fontSize: "24px", textAlign: "left"}}>
                                                    {`${order.total} грн`}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                        </Box>

                        <Box component="div" sx={{width: "100%", display: "flex", alignItems:"center", justifyContent:"flex-end", marginTop: "16px"}}>
                            <Link className="link" href={route("dashboard.orders.edit", order.id)}>
                                <Button className="btn btn--secondary">Редагувати</Button>
                            </Link>
                            <form onSubmit={() => destroy(route("dashboard.orders.delete", order.id))} style={{marginLeft: "8px", display: "inline-block"}}>
                                <Button className="btn btn--secondary" type="submit">Видалити</Button>
                            </form>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={6}>
                    <Box component={Paper} className="main-content__item main-content__item--white" sx={{width: "100%"}}>
                        <Box component="div">
                            <Typography variant="h4">
                                Клієнт
                            </Typography>

                            <TableContainer component={Paper} sx={{boxShadow: "none"}}>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <Link href={route('dashboard.clients.show', order.client.id)}>
                                                    {`${order.client.first_name} ${order.client.last_name}`}
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Link href={`tel:${order.client.phone}`}>
                                                    {order.client.phone}
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Link href={`mailto:${order.client.email}`}>
                                                    {order.client.email}
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>

                        <Box component="div" sx={{marginTop: "24px"}}>
                            <Typography variant="h4">
                                Менеджер
                            </Typography>

                            <TableContainer component={Paper} sx={{boxShadow: "none"}}>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <Link href={route('dashboard.workers.show', order.user.id)}>
                                                    {order.user.name}
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Link href={`tel:${order.user.phone}`}>
                                                    {order.user.phone}
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Link href={`mailto:${order.user.email}`}>
                                                    {order.user.email}
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>

                        <Box component="div" sx={{marginTop: "24px"}}>
                            <Typography variant="h4">
                                Адреса доставки і додаткова інформація
                            </Typography>

                            <TableContainer component={Paper} sx={{boxShadow: "none"}}>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                Метод доставки
                                            </TableCell>
                                            <TableCell>
                                                {order.shipping_method.name}
                                            </TableCell>
                                        </TableRow>

                                        {orderMetaDataRows}

                                        <TableRow>
                                            <TableCell>
                                                Статус замовлення
                                            </TableCell>
                                            <TableCell>
                                                {order.status.name}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Box>
                </Grid>
            </Authenticated>
        );
}

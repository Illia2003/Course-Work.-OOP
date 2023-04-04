import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/inertia-react";
import { Box, Button, Grid, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";

function Index ({products}){
    const { delete: destroy } = useForm();

    const createTableRows = products.map((current) => {
            return(
            <TableRow key={current.id}>
                <TableCell>
                    {current.sku}
                </TableCell>
                <TableCell>
                    <Link className="link" href={route("dashboard.products.show", current.id)}>
                        {current.name}
                    </Link>
                </TableCell>
                <TableCell>
                    <img alt={current.name} src={current.thumbnail} width="150" height="150"/>     
                </TableCell>
                <TableCell>
                    {current.price}
                </TableCell>
                <TableCell>
                    {current.stock}
                </TableCell>
                <TableCell>
                    <Link className="link" href={route("dashboard.products.edit", current.id)}>
                        <Button className="btn btn--secondary">Редагувати</Button>
                    </Link>
                    <form onSubmit={() => destroy(route("dashboard.products.destroy", current.id))} style={{marginLeft: "8px", display: "inline-block"}}>
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
                            Товари
                        </Typography>
                        <Link className="link" href={route("dashboard.products.create")}>
                           <Button className="btn btn--main">Створити товар</Button>
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
                                        SKU
                                    </TableCell>
                                    <TableCell>
                                        Назва
                                    </TableCell>
                                    <TableCell>
                                        Зображення
                                    </TableCell>
                                    <TableCell>
                                        Ціна
                                    </TableCell>
                                    <TableCell>
                                        Кількість
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
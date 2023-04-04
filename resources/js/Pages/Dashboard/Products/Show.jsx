import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/inertia-react";
import { Box, Button, Grid, Link, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import React from "react";

export default function Show({product, metadata, category}){

    const { delete:destroy } = useForm();

    const metaDataRows = metadata.map((current) => {
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

   return(
            <Authenticated>
                <Grid item xs={12}>
                    <Box component={Paper} className="main-content__item" sx={{width: "100%", display: "flex", alignItems:"center", justifyContent:"flex-start"}}>
                        <Link className="link" href={route("dashboard.products.index")}>
                            <Button className="btn btn--secondary" sx={{marginRight: "16px"}}>Повернутися</Button>
                        </Link>
                        <Typography variant="h3" sx={{fontSize: "36px"}}>
                            {product.name}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box component={Paper} className="main-content__item main-content__item--white">
                        <Box component="div">
                            <Typography variant="h5" sx={{marginBottom: "12px"}}>{product.name}</Typography>
                            <Box>
                                {product.description}
                            </Box>
                            <TableContainer component={Paper} sx={{boxShadow: "none"}}>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                SKU:
                                            </TableCell>
                                            <TableCell>
                                                {product.sku}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                Ціна:
                                            </TableCell>
                                            <TableCell>
                                                {product.price}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                Кількість товару на складі:
                                            </TableCell>
                                            <TableCell>
                                                {product.stock}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                Категорія:
                                            </TableCell>
                                            <TableCell>
                                                {category.name}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                        <Box component="div" sx={{marginTop: "24px"}}>
                            <Typography variant="h5" sx={{marginBottom: "12px"}}>Додаткова інформація</Typography>
                            <TableContainer component={Paper} sx={{boxShadow: "none"}}>
                                <Table>
                                    <TableBody>
                                        {metaDataRows}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Box component="div" sx={{width: "100%", display: "flex", alignItems:"center", justifyContent:"flex-end", marginTop: "16px"}}>
                                <Link className="link" href={route("dashboard.products.edit", product.id)}>
                                    <Button className="btn btn--secondary">Редагувати</Button>
                                </Link>
                                <form onSubmit={() => destroy(route("dashboard.products.delete", product.id))} style={{marginLeft: "8px", display: "inline-block"}}>
                                    <Button className="btn btn--secondary" type="submit">Видалити</Button>
                                </form>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box component={Paper} className="main-content__item main-content__item--white">
                        <Typography variant="h5" sx={{marginBottom: "12px"}}>Зображення</Typography>
                        <Box component="div" sx={{marginBottom: "12px", minHeight: "200px"}}>
                            <img src={product.thumbnail} alt={product.name} style={{borderRadius: "8px"}}/>
                        </Box>
                    </Box>
                </Grid>
            </Authenticated>
        );
}

import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/inertia-react";
import { Box, Button, Grid, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";

function Index ({categories}){
    const { delete: destroy } = useForm();

    const createTableRows = categories.map((current) => {
            return(
            <TableRow key={current.id}>
                <TableCell>
                    {current.id}
                </TableCell>
                <TableCell>
                    {current.name}
                </TableCell>
                <TableCell>
                    <Link className="link" href={route("dashboard.categories.edit", current.id)}>
                        <Button className="btn btn--secondary">Редагувати</Button>
                    </Link>
                    <form onSubmit={() => destroy(route("dashboard.categories.destroy", current.id))} style={{marginLeft: "8px", display: "inline-block"}}>
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
                            Категорії
                        </Typography>
                        <Link className="link" href={route("dashboard.categories.create")}>
                           <Button className="btn btn--main">Створити категорії</Button>
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
                                        ID
                                    </TableCell>
                                    <TableCell>
                                        Назва
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
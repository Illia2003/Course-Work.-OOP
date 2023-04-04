import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/inertia-react";
import { Box, Button, Grid, Link, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import React from "react";

export default function Show({user, role}){

    const { delete:destroy } = useForm();

   return(
            <Authenticated>
                <Grid item xs={12}>
                    <Box component={Paper} className="main-content__item" sx={{width: "100%", display: "flex", alignItems:"center", justifyContent:"flex-start"}}>
                        <Link className="link" href={route("dashboard.workers.index")}>
                            <Button className="btn btn--secondary" sx={{marginRight: "16px"}}>Повернутися</Button>
                        </Link>
                        <Typography variant="h3" sx={{fontSize: "36px"}}>
                            {user.name}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box component={Paper} className="main-content__item main-content__item--white">
                        <Box component="div">
                            <Typography variant="h5" sx={{marginBottom: "12px"}}>Інформація про користувача</Typography>
                            <TableContainer component={Paper} sx={{boxShadow: "none"}}>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                ID:
                                            </TableCell>
                                            <TableCell>
                                                {user.id}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                Ім'я:
                                            </TableCell>
                                            <TableCell>
                                                {user.name}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                Електронна адреса:
                                            </TableCell>
                                            <TableCell>
                                                {user.email}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                Номер телефону:
                                            </TableCell>
                                            <TableCell>
                                                {user.phone}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                Роль:
                                            </TableCell>
                                            <TableCell>
                                                {role.name}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                        <Box component="div" sx={{width: "100%", display: "flex", alignItems:"center", justifyContent:"flex-end", marginTop: "16px"}}>
                            <Link className="link" href={route("dashboard.workers.edit", user.id)}>
                                <Button className="btn btn--secondary">Редагувати</Button>
                            </Link>
                            <form onSubmit={() => destroy(route("dashboard.workers.delete", user.id))} style={{marginLeft: "8px", display: "inline-block"}}>
                                <Button className="btn btn--secondary" type="submit">Видалити</Button>
                            </form>
                        </Box>
                    </Box>
                </Grid>
            </Authenticated>
        );
}

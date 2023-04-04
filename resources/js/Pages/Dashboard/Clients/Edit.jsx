import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link, useForm } from "@inertiajs/inertia-react";
import { Alert, Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React from "react";

export default function Edit({client}){

    const { data, setData, put, errors } = useForm({
        first_name: client.first_name,
        last_name: client.last_name,
        phone: client.phone,
        email: client.email
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        put(route('dashboard.clients.update', client.id));
    };

   return(
            <Authenticated>
                <Grid item xs={12}>
                    <Box component={Paper} className="main-content__item" sx={{width: "100%", display: "flex", alignItems:"center", justifyContent:"flex-start"}}>
                        <Link className="link" href={route("dashboard.clients.index")}>
                            <Button className="btn btn--secondary" sx={{marginRight: "16px"}}>Повернутися</Button>
                        </Link>
                        <Typography variant="h3" sx={{fontSize: "36px"}}>
                        Редагування клієнта
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box component={Paper} className="main-content__item main-content__item--white">
                        <form onSubmit={submit}>
                            <Box component="div">
                                <TextField 
                                    required
                                    type="text"
                                    name="first_name"
                                    value={data.first_name}
                                    label = "Ім'я"
                                    onChange={onHandleChange}
                                    className="block w-full"
                                />

                                {(errors.first_name !== undefined && errors.first_name != "")
                                    ?<Alert severity="error" className="mt-2">{errors.first_name}</Alert>
                                :""}    
                            </Box>

                            <Box component="div" sx={{marginTop: "16px"}}>
                                <TextField 
                                    required
                                    type="text"
                                    name="last_name"
                                    value={data.last_name}
                                    label = "Прізвище"
                                    onChange={onHandleChange}
                                    className="block w-full"
                                />

                                {(errors.last_name !== undefined && errors.last_name != "")
                                    ?<Alert severity="error" className="mt-2">{errors.last_name}</Alert>
                                :""}    
                            </Box>

                            <Box component="div" sx={{marginTop: "16px"}}>
                                <TextField 
                                    required
                                    type="text"
                                    name="phone"
                                    value={data.phone}
                                    label = "Номер телефону"
                                    onChange={onHandleChange}
                                    className="block w-full"
                                />

                                {(errors.phone !== undefined && errors.phone != "")
                                    ?<Alert severity="error" className="mt-2">{errors.phone}</Alert>
                                :""}    
                            </Box>

                            <Box component="div" sx={{marginTop: "16px"}}>
                                <TextField 
                                    required
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    label = "Електрона адреса"
                                    onChange={onHandleChange}
                                    className="block w-full"
                                />

                                {(errors.email !== undefined && errors.email != "")
                                    ?<Alert severity="error" className="mt-2">{errors.email}</Alert>
                                :""}    
                            </Box>

                            <Box component="div" sx={{marginTop: "24px", display: "flex", width: "100%", justifyContent:"flex-end"}}>
                                <Button type="submit" className="btn btn--main">Зберігти</Button>  
                            </Box>
                        </form>
                    </Box>
                </Grid>
            </Authenticated>
        );
}

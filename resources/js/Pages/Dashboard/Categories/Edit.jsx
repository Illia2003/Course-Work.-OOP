import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/inertia-react";
import { Alert, Box, Button, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import React from "react";

export default function Create({category}){

    const { data, setData, put, errors } = useForm({
        name: category.name
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        put(route('dashboard.categories.update', category.id));
    };

   return(
            <Authenticated>
                <Grid item xs={12}>
                    <Box component={Paper} className="main-content__item" sx={{width: "100%", display: "flex", alignItems:"center", justifyContent:"flex-start"}}>
                        <Link className="link" href={route("dashboard.categories.index")}>
                            <Button className="btn btn--secondary" sx={{marginRight: "16px"}}>Повернутися</Button>
                        </Link>
                        <Typography variant="h3" sx={{fontSize: "36px"}}>
                        Створення категорії
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={submit} sx={{width: "100%"}} encType="multipart/form-data">
                        <Grid container sx={{width: "100%"}} spacing={3}>
                            <Grid item xs={6}>
                                <Box className="main-content__item main-content__item--white">
                                    <Typography variant="h5" sx={{marginBottom: "8px"}}>
                                        Інформація про категорію
                                    </Typography>
                                    <Box component="div">
                                            <TextField 
                                                required
                                                type="text"
                                                name="name"
                                                value={data.name}
                                                label = "Назва"
                                                onChange={onHandleChange}
                                                className="block w-full"
                                            />

                                            {(errors.name !== undefined && errors.name != "")
                                                ?<Alert severity="error" className="mt-2">{errors.name}</Alert>
                                            :""}    
                                    </Box>
                                    <Box component="div" sx={{marginTop: "24px", display: "flex", width: "100%", justifyContent:"flex-end"}}>
                                        <Button type="submit" className="btn btn--main">Зберігти</Button>  
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>  
            </Authenticated>
        );
}

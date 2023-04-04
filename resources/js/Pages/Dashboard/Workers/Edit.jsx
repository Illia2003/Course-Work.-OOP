import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/inertia-react";
import { Alert, Box, Button, FormControl, Grid, InputLabel, Link, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";

export default function Edit({currentUser, roles}){
    const { data, setData, put, errors, reset } = useForm({
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone,
        role_id: currentUser.role_id,
        password: "",
        password_confirmation: ""
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        put(route('dashboard.workers.update', currentUser.id));
    };

    const rolesSelectOption = roles.map((current) => (<MenuItem value={current.id}>{current.name}</MenuItem>));

   return(
            <Authenticated>
                <Grid item xs={12}>
                    <Box component={Paper} className="main-content__item" sx={{width: "100%", display: "flex", alignItems:"center", justifyContent:"flex-start"}}>
                        <Link className="link" href={route("dashboard.workers.index")}>
                            <Button className="btn btn--secondary" sx={{marginRight: "16px"}}>Повернутися</Button>
                        </Link>
                        <Typography variant="h3" sx={{fontSize: "36px"}}>
                        Редагування робітника
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box className="main-content__item main-content__item--white">
                        <form onSubmit={submit}>
                            <Box component="div">
                                <TextField 
                                    required
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    label = "Ім'я"
                                    onChange={onHandleChange}
                                    className="block w-full"
                                />

                                {(errors.name !== undefined && errors.name != "")
                                    ?<Alert severity="error" className="mt-2">{errors.name}</Alert>
                                :""}    
                            </Box>

                            <Box component="div" sx={{marginTop: "16px"}}>
                                <TextField 
                                    required
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    label = "Електронна адреса"
                                    onChange={onHandleChange}
                                    className="block w-full"
                                />

                                {(errors.email !== undefined && errors.email != "")
                                    ?<Alert severity="error" className="mt-2">{errors.email}</Alert>
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
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    label = "Новий пароль"
                                    onChange={onHandleChange}
                                    className="block w-full"
                                />

                                {(errors.password !== undefined && errors.password != "")
                                    ?<Alert severity="error" className="mt-2">{errors.password}</Alert>
                                :""}    
                            </Box>

                            <Box component="div" sx={{marginTop: "16px"}}>
                                <TextField 
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    label = "Підтвердження нового паролю"
                                    onChange={onHandleChange}
                                    className="block w-full"
                                />

                                {(errors.password_confirmation !== undefined && errors.password_confirmation != "")
                                    ?<Alert severity="error" className="mt-2">{errors.password_confirmation}</Alert>
                                :""}    
                            </Box>

                            <FormControl sx={{marginTop: "16px", width: "100%"}}>
                                            <InputLabel id="role_id_select_label">Роль</InputLabel>
                                            <Select 
                                                required
                                                labelId="role_id_select_label"
                                                id="role_id_select"
                                                name="role_id"
                                                value={data.role_id}
                                                label = "Роль"
                                                onChange={onHandleChange}
                                                className="block w-full"
                                            >
                                                <MenuItem value={0}>Виберіть роль</MenuItem>

                                                {rolesSelectOption}

                                                </Select>

                                            {(errors.role_id !== undefined && errors.role_id != "")
                                                ?<Alert severity="error" className="mt-2">{errors.role_id}</Alert>
                                            :""}    
                                    </FormControl>

                            <Box component="div" sx={{marginTop: "24px", display: "flex", width: "100%", justifyContent:"flex-end"}}>
                                <Button type="submit" className="btn btn--main">Зберігти</Button>  
                            </Box>
                        </form>
                    </Box>
                </Grid>
            </Authenticated>
        );
}

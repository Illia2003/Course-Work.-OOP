import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/inertia-react";
import { Alert, Box, Button, FormControlLabel, FormGroup, Grid, Link, Paper, Switch, TextField, Typography } from "@mui/material";
import React from "react";

function PromUa ({integration, integration_data}){
    const integrationDataObject = () => {
        let object = {};

        integration_data.forEach((current) => {
            object[current.key] = {
                value: current.value,
                name: current.name,
                id: current.id
            };
        });

        return object;
    };

    const { data, setData, put, errors, reset } = useForm({
        is_active: integration.is_active,
        integrationData:{
            tokenAPI: {
                name: 'Токен API',
                value: '',
            },
            ...integrationDataObject()
        }
    });

    const onHandleChange = (event) => {
        setData('integrationData',
            { 
                ...data.integrationData,
                [event.target.name] : { 
                    ...data.integrationData[event.target.name],
                    value : event.target.value
                },
            }
        );
    };

    const onHandleSwitchChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        put(route('dashboard.integrations.update', integration.id));
    };

    return(
        <Authenticated>
            <Grid item xs={12} >
                    <Box component={Paper} className="main-content__item" sx={{width: "100%", display: "flex", alignItems:"center", justifyContent:"flex-start"}}>
                        <Link className="link" href={route("dashboard.integrations.index")}>
                            <Button className="btn btn--secondary" sx={{marginRight: "16px"}}>Повернутися</Button>
                        </Link>
                        <Typography variant="h3" sx={{fontSize: "36px"}}>
                            {integration.name}
                        </Typography>
                    </Box>
            </Grid>

            <Grid item xs={12}>
                    <Box className="main-content__item main-content__item--white">
                        <form onSubmit={submit}>
                            <Box component="div">
                                <FormGroup>
                                    <FormControlLabel control={<Switch value={true} onChange={onHandleSwitchChange} name="is_active" checked={data.is_active} />} label="Активувати" />
                                </FormGroup>   
                            </Box>

                            <Box component="div" sx={{marginTop: "16px"}}>
                                <TextField 
                                    required
                                    type="text"
                                    name="tokenAPI"
                                    value={data.integrationData.tokenAPI.value}
                                    label = {data.integrationData.tokenAPI.name}
                                    onChange={onHandleChange}
                                    className="block w-full"
                                />   
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

export default PromUa;
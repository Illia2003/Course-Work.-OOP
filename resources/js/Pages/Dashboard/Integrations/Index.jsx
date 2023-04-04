import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Box, Button, Grid, Link, Paper, Typography } from "@mui/material";
import React from "react";

function Index ({integrations}){

    const integrationsBoxes = integrations.map((current) => (
        <Grid item xs={3}>
            <Box component={Paper}
                className="main-content__item main-content__item--white">
                <Typography variant="h4" sx={{fontSize: "30px", 'marginBottom': '16px'}}>{current.name}</Typography>
                <Link className="link" href={route("dashboard.integrations.edit", current.id)}>
                    <Button className="btn btn--main">Редагувати</Button>
                </Link>         
            </Box>
        </Grid>
    ));

        return(
            <Authenticated>
                <Grid item xs={12} >
                    <Box component={Paper}
                    className="main-content__item" 
                    sx={{width: "100%", display: "flex", alignItems:"center", justifyContent:"space-between"}}>
                        <Typography variant="h3" sx={{fontSize: "36px"}}>
                            Інтеграції
                        </Typography>
                    </Box>
                </Grid>
                {integrationsBoxes}
            </Authenticated>
        );
}

export default Index;
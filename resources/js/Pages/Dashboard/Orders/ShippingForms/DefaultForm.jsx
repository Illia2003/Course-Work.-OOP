import { Alert, Box, TextField } from "@mui/material"
import React from "react"

export default function DefaultForm ({data, onHandleChange, errors}){
    return (
        <>
            <Box component="div">
            <TextField 
                required
                type="text"
                name="shipping_region"
                value={data.shipping_region}
                label = "Область"
                onChange={onHandleChange}
                className="block w-full"
            />

            {(errors.shipping_region !== undefined && errors.shipping_region != "")
                ?<Alert severity="error" className="mt-2">{errors.shipping_region}</Alert>
            :""}    
            </Box>

            <Box component="div" sx={{marginTop: "16px"}}>
            <TextField 
                required
                type="text"
                name="shipping_city"
                value={data.shipping_city}
                label = "Місто"
                onChange={onHandleChange}
                className="block w-full"
            />

            {(errors.shipping_city !== undefined && errors.shipping_city != "")
                ?<Alert severity="error" className="mt-2">{errors.shipping_city}</Alert>
            :""}    
            </Box>

            <Box component="div" sx={{marginTop: "16px"}}>
            <TextField 
                required
                type="text"
                name="shipping_address_1"
                value={data.shipping_address_1}
                label = "Адресса"
                onChange={onHandleChange}
                className="block w-full"
            />

            {(errors.shipping_address_1 !== undefined && errors.shipping_address_1 != "")
                ?<Alert severity="error" className="mt-2">{errors.shipping_address_1}</Alert>
            :""}    
            </Box>

            <Box component="div" sx={{marginTop: "16px"}}>
            <TextField 
                type="text"
                name="shipping_address_2"
                value={data.shipping_address_2}
                label = "Квартира, під'їзд"
                onChange={onHandleChange}
                className="block w-full"
            />

            {(errors.shipping_address_2 !== undefined && errors.shipping_address_2 != "")
                ?<Alert severity="error" className="mt-2">{errors.shipping_address_2}</Alert>
            :""}    
            </Box>

            <Box component="div" sx={{marginTop: "16px"}}>
            <TextField 
                type="text"
                name="shipping_postcode"
                value={data.shipping_postcode}
                label = "Поштовий індекс"
                onChange={onHandleChange}
                className="block w-full"
            />

            {(errors.shipping_postcode !== undefined && errors.shipping_postcode != "")
                ?<Alert severity="error" className="mt-2">{errors.shipping_postcode}</Alert>
            :""}    
            </Box>
        </>
    )
}
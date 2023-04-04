import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/inertia-react";
import { Alert, Box, Button, FormControl, Grid, InputLabel, Link, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DefaultForm from "./ShippingForms/DefaultForm";
import NovaPoshtaForm from "./ShippingForms/NovaPoshtaForm";

export default function Create({clients, products, users, shipping_methods, nova_poshta}){
    const [orderItems, setOrderItems] = useState({});

    const orderTotal = () => {
        let total = 0;

        if(Object.keys(orderItems).length){
            for (const key in orderItems) { 
                total += orderItems[key].price * orderItems[key].quantity;
            }    
        }

        return total;
    }

    const { data, setData, post, errors } = useForm({
        client_id: 0,
        user_id: 0,
        shipping_method_id: 0,
        items: {},
        shipping_region: "",
        shipping_city: "",
        shipping_address_1: "",
        shipping_address_2: "",
        shipping_postcode: "",
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('dashboard.orders.store'));
    };

    const clientsSelectOption = clients.map((current) => (<MenuItem value={current.id} key={current.id}>{`${current.first_name} ${current.last_name}`}</MenuItem>));
    
    const usersSelectOption = users.map((current) => (<MenuItem value={current.id} key={current.id}>{current.name}</MenuItem>));

    const shippingsSelectOption = shipping_methods.map((current) => (<MenuItem value={current.id} key={current.id}>{current.name}</MenuItem>));

    const handleChangeOrderItem = (e) => {
        let block = e.target.closest(".order-item-field");

        setOrderItems((prevData) => ({
            ...prevData, 
            [Number(block.dataset.id)]:{
                ...prevData[Number(block.dataset.id)],
                [block.dataset.name]: e.target.value,
            }
        }
        ));
    }

    const handleChangeProductId = (e, child) => {
        let props = child.props;

        setOrderItems((prevData) => {
            return ({
            ...prevData, 
            [Number(props['data-index'])]:{
                ...prevData[Number(props['data-index'])],
                [props['data-name']]: e.target.value,
                price: props['data-price']
            }
        });
    });
    }

    const addOrderItem = (e) => {
        setOrderItems((prevValue) => ({
            ...prevValue,
            [Object.keys(orderItems).length]:{
                product_id: 0,
                quantity: 1,
                price: 0.0,
                total: function() {
                    return Number(this.quantity) * this.price;
                }
            }
        }));
    };

    useEffect(() => {
        setData('items', orderItems);
    }, [orderItems]);

    const orderItemsComponents = () => {
        let items = [];

        if(Object.keys(orderItems).length){
            for (const key in orderItems) { 
                const productsSelectOption = products.map((current) => (<MenuItem value={current.id} data-index={key} data-price={current.price} data-name="product_id" key={current.id}>{current.name}</MenuItem>))

                items.push(
                    <Box key={key} sx={{display: "flex", alignItems: "center", justifyContent: "flex-start", marginBottom: "16px"}}>
                        <FormControl sx={{flex: "1 1 100%", marginRight: "8px"}}>
                            <InputLabel id={`product_id_select_label_${key}`}>Товар</InputLabel>
                            <Select 
                                labelId={`product_id_select_label_${key}`}
                                id={`product_id_select_${key}`}
                                name={`orderItems[${key}][product_id]`}
                                label = "Товар"
                                onChange={handleChangeProductId}
                                className="block w-full"
                                value={orderItems[key]['product_id']}
                            >
                            <MenuItem value={0} data-index={key} data-price={0} data-name="product_id">Виберіть товар</MenuItem>
    
                            {productsSelectOption}
    
                            </Select>
                        </FormControl>
    
                        <Box component="div" sx={{flex: "1 1 100%", marginRight: "8px"}}>
                            <TextField 
                                type="number"
                                name={`order_items[${key}][quantity]`}
                                label = "Кількість"
                                onChange={handleChangeOrderItem}
                                className="block w-full order-item-field"
                                data-name="quantity"
                                data-id={key}
                                id={`quantity_${key}`}
                                value={orderItems[key]['quantity']}
                            /> 
                        </Box>
    
                        <Box component="div" sx={{flex: "1 1 100%"}}>
                            <Typography variant="h5" sx={{fontSize: "20px"}}>
                                {`${orderItems[key].total()} грн.`}
                            </Typography>
                        </Box>
                    </Box>
                );
            }    
        }

        return items;
    }

   return(
            <Authenticated>
                <Grid item xs={12}>
                    <Box component={Paper} className="main-content__item" sx={{width: "100%", display: "flex", alignItems:"center", justifyContent:"flex-start"}}>
                        <Link className="link" href={route("dashboard.orders.index")}>
                            <Button className="btn btn--secondary" sx={{marginRight: "16px"}}>Повернутися</Button>
                        </Link>
                        <Typography variant="h3" sx={{fontSize: "36px"}}>
                        Створення замовлення
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={submit} sx={{width: "100%"}} encType="multipart/form-data">
                        <Grid container sx={{width: "100%"}} spacing={3}>
                            <Grid item xs={6}>
                                <Box className="main-content__item main-content__item--white">
                                    <Box component="div">
                                        <Typography variant="h5" sx={{marginBottom: "8px"}}>
                                            Клієнт
                                        </Typography>

                                        <FormControl sx={{marginTop: "16px", width: "100%"}}>
                                                <InputLabel id="client_id_select_label">Клієнт</InputLabel>
                                                <Select 
                                                    required
                                                    labelId="client_id_select_label"
                                                    id="client_id_select"
                                                    name="client_id"
                                                    value={data.client_id}
                                                    label = "Категорія"
                                                    onChange={onHandleChange}
                                                    className="block w-full"
                                                >
                                                    <MenuItem value={0}>Виберіть клієнта</MenuItem>

                                                    {clientsSelectOption}

                                                    </Select>

                                                {(errors.client_id !== undefined && errors.client_id != "")
                                                    ?<Alert severity="error" className="mt-2">{errors.client_id}</Alert>
                                                :""}    
                                        </FormControl>
                                    </Box>

                                    <Box component="div" sx={{marginTop: "24px"}}>
                                        <Typography variant="h5" sx={{marginBottom: "8px"}}>
                                            Менеджер
                                        </Typography>

                                        <FormControl sx={{marginTop: "16px", width: "100%"}}>
                                                <InputLabel id="user_id_select_label">Менеджер</InputLabel>
                                                <Select 
                                                    required
                                                    labelId="user_id_select_label"
                                                    id="user_id_select"
                                                    name="user_id"
                                                    value={data.user_id}
                                                    label = "Менеджер"
                                                    onChange={onHandleChange}
                                                    className="block w-full"
                                                >
                                                    <MenuItem value={0}>Виберіть менеджера</MenuItem>

                                                    {usersSelectOption}

                                                    </Select>

                                                {(errors.user_id !== undefined && errors.user_id != "")
                                                    ?<Alert severity="error" className="mt-2">{errors.user_id}</Alert>
                                                :""}    
                                        </FormControl>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box className="main-content__item main-content__item--white">
                                    <Typography variant="h5" sx={{marginBottom: "16px"}}>
                                        Адреса доставки і спосіб доставки
                                    </Typography>

                                    <FormControl sx={{marginBottom: "16px", width: "100%"}}>
                                                <InputLabel id="shipping_method_id_select_label">Метод доставки</InputLabel>
                                                <Select 
                                                    required
                                                    labelId="shipping_method_id_select_label"
                                                    id="shipping_method_id_select"
                                                    name="shipping_method_id"
                                                    value={data.shipping_method_id}
                                                    label = "Метод доставки"
                                                    onChange={onHandleChange}
                                                    className="block w-full"
                                                >
                                                    <MenuItem value={0}>Виберіть метод доставки</MenuItem>

                                                    {shippingsSelectOption}

                                                    </Select>

                                                {(errors.shipping_method_id !== undefined && errors.shipping_method_id != "")
                                                    ?<Alert severity="error" className="mt-2">{errors.shipping_method_id}</Alert>
                                                :""}    
                                        </FormControl>

                                    {(data.shipping_method_id == 1) ? <DefaultForm data={data} errors={errors} onHandleChange={onHandleChange}></DefaultForm> : ''}

                                    {(data.shipping_method_id == 2 && nova_poshta.is_active) ? <NovaPoshtaForm data={data} errors={errors} onHandleChange={onHandleChange} apiKey={nova_poshta.apiKey}></NovaPoshtaForm> : ''}

                                    {(data.shipping_method_id == 2 && !nova_poshta.is_active) ? "Нова пошта не активована" : ''}
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box className="main-content__item main-content__item--white">
                                    <Typography variant="h5" sx={{marginBottom: "16px"}}>
                                        Товари
                                    </Typography>

                                    <Box>
                                        {orderItemsComponents()}
                                    </Box>

                                    <Box component="div" sx={{marginTop: "16px", display: "flex", width: "100%", justifyContent:"flex-end"}}>
                                        <Typography variant="h4" sx={{fontSize: "24px"}}>
                                            {`${orderTotal()} грн`}
                                        </Typography>
                                    </Box>

                                    <Box component="div" sx={{marginTop: "24px", display: "flex", width: "100%", justifyContent:"flex-end"}}>
                                        <Button onClick={addOrderItem} className="btn btn--main">Добавити товар</Button>  
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box component="div" sx={{marginTop: "24px", display: "flex", width: "100%", justifyContent:"flex-end"}}>
                                    <Button type="submit" className="btn btn--main">Зберігти</Button>  
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>  
            </Authenticated>
        );
}

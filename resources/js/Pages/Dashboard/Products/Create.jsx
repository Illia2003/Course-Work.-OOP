import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/inertia-react";
import { Alert, Box, Button, FormControl, Grid, InputLabel, Link, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function Create({categories}){
    const [ metaDataItems, setMetaDataItems ] = useState([]);

    const [ thumbnailUrl, setThumbnailUrl ] = useState("");

    const [ metaData, setMetaData ] = useState({});

    const { data, setData, post, errors } = useForm({
        sku: '',
        name: '',
        description: '',
        price: 0.0,
        stock: 0,
        thumbnail: null,
        metadata: {},
        category_id: 0
    });

    useEffect(() => {
        const index = metaDataItems.length;

        if(index != 0){
            setMetaData((prevData) => ({
                ...prevData, 
                [index - 1]:{
                    value: "",
                    name: ""
                }
            }));
        }else{
            setMetaData((prevData) => ({
                ...prevData
            }));
        }
        
    }, [metaDataItems]);

    useEffect(() => {
        setData("metadata", metaData);
    }, [metaData]);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const onHandleFileChange = (event) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            setThumbnailUrl(e.target.result);
        }

        reader.readAsDataURL(event.target.files[0]);

        setData(event.target.name, event.target.files[0]);
    }

    const onHandleMetaChange = (event) => {
        let block = event.target.closest(".product-meta-data");

        setMetaData((prevData) => ({
            ...prevData, 
            [Number(block.dataset.id)]:{
                ...prevData[Number(block.dataset.id)],
                [block.dataset.name]: event.target.value,
            }
        }
        ));
    }

    const onClickAddMeta = (e) => {
        setMetaDataItems([...metaDataItems, 
            <Box sx={{marginBottom: '16px'}} key={metaDataItems.length}>
                <Box component="div">
                    <TextField 
                        type="text"
                        name={`metadata[${metaDataItems.length}][name]`}
                        label = "Назва" 
                        data-id={metaDataItems.length}
                        data-name="name"
                        className="block w-full product-meta-data"
                        onChange={onHandleMetaChange}
                    />  
                </Box>

                <Box component="div" sx={{marginTop: "8px"}}>
                    <TextField 
                        type="text"
                        name={`metadata[${metaDataItems.length}][value]`}
                        label = "Значення"
                        data-id={metaDataItems.length}
                        data-name="value"
                        className="block w-full product-meta-data"
                        onChange={onHandleMetaChange}
                    />    
                </Box>
            </Box>]);
    
            }

    const submit = (e) => {
        e.preventDefault();

        post(route('dashboard.products.store'));
    };

    const categoriesSelectOption = categories.map((current) => (<MenuItem value={current.id}>{current.name}</MenuItem>))

   return(
            <Authenticated>
                <Grid item xs={12}>
                    <Box component={Paper} className="main-content__item" sx={{width: "100%", display: "flex", alignItems:"center", justifyContent:"flex-start"}}>
                        <Link className="link" href={route("dashboard.products.index")}>
                            <Button className="btn btn--secondary" sx={{marginRight: "16px"}}>Повернутися</Button>
                        </Link>
                        <Typography variant="h3" sx={{fontSize: "36px"}}>
                        Створення товару
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={submit} sx={{width: "100%"}} encType="multipart/form-data">
                        <Grid container sx={{width: "100%"}} spacing={3}>
                            <Grid item xs={6}>
                                <Box className="main-content__item main-content__item--white">
                                    <Typography variant="h5" sx={{marginBottom: "8px"}}>
                                        Інформація про товар
                                    </Typography>
                                    <Box component="div">
                                            <TextField 
                                                required
                                                type="text"
                                                name="sku"
                                                value={data.sku}
                                                label = "SKU"
                                                onChange={onHandleChange}
                                                className="block w-full"
                                            />

                                            {(errors.sku !== undefined && errors.sku != "")
                                                ?<Alert severity="error" className="mt-2">{errors.sku}</Alert>
                                            :""}    
                                    </Box>

                                    <Box component="div" sx={{marginTop: "16px"}}>
                                            <TextField 
                                                required
                                                type="text"
                                                name="name"
                                                value={data.name}
                                                label = "Назва товару"
                                                onChange={onHandleChange}
                                                className="block w-full"
                                            />

                                            {(errors.name !== undefined && errors.name != "")
                                                ?<Alert severity="error" className="mt-2">{errors.name}</Alert>
                                            :""}    
                                    </Box>

                                    <Box component="div" sx={{marginTop: "16px"}}>
                                            <TextField 
                                                multiline
                                                minRows={3}
                                                type="text"
                                                name="description"
                                                value={data.description}
                                                label = "Опис"
                                                onChange={onHandleChange}
                                                className="block w-full"
                                            />

                                            {(errors.description !== undefined && errors.description != "")
                                                ?<Alert severity="error" className="mt-2">{errors.description}</Alert>
                                            :""}    
                                    </Box>

                                    <Box component="div" sx={{marginTop: "16px"}}>
                                            <TextField 
                                                required
                                                type="text"
                                                name="price"
                                                value={data.price}
                                                label = "Ціна"
                                                onChange={onHandleChange}
                                                className="block w-full"
                                            />

                                            {(errors.price !== undefined && errors.price != "")
                                                ?<Alert severity="error" className="mt-2">{errors.price}</Alert>
                                            :""}    
                                    </Box>

                                    <Box component="div" sx={{marginTop: "16px"}}>
                                            <TextField 
                                                required
                                                type="text"
                                                name="stock"
                                                value={data.stock}
                                                label = "Кількість товару на складі"
                                                onChange={onHandleChange}
                                                className="block w-full"
                                            />

                                            {(errors.stock !== undefined && errors.stock != "")
                                                ?<Alert severity="error" className="mt-2">{errors.stock}</Alert>
                                            :""}    
                                    </Box>

                                    <FormControl sx={{marginTop: "16px", width: "100%"}}>
                                            <InputLabel id="category_id_select_label">Категорія</InputLabel>
                                            <Select 
                                                required
                                                labelId="category_id_select_label"
                                                id="category_id_select"
                                                name="category_id"
                                                value={data.category_id}
                                                label = "Категорія"
                                                onChange={onHandleChange}
                                                className="block w-full"
                                            >
                                                <MenuItem value={0}>Виберіть категорію</MenuItem>

                                                {categoriesSelectOption}

                                                </Select>

                                            {(errors.category_id !== undefined && errors.category_id != "")
                                                ?<Alert severity="error" className="mt-2">{errors.category_id}</Alert>
                                            :""}    
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box className="main-content__item main-content__item--white">
                                    <Typography variant="h5" sx={{marginBottom: "8px"}}>
                                        Зображення товару
                                    </Typography>
                                    <Box component="div">
                                            <Box component="div" className="form__image-preview" sx={{marginBottom: "12px", minHeight: "200px"}}>
                                                {thumbnailUrl != ""?
                                                <img src={thumbnailUrl} alt={data.name} style={{borderRadius: "8px"}}/>: ""}
                                            </Box>

                                            <Button
                                            variant="contained"
                                            component="label"
                                            className="block w-full btn btn--main"
                                            style={{boxShadow: "none", textTransform: "none", borderRadius: "8px"}}
                                            >
                                            Загрузити картинку
                                            <input
                                                type="file"
                                                hidden
                                                name="thumbnail"
                                                onChange={onHandleFileChange}
                                            />
                                            </Button>

                                            {(errors.thumbnail !== undefined && errors.thumbnail != "")
                                                ?<Alert severity="error" className="mt-2">{errors.thumbnail}</Alert>
                                            :""}    
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box className="main-content__item main-content__item--white">
                                    <Typography variant="h5" sx={{marginBottom: "8px"}}>
                                        Додаткові відомості про товар
                                    </Typography>
                                    <Box>
                                        {metaDataItems}
                                    </Box>
                                    <Box component="div" sx={{marginTop: "8px", display: "flex", width: "100%", justifyContent:"flex-end"}}>
                                        <Button className="btn btn--main" onClick={onClickAddMeta}>Додати</Button>  
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

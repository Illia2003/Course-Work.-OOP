import ApplicationLogo from '@/Components/ApplicationLogo';
import AnalyticsIcon from '@/Components/Icons/AnalyticsIcon';
import ClientsIcon from '@/Components/Icons/ClientsIcon';
import EmployeersIcon from '@/Components/Icons/EmployeersIcon';
import IntegrationsIcon from '@/Components/Icons/IntegrationsIcon';
import OrdersIcon from '@/Components/Icons/OrdersIcon';
import ProductsIcon from '@/Components/Icons/ProductsIcon';
import CategoriesIcon from '@/Components/Icons/CategoriesIcon';
import MenuItem from '@/Components/Sidebar/MenuItem';
import { Box, Button, Drawer, Grid, Link, List, ListSubheader } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';

export default function Authenticated({ auth, header, children }) {

    const {post} = useForm();

    const submitLogout = (e) => {
        e.preventDefault();

        post(route('logout'));
    };

    return (
        <div className="min-h-screen">
            <Box component="div">
                <Box component="nav" className='sidebar'>
                    <Drawer
                        sx={{
                        width: 240,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: 240,
                            boxSizing: 'border-box',
                            display: 'flex',
                            alignItems: 'flex-start',
                            padding: "24px"
                        },
                        }}
                        variant="permanent"
                        anchor="left"
                    >
                        <Box component="div" style={{'width': '120px', marginBottom: '24px'}}>
                            <ApplicationLogo fill="#005c53"/>
                        </Box>
                        <Box sx={{ width: '100%', maxWidth: 240, bgcolor: 'background.paper' }}>
                            <List sx={{ width: '100%', maxWidth: 240, bgcolor: 'background.paper' }} className="sidebar__list">
                                <ListSubheader>Замовлення</ListSubheader>
                                <MenuItem title="Замовлення" icon={<OrdersIcon fill="#637381" width="24" height="24"/>} href={route("dashboard.orders.index")} isActive={window.location.href.includes(route("dashboard.orders.index")) ? true : false}/>
                            </List>
                        </Box>
                        <Box sx={{ width: '100%', maxWidth: 240, bgcolor: 'background.paper', marginTop: "16px" }}>
                            <List sx={{ width: '100%', maxWidth: 240, bgcolor: 'background.paper' }} className="sidebar__list">
                                <ListSubheader>Товари</ListSubheader>
                                <MenuItem title="Товари" icon={<ProductsIcon fill="#637381" width="24" height="24"/>} href={route("dashboard.products.index")} isActive={window.location.href.includes(route("dashboard.products.index")) ? true : false}/>
                                <MenuItem title="Категорії" icon={<CategoriesIcon fill="#637381" width="24" height="24"/>} href={route("dashboard.categories.index")} isActive={window.location.href.includes(route("dashboard.categories.index")) ? true : false}/>
                            </List>
                        </Box>
                        <Box sx={{ width: '100%', maxWidth: 240, bgcolor: 'background.paper', marginTop: "16px" }}>
                            <List sx={{ width: '100%', maxWidth: 240, bgcolor: 'background.paper' }} className="sidebar__list">
                                <ListSubheader>Клієнти</ListSubheader>
                                <MenuItem title="Клієнти" icon={<ClientsIcon fill="#637381" width="24" height="24"/>} href={route("dashboard.clients.index")} isActive={window.location.href.includes(route("dashboard.clients.index")) ? true : false}/>
                            </List>
                        </Box>
                        <Box sx={{ width: '100%', maxWidth: 240, bgcolor: 'background.paper', marginTop: "16px" }}>
                            <List sx={{ width: '100%', maxWidth: 240, bgcolor: 'background.paper' }} className="sidebar__list">
                                <ListSubheader>Робітники</ListSubheader>
                                <MenuItem title="Робітники" icon={<EmployeersIcon fill="#637381" width="24" height="24"/>} href={route("dashboard.workers.index")} isActive={window.location.href.includes(route("dashboard.workers.index")) ? true : false}/>
                            </List>
                        </Box>
                        <Box sx={{ width: '100%', maxWidth: 240, bgcolor: 'background.paper', marginTop: "16px" }}>
                            <List sx={{ width: '100%', maxWidth: 240, bgcolor: 'background.paper' }} className="sidebar__list">
                                <ListSubheader>Інше</ListSubheader>
                                <MenuItem title="Аналітика" icon={<AnalyticsIcon fill="#637381" width="24" height="24"/>} href={route("dashboard.analytics.index")} isActive={window.location.href.includes(route("dashboard.analytics.index")) ? true : false}/>
                                <MenuItem title="Інтеграції" icon={<IntegrationsIcon fill="#637381" width="24" height="24"/>} href={route("dashboard.integrations.index")} isActive={window.location.href.includes(route("dashboard.integrations.index")) ? true : false}/>
                            </List>
                        </Box>
                        <Box sx={{ width: '100%', maxWidth: 240, bgcolor: 'background.paper', marginTop: "16px" }}>
                            <form onSubmit={submitLogout} style={{marginLeft: "8px", display: "inline-block"}}>
                                <Button className="btn btn--secondary" type="submit">Вийти</Button>
                            </form>
                        </Box>
                    </Drawer>
                </Box>
                <Box component="main" className="main-content">
                    <Grid container spacing={3} className="main-content__container">
                        {children}
                    </Grid>
                </Box>
            </Box>
        </div>
    );
}

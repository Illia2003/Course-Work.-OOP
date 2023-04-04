// Method route is created by Ziggy libary. This method helps to use named routes
import React, { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import TextField from '@mui/material/TextField';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import Button from '@mui/material/Button';
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <div className="mb-4">
                <Typography variant='h4' component='h2' style={{"textAlign": "center"}}>
                    <b>Привіт. Давайте, авторизуємося</b>
                </Typography>
            </div>

            <form onSubmit={submit}>
                <div>
                    <TextField 
                        required
                        type="text"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        label = "Ваш email"
                        helperText="youremail@gmail.com"
                        onChange={onHandleChange}
                        className="block w-full"
                    />

                    {(errors.email !== undefined && errors.email != "")
                    ?<Alert severity="error" className="mt-2">{errors.email}</Alert>
                    :""}    
                </div>

                <div className="mt-4">
                    <TextField 
                        required
                        type="password"
                        name="password"
                        value={data.password}
                        label = "Ваш пароль"
                        onChange={onHandleChange}
                        className="block w-full"
                    />

                    {(errors.password !== undefined && errors.password != "")
                    ?<Alert severity="error" className="mt-2">{errors.password}</Alert>
                    :""}
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox name="remember" value={data.remember} onChange={onHandleChange} />

                        <span className="ml-2 text-sm text-gray-600">Запомнити мене</span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900"
                        >
                            Забули пароль?
                        </Link>
                    )}

                    <Button variant="contained" type="submit" style={{"marginLeft": "14px", "color": "#fff"}} disabled={processing}>
                        Увійти
                    </Button>
                </div>
                <div className='mt-3 items-center justify-end flex w-full'>
                <Link
                            href={route('register')}
                            className="underline text-sm text-gray-600 hover:text-gray-900"
                        >
                            Ще не має аккаунту? Давайте створимо
                        </Link>
                </div>
            </form>
        </GuestLayout>
    );
}

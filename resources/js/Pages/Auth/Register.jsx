import React, { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="mb-4">
                <Typography variant='h4' component='h2' style={{"textAlign": "center"}}>
                    <b>Привіт. Давайте, створимо аккаунт</b>
                </Typography>
            </div>

            <form onSubmit={submit}>
                {/* <div>
                    <InputLabel forInput="name" value="Name" />

                    <TextInput
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div> */}
                
                <div>
                    <TextField 
                        required
                        type="text"
                        name="name"
                        value={data.name}
                        autoComplete="username"
                        label = "Ваше ім'я"
                        helperText="Павло Петрович"
                        onChange={onHandleChange}
                        className="block w-full"
                    />

                    {(errors.name !== undefined && errors.name != "")
                    ?<Alert severity="error" className="mt-2">{errors.name}</Alert>
                    :""}
                </div>

                <div className="mt-4">
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
                        type="text"
                        name="phone"
                        value={data.phone}
                        autoComplete="phone"
                        label = "Ваш телефон"
                        helperText="youremail@gmail.com"
                        onChange={onHandleChange}
                        className="block w-full"
                    />

                    {(errors.phone !== undefined && errors.phone != "")
                    ?<Alert severity="error" className="mt-2">{errors.phone}</Alert>
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

                <div className="mt-4">
                    <TextField 
                        required
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        label = "Підтвердіть пароль"
                        onChange={onHandleChange}
                        className="block w-full"
                    />

                    {(errors.password_confirmation !== undefined && errors.password_confirmation != "")
                    ?<Alert severity="error" className="mt-2">{errors.password_confirmation}</Alert>
                    :""}
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link href={route('login.get')} className="underline text-sm text-gray-600 hover:text-gray-900">
                        Вже маєте аккаунт?
                    </Link>

                    <Button variant="contained" type="submit" style={{"marginLeft": "14px", "color": "#fff"}} disabled={processing}>
                        Створити аккаунт
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}

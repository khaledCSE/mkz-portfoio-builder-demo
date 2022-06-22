import { AppBar, Box, Button, Card, Container, TextField, Toolbar, Typography } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, Fragment, useState } from 'react';
import Navbar from '../../components/Navbar';

export const PublicNavbar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Container sx={{ display: 'flex' }}>
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                            Jobber
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Container>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorTxt, setErrorTxt] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/register`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();

        if (data.token) {
            localStorage.setItem('jobber-auth-token', data.token);
            router.push('/profile');
        } else {
            setEmail('');
            setPassword('');
            setErrorTxt(data.msg);
        }
    };

    return (
        <Fragment>
            <Head>
                <title>Jobber | Login</title>
            </Head>
            {/* <PublicNavbar /> */}
            <Navbar />
            <Box
                sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Card sx={{ p: 3, width: '600px' }}>
                    <Typography variant="h5" sx={{ textAlign: 'center' }}>
                        Signup Here
                    </Typography>
                    {errorTxt.length > 0 && <p style={{ color: 'red', textAlign: 'center' }}>{errorTxt}</p>}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            type="email"
                            margin="normal"
                            onChange={(e: any) => setEmail(e.target.value)}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Password"
                            type="password"
                            margin="normal"
                            onChange={(e: any) => setPassword(e.target.value)}
                            fullWidth
                            required
                        />
                        <Button type="submit" variant="contained" size="large" sx={{ width: '100%', margin: '1rem 0' }}>
                            Register
                        </Button>

                        <div style={{ textAlign: 'center' }}>
                            <Link href="/auth/login">
                                <a>Already have an account? | Login</a>
                            </Link>
                        </div>
                    </form>
                </Card>
            </Box>
        </Fragment>
    );
};

export default LoginPage;

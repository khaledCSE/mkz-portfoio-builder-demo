import { Login, Logout } from '@mui/icons-material';
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { authContext } from './contexts/auth.context';

const Navbar = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const authState = useContext(authContext);
    const router = useRouter();

    useEffect(() => {
        if (authState && authState.user) {
            setIsAdmin(true);
        }
    }, [authState]);

    const logout = () => {
        localStorage.removeItem('jobber-auth-token');
        router.push('/');
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Container sx={{ display: 'flex' }}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link href="/">
                                <a>Jobber</a>
                            </Link>
                        </Typography>

                        {isAdmin ? (
                            <Button color="inherit" endIcon={<Logout />} onClick={logout}>
                                Logout
                            </Button>
                        ) : (
                            <Button color="inherit" endIcon={<Login />}>
                                <Link href="/auth/login">
                                    <a>Login</a>
                                </Link>
                            </Button>
                        )}
                    </Container>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;

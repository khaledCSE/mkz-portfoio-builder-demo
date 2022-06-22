import { Login, Logout } from '@mui/icons-material';
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { authContext } from './contexts/auth.context';

const Navbar = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const authState = useContext(authContext);
    useEffect(() => {
        if (authState && authState.user) {
            setIsAdmin(true);
        }
    }, [authState]);
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Container sx={{ display: 'flex' }}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Jobber
                        </Typography>

                        {isAdmin ? (
                            <Button color="inherit" endIcon={<Logout />}>
                                Logout
                            </Button>
                        ) : (
                            <Button color="inherit" endIcon={<Login />}>
                                Login
                            </Button>
                        )}
                    </Container>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;

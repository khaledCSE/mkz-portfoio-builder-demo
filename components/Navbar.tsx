import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Container sx={{ display: 'flex' }}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Jobber
                        </Typography>
                        <Button color="inherit">Logout</Button>
                    </Container>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;

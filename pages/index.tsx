import { Avatar, Box, Button, Card, Container, Grid, Typography } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Spinner from '../components/shared/Spinner';
import styles from '../styles/Home.module.css';

interface iAPIProfile {
    _id: string;
    firstName: string;
    lastName: string;
    age: string;
    profilePicture: string;
    designation: string;
    company: string;
}

const Home: NextPage = () => {
    const [profiles, setProfiles] = useState<iAPIProfile[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const get = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/profiles`);
            const data = await res.json();
            setProfiles(data);
            setLoading(false);
        };
        get();
    }, []);

    return (
        <Fragment>
            <Head>
                <title>Jobber | Home</title>
            </Head>
            <Navbar />
            {loading ? (
                <Spinner />
            ) : (
                <Container>
                    <Box sx={{ margin: '5rem 0' }}>
                        <Grid container spacing={3}>
                            {profiles.map((profile, index) => (
                                <Grid item md={4} key={index}>
                                    <Card
                                        sx={{
                                            p: 3,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'column',
                                            gap: '1rem',
                                        }}
                                    >
                                        <Avatar
                                            alt="Profile Picture"
                                            src={profile.profilePicture as string}
                                            sx={{ width: 100, height: 100, margin: 'auto' }}
                                        />
                                        <Typography variant="h3">
                                            {profile.firstName} {profile.lastName}
                                        </Typography>
                                        <Typography variant="h6">{profile.designation}</Typography>
                                        <Typography variant="h6">{profile.company}</Typography>
                                        <Typography variant="h6">Age: {profile.age}</Typography>
                                        <Button variant="contained">
                                            <Link href={`/profile/${profile._id}`}>
                                                <a>View Details</a>
                                            </Link>
                                        </Button>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Container>
            )}
        </Fragment>
    );
};

export default Home;

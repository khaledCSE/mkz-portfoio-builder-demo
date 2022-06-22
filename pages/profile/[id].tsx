import { Edit as EditIcon } from '@mui/icons-material';
import { Avatar, Card, Container, IconButton, Typography } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useContext, useEffect, useState } from 'react';
import PrivateRoute from '../../components/auth/PrivateRoute';
import { authContext } from '../../components/contexts/auth.context';
import Navbar from '../../components/Navbar';
import Spinner from '../../components/shared/Spinner';
import { formatDateToLocal } from '../../components/utils/date.util';
import { NewLineToBr } from '../../components/utils/misc.util';
import { imageHolderStyles, initialProfile } from '../profile';

const SingleProfile = () => {
    const [profile, setProfile] = useState(initialProfile);
    const [loading, setLoading] = useState(true);
    const authState = useContext(authContext);
    const router = useRouter();

    const id = router.query.id as string;

    useEffect(() => {
        const get = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/profiles/${id}`);
            const data = await res.json();
            setProfile(data);
            setLoading(false);
        };

        get();
    }, [id]);

    return (
        <Fragment>
            <Head>
                <title>Jobber | Profile</title>
            </Head>
            <Navbar />
            {loading ? (
                <Spinner />
            ) : (
                <Container>
                    <Card sx={{ p: 3, margin: '5rem 0' }}>
                        <div style={{ ...imageHolderStyles, position: 'relative' }}>
                            {authState && authState.user && (
                                <IconButton sx={{ position: 'absolute', top: '0', right: '0' }}>
                                    <Link href="/profile">
                                        <a>
                                            <EditIcon />
                                        </a>
                                    </Link>
                                </IconButton>
                            )}
                            <Avatar
                                alt="Profile Picture"
                                src={profile.profilePicture as string}
                                sx={{ width: 100, height: 100 }}
                            />
                            <Typography variant="h3">
                                {profile.firstName} {profile.lastName}
                            </Typography>
                            <Typography variant="h6">Age: {profile.age}</Typography>
                        </div>
                        <hr />
                        <br />
                        <br />
                        <Typography variant="h5" align="center">
                            Work Experience
                        </Typography>
                        <br />
                        <br />
                        {profile.workExperiences ? (
                            profile.workExperiences.map((experience, index) => (
                                <Card sx={{ p: 3, my: 2 }} key={index}>
                                    <Typography variant="h4">{experience.jobTitle}</Typography>
                                    <Typography variant="h6">{experience.company}</Typography>
                                    <p style={{ fontWeight: 400 }}>
                                        {formatDateToLocal({ oldDate: new Date(experience.startDate), noDay: true })} -{' '}
                                        {formatDateToLocal({ oldDate: new Date(experience.endDate), noDay: true })}
                                    </p>
                                    <p>Job Description</p>
                                    <div>
                                        <NewLineToBr str={experience.jobDescription as string} />
                                    </div>
                                </Card>
                            ))
                        ) : (
                            <Spinner />
                        )}
                    </Card>
                </Container>
            )}
        </Fragment>
    );
};

export default SingleProfile;

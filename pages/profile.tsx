import { Avatar, Button, Card, Container, Grid, TextField } from '@mui/material';
import { Field, FieldArray, Form, Formik } from 'formik';
import Head from 'next/head';
import { CSSProperties, Dispatch, Fragment, SetStateAction, useContext, useEffect, useState } from 'react';
import PrivateRoute from '../components/auth/PrivateRoute';
import { authContext } from '../components/contexts/auth.context';
import TextInput from '../components/form/TextInput';
import WorkInputGroup from '../components/form/WorkInputGroup';
import Navbar from '../components/Navbar';
import { formatDateForInput } from '../components/utils/date.util';

export interface iWorkExperience {
    startDate: string;
    endDate: string;
    jobTitle: string;
    company: string;
    // companyLogo?: string;
    jobDescription?: string;
}

interface iProfile {
    user: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    profilePicture?: string | File | null;
    age?: number;
    workExperiences?: iWorkExperience[];
}

const imageHolderStyles: CSSProperties = {
    width: '100%',
    height: '15rem',
    // backgroundColor: 'lightskyblue',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
};

const initialProfile: iProfile = {
    user: '',
    firstName: '',
    lastName: '',
    email: '',
    profilePicture: '',
    age: 18,
    workExperiences: [],
};

const Profilepage = () => {
    const [profile, setProfile] = useState(initialProfile);
    const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>('');
    const authState = useContext(authContext);

    useEffect(() => {
        const get = async () => {
            if (authState && authState.user) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/profiles/${authState.user.profileId}`);
                const data = await res.json();
                setProfile(data);
            }
        };
        get();
    }, [authState]);

    const handleSubmit = async (profile: iProfile) => {
        console.log(profile);
    };

    const getUrlForImage = (image: File, setter: Dispatch<SetStateAction<string | ArrayBuffer | null>>) => {
        const fileReader = new FileReader();
        if (!fileReader) return;
        fileReader.readAsDataURL(image);
        fileReader.addEventListener('load', function () {
            setter(this.result);
        });
    };

    return (
        <PrivateRoute>
            <Head>
                <title>Jobber | Profile</title>
            </Head>
            <Navbar />
            <Container>
                <Card sx={{ p: 3, margin: '5rem 0' }}>
                    <Formik initialValues={profile} onSubmit={handleSubmit} enableReinitialize>
                        {(formProps: any) => {
                            return (
                                <Form>
                                    <div style={imageHolderStyles}>
                                        <Avatar
                                            alt="Profile Picture"
                                            src={selectedImage ? (selectedImage as string) : ''}
                                            sx={{ width: 100, height: 100 }}
                                        />
                                        <label htmlFor="contained-button-file">
                                            <input
                                                accept="image/*"
                                                id="contained-button-file"
                                                type="file"
                                                style={{ display: 'none' }}
                                                onChange={(e: any) => {
                                                    getUrlForImage(e.target.files[0], setSelectedImage);

                                                    formProps.setFieldValue('profilePicture', e.target.files[0]);
                                                }}
                                            />
                                            <Button variant="contained" component="span">
                                                Upload Image
                                            </Button>
                                        </label>
                                    </div>
                                    <Grid container spacing={2} sx={{ my: 1 }}>
                                        <Grid item md={4}>
                                            <TextInput
                                                margin="normal"
                                                field_name="firstName"
                                                label="First Name"
                                                value={formProps.values.firstName}
                                                formProps={formProps}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item md={4}>
                                            <TextInput
                                                margin="normal"
                                                field_name="lastName"
                                                label="Last Name"
                                                value={formProps.values.lastName}
                                                formProps={formProps}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item md={4}>
                                            <TextInput
                                                margin="normal"
                                                field_name="age"
                                                label="Age"
                                                type="number"
                                                formProps={formProps}
                                                value={formProps.values.age}
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                    <h3>Work Experience</h3>
                                    <FieldArray name="workExperiences">
                                        {({ insert, remove, push }) => {
                                            const { values } = formProps;
                                            return (
                                                <div style={{ margin: '1rem 0' }}>
                                                    {values.workExperiences.map(
                                                        (experience: iWorkExperience, index: number) => (
                                                            <WorkInputGroup
                                                                key={index}
                                                                experience={experience}
                                                                index={index}
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            );
                                        }}
                                    </FieldArray>
                                    <Button type="submit" variant="contained" size="large">
                                        Update Profile
                                    </Button>
                                </Form>
                            );
                        }}
                    </Formik>
                </Card>
            </Container>
        </PrivateRoute>
    );
};

export default Profilepage;

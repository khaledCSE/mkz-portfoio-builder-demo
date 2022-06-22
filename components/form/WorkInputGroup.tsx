import { Grid, TextField } from '@mui/material';
import { Field } from 'formik';
import { FC, Fragment } from 'react';
import { iWorkExperience } from '../../pages/profile';
import { formatDateForInput } from '../utils/date.util';

interface iProps {
    experience: iWorkExperience;
    index: number;
}

const WorkInputGroup: FC<iProps> = (props) => {
    const { experience, index } = props;
    return (
        <Fragment>
            <Grid container spacing={2} sx={{ my: 2 }}>
                <Grid item md={6}>
                    <Field
                        name={`workExperiences.${index}.jobTitle`}
                        render={(renderProps: any) => (
                            <TextField
                                {...renderProps.field}
                                label="Job Title"
                                type="text"
                                value={experience.jobTitle}
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                <Grid item md={6}>
                    <Field
                        name={`workExperiences.${index}.company`}
                        render={(renderProps: any) => (
                            <TextField
                                {...renderProps.field}
                                label="Company"
                                type="text"
                                value={experience.company}
                                fullWidth
                            />
                        )}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ my: 2 }}>
                <Grid item md={6}>
                    <Field
                        name={`workExperiences.${index}.startDate`}
                        render={(renderProps: any) => (
                            <TextField
                                {...renderProps.field}
                                label="Start Date"
                                type="date"
                                value={formatDateForInput(experience.startDate, true)}
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                <Grid item md={6}>
                    <Field
                        name={`workExperiences.${index}.endDate`}
                        render={(renderProps: any) => (
                            <TextField
                                {...renderProps.field}
                                label="End Date"
                                type="date"
                                value={formatDateForInput(experience.endDate, true)}
                                fullWidth
                            />
                        )}
                    />
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default WorkInputGroup;

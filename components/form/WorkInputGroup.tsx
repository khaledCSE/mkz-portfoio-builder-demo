import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Button, Grid, Stack, TextField } from '@mui/material';
import { Field } from 'formik';
import { FC, Fragment } from 'react';
import { iWorkExperience } from '../../pages/profile';
import { formatDateForInput } from '../utils/date.util';

interface iProps {
    experience: iWorkExperience;
    index: number;
    push: any;
    remove: any;
}

const initialExperience: iWorkExperience = {
    company: '',
    endDate: '',
    jobTitle: '',
    startDate: '',
    jobDescription: '',
};

const WorkInputGroup: FC<iProps> = (props) => {
    const { experience, index, push, remove } = props;
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
                                required
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
                                required
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
                                value={
                                    experience.startDate.length > 0
                                        ? formatDateForInput(experience.startDate, true)
                                        : ''
                                }
                                fullWidth
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
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
                                value={
                                    experience.endDate.length > 0 ? formatDateForInput(experience.endDate, true) : ''
                                }
                                fullWidth
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        )}
                    />
                </Grid>
            </Grid>
            <Field
                name={`workExperiences.${index}.jobDescription`}
                render={(renderProps: any) => (
                    <TextField
                        {...renderProps.field}
                        label="Job Description"
                        multiline
                        rows={10}
                        value={experience.jobDescription}
                        fullWidth
                        required
                    />
                )}
            />
            <Stack spacing={2} direction="row" justifyContent="flex-end" sx={{ p: 2 }}>
                <Button variant="outlined" endIcon={<AddIcon />} onClick={() => push(initialExperience)}>
                    Add More
                </Button>
                <Button color="error" variant="outlined" endIcon={<DeleteIcon />} onClick={() => remove(index)}>
                    Delete This
                </Button>
            </Stack>
        </Fragment>
    );
};

export default WorkInputGroup;

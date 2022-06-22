import { CircularProgress } from '@mui/material';

const Spinner = () => {
    return (
        <div
            style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <CircularProgress />
        </div>
    );
};

export default Spinner;

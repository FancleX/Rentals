import { styled, alpha } from '@mui/material/styles';

const ButtonWrapper = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: '1px solid grey.500',
    height: '40px',
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.15),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(5),
        width: 'auto',
    },
}));

export default ButtonWrapper;
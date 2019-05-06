import { fade } from '@material-ui/core/styles/colorManipulator';
import { red, green, grey } from '@material-ui/core/colors';

const styles = theme => ({
    buttonRed: {
        '& svg': { color: red[500] },
        '&:disabled': 'grey',
    },
    buttonGreen: {
        color: green[500],
        '&:disabled': {
            color: grey[400],
        }
    },
    textField: { width: '100%' },
    rejectButton: {
        margin: theme.spacing.unit,
        color: theme.palette.error.main,
        '& svg': theme.palette.error.main,
        '&:disabled': 'grey',
        '&:hover': {
            backgroundColor: fade(theme.palette.error.main, 0.12),
            // Reset on mouse devices
            '@media (hover: none)': {
                backgroundColor: 'transparent'
            }
        }
    },
    formControl: {
        margin: theme.spacing.unit,
    },
    margin: {
        margin: theme.spacing.unit,
    },
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
});

export default styles;

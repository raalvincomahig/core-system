import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
export default function Error(prop) {
    const { message, open, type } = prop;
    console.log(prop);
    const [state, setState] = React.useState({
        open: open,
        Transition: Fade,
    });

    const handleClose = () => {
        setState({
            ...state,
            open: false,
        });
    };

  return (
    <div>
        <Snackbar
            open={state.open}
            onClose={handleClose}
            TransitionComponent={Fade}
            key={state.Transition.name}
        >
            <Alert onClose={handleClose} severity={type}>
                { message }
            </Alert>
        </Snackbar>
    </div>
  );
}
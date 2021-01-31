import React, { 
    // useEffect, 
    useState 
} from "react";
import { 
    Typography,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    TextField,
    Grid,
    Button,
    Snackbar,
    FormControlLabel,
    Checkbox
}  from "@material-ui/core";
import axios from 'axios'
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Login(props) {
    const api_url = `${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_SERVER_PORT}`;
    const { classes } = props;
    const [user, setUser] = useState({
        username: '',
        password: '',
        error: false,
        error_type: 'error',
        error_message: '',
        showPassword: false,
    })
    const [open, setOpen] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submit ', user);
        axios.post(`${api_url}/api/users/login`, user, {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true,
            credentials: 'include'
        }).then(response => {
            console.log(response);
            setUser({
                ...user,
                error_message: 'Successfully Logged in',
                error_type: 'success'
            });
            setOpen(true);
            sessionStorage.setItem('user', JSON.stringify(response.data.user))
            
            window.location.href = '/';
        }).catch(error => {
            console.log(error.response.data);
            
            setUser({
                ...user,
                error_message: error.response.data.message,
                error: true
            });
            setOpen(true);
        })
    }

    return (
        <Grid container>
            <Card className={classes.loginCard}>
                <CardHeader 
                    title={(<>
                            <div className={classes.centerText}>
                                <Typography variant="h5">LOGIN</Typography>
                            </div>
                        </>)}
                />
                <Divider />
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container>
                            <Grid item xs={12}>
                                <TextField name="username" label="Username" className={classes.fullInput} variant="outlined" size="small" onChange={handleChange}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField name="password" type={user.showPassword ? 'text' : 'password' } label="Password" className={classes.fullInput} variant="outlined" size="small" onChange={handleChange}/>
                            </Grid>
                            <Grid item xs={12} className={classes.centerText}>
                                <FormControlLabel 
                                    control={<Checkbox checked={user.showPassword ? true: false} onChange={handleChange} name="showPassword" value={user.showPassword ? true: false}/>}
                                    label="Show Password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" disableElevation  fullWidth={true}>
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
                <Divider />
                <CardActions >
                    <Grid container>
                        <Grid item xs={12} className={classes.centerText}>
                            <Typography variant="overline" >
                                Don't have an account?
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.centerText}>
                            <Button size="small" color="primary" variant="text" href="/register" disableElevation>
                                Register
                            </Button>
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={user.error_type}>
                    {user.error_message}
                </Alert>
            </Snackbar>
        </Grid>
    );
}
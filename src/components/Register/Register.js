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
    Checkbox,
    FormControlLabel,
    Snackbar
}  from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Register(props) {
    const position = [
        'President',
        'Owner',
        'Head of Facility'
    ];
    const { classes } = props;
    const [user, setUser] = useState({
        position: '',
        phone_number: '',
        company: '',
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password: '',
        password_confirmation: '',
        showPassword: false,
        error: {
            phone_number: false,
            position: false,
            company: false,
            first_name: false,
            last_name: false,
            username: false,
            email: false,
            password: false,
            password_confirmation: false
        },
        error_status: false,
        error_type: 'error',
        error_message: ''
    })
    const [open, setOpen] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    const handleChange = (e) => {
        // Check email if valid
        if(e.target.name === 'email') {
            const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            setUser({
                ...user,
                [e.target.name]: e.target.value,
                error: {
                    [e.target.name]: !pattern.test(e.target.value)
                }
            });
        }
        // else if(e.target.name === 'password' || e.target.name === 'password_confirmation') {
        //     // const isPWMatched = user.password.localeCompare(user.password_confirmation);
        //     console.log(user.password === user.password_confirmation);
            
        // }
        else if(e.target.name === 'showPassword') {

            setUser({
                ...user,
                showPassword: !user.showPassword
            });
        }
        else {
            setUser({
                ...user,
                [e.target.name]: e.target.value,
                error: {
                    [e.target.name]: (e.target.value && e.target.value.length > 2 ? false :  true)
                }
            });
        }
        
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_SERVER_PORT}`, user);
        if(user.password === user.password_confirmation) {
            setUser({
                ...user,
                error: {
                    password: false,
                    password_confirmation: false
                },
                error_message: '',
                error_type: 'error',
                error_status: false
            });
            setOpen(false)
        }
        else {
            setUser({
                ...user,
                error: {
                    password: true,
                    password_confirmation: true
                },
                error_message: 'Passwords did not match',
                error_type: 'error',
                error_status: true
            });
            setOpen(true);
        }
        const checkError = (user.error.position || user.error.company || user.error.first_name || user.error.last_name || user.error.username || user.error.email || user.error.password || user.error.password_confirmation);
        if(!checkError) {
            axios.post(`${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_SERVER_PORT}/api/users`, {
                position: user.position,
                company: user.company,
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                phone_number: user.phone_number,
                password: user.password,
                password_confirmation: user.password_confirmation,
            }).then(profile => {
                console.log(profile);
                setUser({
                    ...user,
                    error_status: true,
                    error_message: 'Registration successful',
                    error_type: 'success'
                    
                });
                setOpen(true);
                // Send Email Verification here
                // Clear form
            }).catch(err => {
                const response = err.response.data
                console.log(response)
                if(response.success) {

                }
                else {
                    if(typeof response.details === 'undefined') {
                        // setUser({
                        //     ...user,
                        //     error_status: true,
                        //     error_message: detail.message
                            
                        // });
                    }
                    else {
                        response.details.map(detail => {
                            console.log(detail.path[0])
                            var errorField = detail.path[0];
                            user.error[errorField] = true
                            setUser({
                                ...user,
                                error_status: true,
                                error_message: errorField.toUpperCase() + ' : ' + detail.message
                                
                            });
                            return true;
                        })
                        setOpen(true)
                    }
                }
            })
        }
        
    }
    return (
        <Grid container>
            <Card className={classes.loginCard}>
                <CardHeader 
                    title={(<>
                            <div className={classes.centerText}>
                                <Typography variant="h5">REGISTER</Typography>
                            </div>
                        </>)}
                />
                <Divider />
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Autocomplete
                                    options={position}
                                    onInputChange={(event, newInputValue) => {
                                        setUser({
                                            ...user,
                                            position: newInputValue,
                                            error: {
                                                provider: false
                                            }
                                        })
                                    }}
                                    renderInput={(params) => <TextField {...params} name="position" value={user.position} size="small" onChange={handleChange}  className={classes.fullInput} required label="Position" variant="outlined" />}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    name="company" 
                                    label="Company" 
                                    className={classes.fullInput} 
                                    variant="outlined" 
                                    onChange={handleChange} 
                                    required 
                                    size="small"
                                    error={user.error.company}
                                    value={user.company}
                                    helperText={user.error.company ? 'Enter valid Company' : ''}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                
                                <TextField 
                                    name="first_name" 
                                    label="First name" 
                                    className={classes.halfInputLeft} 
                                    variant="outlined" 
                                    onChange={handleChange} 
                                    required 
                                    size="small"
                                    error={user.error.first_name}
                                    helperText={user.error.first_name ? 'Enter First name' : ''}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField 
                                    name="last_name" 
                                    label="Last name" 
                                    className={classes.halfInputRight} 
                                    variant="outlined" 
                                    onChange={handleChange} 
                                    required 
                                    size="small"
                                    error={user.error.last_name}
                                    helperText={user.error.last_name ? 'Enter Last name' : ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    name="email" 
                                    label="Email" 
                                    className={classes.fullInput} 
                                    variant="outlined" 
                                    onChange={handleChange} 
                                    required 
                                    size="small"
                                    error={user.error.email}
                                    helperText={user.error.email ? 'Enter valid email' : ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    name="phone_number" 
                                    label="Phone #" 
                                    className={classes.fullInput} 
                                    variant="outlined" 
                                    onChange={handleChange} 
                                    required 
                                    size="small"
                                    error={user.error.phone_number}
                                    value={user.phone_number}
                                    helperText={user.error.phone_number ? 'Enter valid Phone #' : ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    name="username" 
                                    label="Username" 
                                    className={classes.fullInput} 
                                    variant="outlined" 
                                    onChange={handleChange} 
                                    required 
                                    size="small"
                                    error={user.error.username}
                                    value={user.username}
                                    helperText={user.error.username ? 'Enter valid Username' : ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    name="password" 
                                    type={user.showPassword ? 'text' : 'password'} 
                                    label="Password" 
                                    className={classes.fullInput} 
                                    variant="outlined"
                                    required 
                                    size="small"
                                    onChange={handleChange} 
                                    alue={user.password}
                                    error={user.error.password}
                                    helperText={user.error.password ? 'Enter Correct Password' : ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    name="password_confirmation" 
                                    type={user.showPassword ? 'text' : 'password'} 
                                    label="Confirm Password" 
                                    className={classes.fullInput} 
                                    variant="outlined"
                                    required 
                                    size="small"
                                    onChange={handleChange} 
                                    value={user.password_confirmation}
                                    error={user.error.password_confirmation}
                                    helperText={user.error.password_confirmation ? 'Password did not match' : ''}
                                />
                            </Grid>
                            <Grid item xs={12} className={classes.centerText}>
                                <FormControlLabel 
                                    control={<Checkbox checked={user.showPassword ? true: false} onChange={handleChange} name="showPassword" value={user.showPassword ? true: false}/>}
                                    label="Show Password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" disableElevation fullWidth={true}>
                                    Register
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
                <Divider />
                <CardActions>
                    <Grid container>
                        <Grid item xs={12} className={classes.centerText}>
                            <Typography variant="overline"  display="block">
                                Already have an account?
                            </Typography>
                        </Grid> 
                        <Grid item xs={12} className={classes.centerText}>
                            <Button size="small" color="primary" variant="text" href="/login" disableElevation>
                                Login
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
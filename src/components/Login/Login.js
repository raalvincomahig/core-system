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
    Button
}  from "@material-ui/core";

export default function Login(props) {

    const { classes } = props;
    const [user, setUser] = useState({
        email: '',
        password: '',
        error: false
    })

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
            error: false
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submit ', user);
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
                                <TextField name="email" label="Email" className={classes.fullInput} variant="outlined" size="small" onChange={handleChange}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField name="password" type="password" label="Password" className={classes.fullInput} variant="outlined" size="small" onChange={handleChange}/>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" disableElevation  fullWidth="true">
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
        </Grid>
    );
}
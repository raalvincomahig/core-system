import React from 'react';
import { 
    Grid,
    Typography,
    Card,
    CardHeader,
    CardContent,
    TextField,
    Divider,
    Button
}  from "@material-ui/core";

export default function Apply(props) {
    const { classes } = props;

    const handleChange = (e) => {
        // setUser({
        //     ...user,
        //     [e.target.name]: e.target.value
        // });
        console.log(e.target.value);
    }

    return (
        <Card elevation={0}>
            <CardHeader 
                    title="Business Application Form"
                    subheader="Please complete the required fields to validate your Business"
            />
            <CardContent>
                <Grid container>
                    <Grid item xs={6}>
                        <TextField name="type_of_application" label="Type of Application" className={classes.halfInputLeft} variant="outlined" size="small" onChange={handleChange}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField name="company_name" label="Company Name" className={classes.halfInputRight} variant="outlined" size="small" onChange={handleChange}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField name="company_address" label="Company Address" className={classes.halfInputLeft} variant="outlined" size="small" onChange={handleChange}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField name="company_phone" label="Company Phone" className={classes.halfInputRight} variant="outlined" size="small" onChange={handleChange}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField name="company_email" label="Company Email" className={classes.halfInputLeft} variant="outlined" size="small" onChange={handleChange}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField name="type_of_business" label="Type of Business" className={classes.halfInputRight} variant="outlined" size="small" onChange={handleChange}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField name="number_of_employees" label="Number of Employees" className={classes.halfInputLeft} variant="outlined" size="small" onChange={handleChange}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField name="last_years_gross_income" label="Last year Gross Income" className={classes.halfInputRight} variant="outlined" size="small" onChange={handleChange}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="industry" label="Industry" className={classes.fullInput} variant="outlined" size="small" onChange={handleChange}/>
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" color="primary" component="span" className={classes.fullButton} disableElevation>
                            SUBMIT
                        </Button>
                    </Grid>
                    <Grid item xs={4}></Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
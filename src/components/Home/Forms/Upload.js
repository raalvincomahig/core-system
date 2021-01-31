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
import BackupIcon from '@material-ui/icons/Backup';

export default function Upload(props) {
    const { classes } = props;
    return (
        <Grid item xs={12}>
            <Card elevation={0}>
                <CardHeader 
                    title="UPLOAD"
                    subheader="Upload the necessary Business Documents for Validation"
                />
                <CardContent>
                    <Grid container>
                        <Grid item xs={7}>
                            <input
                                accept="image/*"
                                className={classes.upload_input}
                                type="file"
                                name="previous_year_permit_file"
                                id="previous_year_permit_file"
                            />
                            <label htmlFor="previous_year_permit_file">
                                <Button variant="contained" color="primary" component="span" className={classes.fullButton} disableElevation>
                                    Previous Year's Permit &nbsp; <BackupIcon />
                                </Button>
                            </label>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography align="center">No File uploaded</Typography>
                        </Grid>
                        <Divider className={classes.spacer_1} />
                    </Grid>
                    
                    <Grid container>
                        <Grid item xs={7}>
                            <input
                                accept="image/*"
                                className={classes.upload_input}
                                type="file"
                                name="previous_year_clearance_file"
                                id="previous_year_clearance_file"
                            />
                            <label htmlFor="previous_year_clearance_file">
                                <Button variant="contained" color="primary" component="span" className={classes.fullButton} disableElevation>
                                    Previous Clearance File &nbsp; <BackupIcon />
                                </Button>
                            </label>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography align="center">No File uploaded</Typography>
                        </Grid>
                        <Divider className={classes.spacer_1} />
                    </Grid>

                    <Grid container>
                        <Grid item xs={7}>
                            <input
                                accept="image/*"
                                className={classes.upload_input}
                                type="file"
                                name="previous_clearance_health_sanitary"
                                id="previous_clearance_health_sanitary"
                            />
                            <label htmlFor="previous_clearance_health_sanitary">
                                <Button variant="contained" color="primary" component="span" className={classes.fullButton} disableElevation>
                                    Previous Clearance - Health / Sanitary &nbsp; <BackupIcon />
                                </Button>
                            </label>
                        </Grid>

                        <Grid item xs={5}>
                            <Typography align="center">No File uploaded</Typography>
                        </Grid>
                        <Divider className={classes.spacer_1} />
                    </Grid>

                    <Grid container>
                        <Grid item xs={7}>
                            <input
                                accept="image/*"
                                className={classes.upload_input}
                                type="file"
                                name="current_community_tax"
                                id="current_community_tax"
                            />
                            <label htmlFor="current_community_tax">
                                <Button variant="contained" color="primary" component="span" className={classes.fullButton} disableElevation>
                                    Community Tax - Current Year &nbsp; <BackupIcon />
                                </Button>
                            </label>
                        </Grid>

                        <Grid item xs={5}>
                            <Typography align="center">No File uploaded</Typography>
                        </Grid>
                        <Divider className={classes.spacer_1} />
                    </Grid>
                    <Grid container>
                        <Grid item xs={7}>
                            <input
                                accept="image/*"
                                className={classes.upload_input}
                                type="file"
                                name="gross_sales_receipts_of_preceding_year"
                                id="gross_sales_receipts_of_preceding_year"
                            />
                            <label htmlFor="gross_sales_receipts_of_preceding_year">
                                <Button variant="contained" color="primary" component="span" className={classes.fullButton} disableElevation>
                                    Gross Sales Receipts of Preceding Year &nbsp; <BackupIcon />
                                </Button>
                            </label>
                        </Grid>

                        <Grid item xs={5}>
                            <Typography align="center">No File uploaded</Typography>
                        </Grid>
                        <Divider className={classes.spacer_1} />
                    </Grid>
                    <Grid container>
                        <Grid item xs={7}>
                            <input
                                accept="image/*"
                                className={classes.upload_input}
                                type="file"
                                name="official_receipts_showing_all_regulatory_fees"
                                id="official_receipts_showing_all_regulatory_fees"
                            />
                            <label htmlFor="official_receipts_showing_all_regulatory_fees">
                                <Button variant="contained" color="primary" component="span" className={classes.fullButton} disableElevation>
                                    Official Receipts Showing All Regulatory Fees &nbsp; <BackupIcon />
                                </Button>
                            </label>
                        </Grid>

                        <Grid item xs={5}>
                            <Typography align="center">No File uploaded</Typography>
                        </Grid>
                        <Divider className={classes.spacer_1} />
                    </Grid>
                    <Grid container>
                        <Grid item xs={7}>
                            <input
                                accept="image/*"
                                className={classes.upload_input}
                                type="file"
                                name="certificate_attesting_tax_exemptions"
                                id="certificate_attesting_tax_exemptions"
                            />
                            <label htmlFor="certificate_attesting_tax_exemptions">
                                <Button variant="contained" color="primary" component="span" className={classes.fullButton} disableElevation>
                                    Certificate Attesting Tax Exemptions &nbsp; <BackupIcon />
                                </Button>
                            </label>
                        </Grid>

                        <Grid item xs={5}>
                            <Typography align="center">No File uploaded</Typography>
                        </Grid>
                        <Divider className={classes.spacer_1} />
                    </Grid>
                    <Grid container>
                        <Grid item xs={7}>
                            <input
                                accept="image/*"
                                className={classes.upload_input}
                                type="file"
                                name="dti_sec_certification"
                                id="dti_sec_certification"
                            />
                            <label htmlFor="dti_sec_certification">
                                <Button variant="contained" color="primary" component="span" className={classes.fullButton} disableElevation>
                                    DTI/SEC Certification &nbsp; <BackupIcon />
                                </Button>
                            </label>
                        </Grid>

                        <Grid item xs={5}>
                            <Typography align="center">No File uploaded</Typography>
                        </Grid>
                        <Divider className={classes.spacer_1} />
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    )
}
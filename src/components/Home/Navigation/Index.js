import React from 'react';
import { 
    Card,
    CardHeader,
    CardContent,
    Divider,
    Grid,
    IconButton,
    Avatar,
    Link,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
}  from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Alert, AlertTitle } from '@material-ui/lab';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import BusinessIcon from '@material-ui/icons/Business';


export default function Navigation(props) {
    const { user, classes } = props;
    const handleLogout = () => {
        sessionStorage.clear();
        window.location.href = '/login';
    }
    return (
        <Card elevation={0}>
            <CardHeader 
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {user.first_name[0]}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="Logout" onClick={handleLogout}>
                        <ExitToAppIcon />
                    </IconButton>
                    }
                title={`${user.first_name} ${user.last_name}`}
                subheader={`${user.company} ${user.position}`}
            />
            <Divider />
            <CardContent>
                <Grid item xs={12}>
                    <List component="nav" aria-label="User information">
                    <ListItem button>
                        <ListItemIcon>
                            <MailOutlineIcon />
                        </ListItemIcon>
                        <ListItemText primary="Email" secondary={user.email} />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <PhoneAndroidIcon />
                        </ListItemIcon>
                        <ListItemText primary="Phone" secondary={user.phone_number} />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <BusinessIcon />
                        </ListItemIcon>
                        <ListItemText primary="Company" secondary={user.company} />
                    </ListItem>
                    </List>
                    <List component="nav" aria-label="User information">
                    
                    </List>
                </Grid>
                <Divider className={classes.spacer_1} />
                <Grid item xs={12}>
                    <Alert severity="info" icon={<HelpOutlineIcon fontSize="inherit" />}>
                        <AlertTitle>FREQUENTLY ASKED QUESTIONS</AlertTitle>
                        Check out our helpful information and guide — <Link href="#" onClick={e => e.preventDefault()}>View more</Link>
                    </Alert>
                </Grid>
                <p className={classes.spacer_1}></p>
                <Grid item xs={12}>
                    <Alert severity="warning" icon={<GetAppIcon fontSize="inherit" />}>
                        <AlertTitle>DOWNLOADABLES</AlertTitle>
                        Download our Checklist of requirements — <Link href="#" onClick={e => e.preventDefault()}>View more</Link>
                    </Alert>
                </Grid>
            </CardContent>
        </Card>
    );
}
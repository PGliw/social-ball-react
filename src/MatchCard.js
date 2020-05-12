import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import LocationIcon from '@material-ui/icons/LocationOn';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 600,
    },
    media: {
        height: 0,
        paddingTop: '25%',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    rightAvatarGroup: {
        marginLeft: '8px',
    }
}));

export default function MatchCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const formatDate = (date) => {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('pl-PL', options);
    }

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={props.avatar}
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={props.author}
                subheader={formatDate(props.date)}
            />
            <CardMedia
                className={classes.media}
                image={props.image}
            />
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Typography variant="h6">
                                    Super mecz
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container direction="row" justify="flex-end">
                                    <Grid item>
                                        <Typography variant="caption" color="textSecondary">
                                            Wrocław, Soccerfield
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <LocationIcon style={{ fontSize: 16 }} color="disabled"/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid> 
                        <Typography variant="subtitle2" color="textSecondary">
                            18 czerwca 2020
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                            <Grid item align="right">
                                <Typography variant="subtitle2" color="textSecondary">
                                    Ziomale
                                </Typography>
                                <AvatarGroup max={4}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                    <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                                    <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                                </AvatarGroup>
                            </Grid>
                            <Grid item align="center">
                                vs
                            </Grid>
                            <Grid item align="left">
                                <Typography variant="subtitle2" color="textSecondary">
                                    Mordeczki
                                </Typography>
                                <AvatarGroup max={4} className={classes.rightAvatarGroup}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                    <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                                    <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                                </AvatarGroup>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus semper magna nec eleifend. Pellentesque at arcu lacus. Curabitur ut diam ut ex condimentum molestie vitae eget ante. Fusce aliquam, purus ut posuere porttitor, ipsum ante ornare magna, ac efficitur.
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.description}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
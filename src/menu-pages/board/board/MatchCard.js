import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import LocationIcon from '@material-ui/icons/LocationOn';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import {PositionPicker} from "./PositionPicker";
import TextField from "@material-ui/core/TextField";

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
    comment: {
        width: "100%",
        borderRadius: 32,
        backgroundColor: theme.palette.grey[200],
        boxShadow: "none"
    }
}));

const formatDate = (date) => {
    var options = {year: 'numeric', month: 'long', day: 'numeric'};
    return date.toLocaleDateString('pl-PL', options);
};

function Comment(props) {
    const classes = useStyles();

    return (
        <Grid item xs={12}>
            <Card className={classes.comment}>
                <CardHeader
                    avatar={props.avatar}
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon/>
                        </IconButton>
                    }
                    title={props.author}
                    subheader={props.content}
                />
            </Card>
        </Grid>
    )
}

export default function MatchCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const match = props.footballMatch;
    const author = match.organizer.firstName + match.organizer.lastName;
    const authorAvatar = author.image ?
        <Avatar alt={author} src="/static/images/avatar/2.jpg"/>
        :
        <Avatar alt={author} src={author.image}/>;
    const startDateTime = new Date(match.beginningTime);
    const endDateTime = new Date(match.endingTime);
    const [team1, team2] = props.footballMatch.teams;
    const team1ConfirmedMembers = team1 ? team1.teamMembers.filter(teamMember => teamMember.user) : [];
    const team2ConfirmedMembers = team2 ? team2.teamMembers.filter(teamMember => teamMember.user) : [];

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const formatDate = (date) => {
        const options = {year: 'numeric', month: 'long', day: 'numeric'};
        return date.toLocaleDateString('pl-PL', options);
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={authorAvatar}
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon/>
                    </IconButton>
                }
                title={author}
                subheader={formatDate(startDateTime)}
            />
            <CardContent>
                {
                    props.positions && match.teams && match.teams.length > 0 ?
                        <PositionPicker teams={match.teams} positions={props.positions}/>
                        : null
                }
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Typography variant="h6">
                                    {match.title}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container direction="row" justify="flex-end">
                                    <Grid item>
                                        <Typography variant="caption" color="textSecondary">
                                            {match.pitch ? match.pitch.name : ''}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <LocationIcon style={{fontSize: 16}} color="disabled"/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Typography variant="subtitle2" color="textSecondary">
                            {startDateTime.toLocaleDateString()}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                            <Grid item align="right">
                                <Typography variant="subtitle2" color="textSecondary">
                                    {team1 ? team1.name : ''}
                                </Typography>
                                <AvatarGroup max={4}>
                                    {team1ConfirmedMembers.map(teamMember => {
                                            const alt = teamMember.user.firstName + " " + teamMember.user.lastName;
                                            const src = teamMember.user.image ? teamMember.user.image : "/static/images/avatar/1.jpg"; // TODO
                                            return <Avatar alt={alt} src={src}/>
                                        }
                                    )}

                                </AvatarGroup>
                            </Grid>
                            <Grid item align="center">
                                vs
                            </Grid>
                            <Grid item align="left">
                                <Typography variant="subtitle2" color="textSecondary">
                                    {team2 ? team2.name : ''}
                                </Typography>
                                <AvatarGroup max={4}>
                                    {team1ConfirmedMembers.map(teamMember => {
                                            const alt = teamMember.user.firstName + " " + teamMember.user.lastName;
                                            const src = teamMember.user.image ? teamMember.user.image : "/static/images/avatar/1.jpg"; // TODO
                                            return <Avatar alt={alt} src={src}/>
                                        }
                                    )}
                                </AvatarGroup>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {match.description}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon/>
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon/>
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon/>
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Grid container className={classes.messageArea} spacing={1}>
                                {props.comments.map((comment) =>
                                    <Comment
                                        avatar={comment.avatar}
                                        author={comment.author}
                                        date={comment.date}
                                        content={comment.content}
                                    />
                                )}
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container xs={12} spacing={1} fullWidth>
                                <Grid item>
                                    <Avatar alt="Natalia Wcisło" src="/static/images/avatar/2.jpg"/>
                                </Grid>
                                <Grid item xs>
                                    <TextField
                                        id="firstName"
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        placeholder="Napisz komentarz..."
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Collapse>
        </Card>
    );
}

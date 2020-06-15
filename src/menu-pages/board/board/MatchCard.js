import React, {Fragment, useEffect, useState} from 'react';
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
import {MatchSquad} from "./MatchSquad";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {formatDate} from "../../../utils/helpers"
import {TIME} from "../../../api/constants";
import {TShirtPlayer} from "../../../forms/new_match/teambuilder/TShirtPlayer";
import ProfilePlaceholder from "../../../assets/profile-placeholder.png";
import RoundedImage from "react-rounded-image";
import Tooltip from "@material-ui/core/Tooltip";
import {withMaterialDialog} from "../../../hoc/withMaterialDialog";
import {MatchProtocol} from "../../../forms/match_protocol/MatchProtocol";
import {Confirmation} from "../../../common/Confirmation";
import {API_METHODS, withTokenFetchFromApi} from "../../../api/baseFetch";
import Paper from "@material-ui/core/Paper";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import {OtherUserProfile} from "../../profile/OtherUserProfile";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 900,
        minWidth: 600,
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
    },
    pastMatchStatus: {
        background: "#bfbfbf",
        color: "#4a4a4a",
        padding: '2px',
    },
    presentMatchStatus: {
        background: "#fafaaa",
        color: "#3c008a",
        padding: '2px',
    },
    futureMatchStatus: {
        background: "#abffce",
        padding: '2px',
    },
    openProtocolButton: {
        float: "right",
    }
}));

const Comment = (props) => {
    const classes = useStyles();
    const [isPopupOpened, setPopupOpened] = useState(false);
    const cardProps = {
        avatar: props.avatar,
        title: props.author,
        subheader: props.content,
    };
    if (!!props.deletable && !!props.onDelete) {
        cardProps.action =
            <Fragment>
                <IconButton aria-label="settings" onClick={() => setPopupOpened(!isPopupOpened)}>
                    <MoreVertIcon/>
                </IconButton>
                {
                    isPopupOpened
                        ? <Paper>
                            <MenuList>
                                <MenuItem onClick={props.onDelete}>Usuń</MenuItem>
                            </MenuList>
                        </Paper>
                        : null
                }
            </Fragment>
    }

    return (
        <Grid item xs={12}>
            <Card className={classes.comment}>
                <CardHeader {...cardProps}/>
            </Card>
        </Grid>
    )
};

export default function MatchCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const match = props.footballMatch;
    const author = match.details.organizer;
    const startDateTime = new Date(match.beginningTime);
    const endDateTime = new Date(match.endingTime);
    const [team1, team2] = props.footballMatch.details.teams;
    const [isProtocolOpened, setProtocolOpened] = useState(false);
    const team1ConfirmedMembers = team1 ? team1.teamMembers.filter(teamMember => teamMember.user) : [];
    const team2ConfirmedMembers = team2 ? team2.teamMembers.filter(teamMember => teamMember.user) : [];
    const [isConfirmationLoading, setConfirmationLoading] = useState(false);
    const [isConfirmationSuccessful, setConfirmationSuccessful] = useState(null);
    const [error, setError] = useState(null);
    const [newMatchMemberDto, setNewMatchMemberDto] = useState(null);
    const [confirmationMessage, setConfirmationMessage] = useState(null);
    const [comments, setComments] = useState(null);
    const [areCommentsLoading, setCommentsLoading] = useState(null);
    const [newCommentContent, setNewCommentContent] = useState(null);
    const [displayedFriendId, setDisplayedFriendId] = useState(null);
    const [displayedFriend, setDisplayedFriend] = useState(null);

    const handleNewCommentContentChange = (event) => {
        setNewCommentContent(event.target.value);
    };

    useEffect(() => {
        if (error) {
            console.error(error); // TODO
            alert(error)
        }
    }, [error]);

    useEffect(() => {
        if (!comments && expanded) {
            fetchComments();
        }
    }, [expanded]);

    useEffect(() => {
        if (displayedFriendId) {
            const fetchFromApiWithToken = withTokenFetchFromApi(props.token);
            fetchFromApiWithToken(
                API_METHODS.GET,
                `users/${displayedFriendId}`,
                () => {
                }, // TODO
                setError,
                setDisplayedFriend)
        } else {
            setDisplayedFriend(null);
        }
    }, [displayedFriendId]);


    useEffect(() => {
        if (newMatchMemberDto) {
            if (newMatchMemberDto.userId) {
                setConfirmationMessage("Czy chcesz zagrać na wybranej pozycji?")
            } else {
                setConfirmationMessage("Czy chcesz zrezygnować z gry na dotychczasowej pozycji?")
            }
        } else {
            setConfirmationMessage(null);
        }
    }, [newMatchMemberDto]);

    const handleImportantActionSuccess = () => {
        setConfirmationSuccessful(true);
        props.refreshMatch();
        resetNewMatchMemberDto();
    };


    const handleNewComments = (commentsResponse) => {
        setComments(commentsResponse)
    };

    const fetchComments = () => {
        const fetchFromProtectedApi = withTokenFetchFromApi(props.token);
        fetchFromProtectedApi(
            API_METHODS.GET,
            `comments?matchId=${props.footballMatch.id}`,
            setCommentsLoading,
            setError,
            handleNewComments
        );
    };

    const deleteComment = (commentId) => {
        const fetchFromProtectedApi = withTokenFetchFromApi(props.token);
        fetchFromProtectedApi(
            API_METHODS.DELETE,
            `comments/${commentId}`,
            setCommentsLoading,
            setError,
            fetchComments
        );
    };

    const addComment = () => {
        const commentDto = {
            dateOfAddition: new Date().toISOString(),
            content: newCommentContent,
            relatedMatchId: props.footballMatch.id,
            relatedMatchMemberId: props.footballMatch.currentUserMatchMemberId
        };
        const fetchFromProtectedApi = withTokenFetchFromApi(props.token);
        fetchFromProtectedApi(
            API_METHODS.POST,
            `comments`,
            setCommentsLoading,
            setError,
            fetchComments,
            commentDto
        );
    };

    const getAvatarOf = (user) => {
        if (!!user) {
            if (!!user.image) {
                return <Avatar alt={user.firstName} src={user.image}/>
            } else if (!!user.firstName) {
                return <Avatar alt={user.firstName}>
                    {user.firstName.charAt(0)}
                </Avatar>
            }
        }
        return <Avatar alt="Nieznany" src={ProfilePlaceholder}/>
    };

    const commentResponseToComment = (commentResponse) => {
        const commentProps = {
            avatar: [getAvatarOf(!!commentResponse.relatedMatchMember ? commentResponse.relatedMatchMember.user : null)],
            author: [!!commentResponse.relatedMatchMember && !!commentResponse.relatedMatchMember.user
                ? commentResponse.relatedMatchMember.user.firstName
                : "Nieznany"],
            date: [new Date(commentResponse.dateOfAddition)],
            content: [commentResponse.content],
        };
        if (!!props.footballMatch.currentUserMatchMemberId
            && !!commentResponse.relatedMatchMember
            && commentResponse.relatedMatchMember.id === props.footballMatch.currentUserMatchMemberId) {
            commentProps.deletable = true;
            commentProps.onDelete = () => deleteComment(commentResponse.id);
        }
        return <Comment {...commentProps}/>
    };


    const putMatchMember = () => {
        if (!!newMatchMemberDto) {
            const fetchFromProtectedApi = withTokenFetchFromApi(props.token);
            fetchFromProtectedApi(
                API_METHODS.PUT,
                `matchMembers/${newMatchMemberDto.id}`,
                setConfirmationLoading,
                setError,
                handleImportantActionSuccess,
                newMatchMemberDto
            );
        } else {
            console.error("Cannot put - newMatchMemberDto is null");
        }
    };

    const resetNewMatchMemberDto = () => {
        setNewMatchMemberDto(null);
        setConfirmationSuccessful(null);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const renderTimeStatus = (match) => {
        const statusTime = match.statusTime;
        switch (statusTime) {
            case TIME.PAST:
                return <div className={classes.pastMatchStatus}>Mecz zakończony
                    ({match.score ? match.score : "- : -"})
                    <Button className={classes.openProtocolButton} onClick={() => setProtocolOpened(true)}>
                        Protokół pomeczowy
                    </Button>
                    <div style={{clear: "both"}}/>
                </div>;
            case TIME.PRESENT: {
                const actualTime = new Date() - startDateTime; // TODO display minute and second of the match
                return <div className={classes.presentMatchStatus}>W trakcie spotkania</div>;
            }
            case TIME.FUTURE:
                return <div className={classes.futureMatchStatus}>Propozycja meczu</div>;
            default:
                console.error("Invalid match status time: " + statusTime);
        }
    };

    const matchMemberMapper = (matchMember, team) => {
        if (matchMember.user) {
            let toolTipTitle;
            let onClick;
            if (props.currentUser && props.currentUser.id === matchMember.user.id) {
                toolTipTitle = "Zrezygnuj";
                // resign onClick
                onClick = () => {
                    const dto = {
                        id: matchMember.id,
                        positionId: matchMember.positionId,
                        teamId: matchMember.teamId,
                        userId: null,
                        confirmed: false, // TODO ?
                    };
                    setNewMatchMemberDto(dto);
                };
            } else {
                toolTipTitle = "Zobacz profil";
                onClick = () => {
                    setDisplayedFriendId(matchMember.user.id)
                }
            }

            return <Tooltip title={toolTipTitle}>
                <div onClick={onClick}>
                    <RoundedImage
                        image={matchMember.user && matchMember.user.image ? matchMember.user.image : ProfilePlaceholder}
                        roundedColor={team.shirtColours}
                        roundedSize="13"
                        imageWidth="80"
                        imageHeight="80"
                    />
                </div>
            </Tooltip>
        } else if (props.footballMatch && !!props.footballMatch.currentUserPositionName) {
            return <Tooltip title="Już bierzesz udział w tym meczu. Żeby zmienić pozycje, zrezygnuj z dotychczasowej">
                <div>
                    {TShirtPlayer({color: team.shirtColours})}
                </div>
            </Tooltip>
        } else {
            const onClick = () => {
                const dto = {
                    id: matchMember.id,
                    positionId: matchMember.positionId,
                    teamId: matchMember.teamId,
                    userId: props.currentUser.id,
                    confirmed: false, // TODO ?
                };
                setNewMatchMemberDto(dto);
            };
            return <Tooltip title="Dołącz do gry">
                <div onClick={onClick}>
                    {TShirtPlayer({color: team.shirtColours})}
                </div>
            </Tooltip>
        }
    };

    return (
        <Fragment>
            <Card className={classes.root}>
                {renderTimeStatus(props.footballMatch)}
                <CardHeader
                    avatar={getAvatarOf(author)}
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon/>
                        </IconButton>
                    }
                    title={author.firstName + " " + author.lastName}
                    subheader={formatDate(startDateTime)}
                />
                <CardContent>
                    {
                        props.positions && match.details.teams && match.details.teams.length > 0 ?
                            <MatchSquad teams={match.details.teams} positions={props.positions}
                                        matchMemberMapper={matchMemberMapper}/>
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
                                        {team1ConfirmedMembers.map(teamMember => getAvatarOf(teamMember.user))}
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
                                        {team2ConfirmedMembers.map(teamMember => getAvatarOf(teamMember.user))}
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
                                    {!!comments && comments.length > 0
                                        ? comments.map((comment) => commentResponseToComment(comment))
                                        : <p>Brak komentarzy</p>
                                    }
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                {
                                    !!props.footballMatch.currentUserPositionName
                                        ?
                                        <Grid container xs={12} spacing={1} fullWidth>
                                            <Grid item>{getAvatarOf(props.currentUser)}</Grid>
                                            <Grid item xs>
                                                <TextField
                                                    id="new-comment"
                                                    fullWidth
                                                    variant="outlined"
                                                    size="small"
                                                    placeholder="Napisz komentarz..."
                                                    value={newCommentContent}
                                                    onChange={handleNewCommentContentChange}
                                                />
                                            </Grid>
                                            {
                                                !!newCommentContent && newCommentContent.length > 0
                                                    ? <Grid item>
                                                        <Button onClick={addComment}>Opublikuj</Button>
                                                    </Grid>
                                                    : null
                                            }
                                        </Grid>
                                        :
                                        <p>
                                            Tylko uczestnicy meczu mogą komentować. Wybierz pozycję, aby dodać
                                            komentarz.
                                        </p>
                                }
                            </Grid>
                        </Grid>
                    </CardContent>
                </Collapse>
            </Card>
            {withMaterialDialog(MatchProtocol, isProtocolOpened, () => setProtocolOpened(false), null)({
                token: props.token,
                match: props.footballMatch,
            })}
            {withMaterialDialog(Confirmation, !!confirmationMessage, resetNewMatchMemberDto, "Potwierdzenie")({
                message: confirmationMessage,
                isLoading: isConfirmationLoading,
                onYes: putMatchMember,
                onNo: resetNewMatchMemberDto,
                isSuccessful: isConfirmationSuccessful,
            })}
            {withMaterialDialog(OtherUserProfile,
                !!displayedFriendId,
                () => setDisplayedFriendId(null),
                displayedFriend ? displayedFriend.firstName + " " + displayedFriend.lastName : null
            )(
                {
                    token: props.token,
                    user: displayedFriend,
                    userId: displayedFriendId,
                })}
        </Fragment>
    );
}

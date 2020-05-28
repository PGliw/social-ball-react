import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import {POSITION_NAMES, SIDE_NAMES} from "../../../api/constants";
import Grid from "@material-ui/core/Grid";
import SoccerFieldImage from "../../../assets/Soccer_field.png";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    footballPitch: {
        backgroundImage: `url(${SoccerFieldImage})`,
        backgroundRepeat: 'no-repeat',
        //backgroundSize: '100% auto',
        backgroundSize: 'contain',
    },
    playersLine: {
        //height: '300px'
    }
}));


export const PositionPicker = ({teams, positions}) => {
        const classes = useStyles();
        const withPositions = (positions) => (team) => {
            const teamMembers = team.teamMembers.map(teamMember => {
                const position = positions.find(pos => teamMember.positionId === pos.id);
                return {...teamMember, position}
            });
            const obj = {...team};
            obj.teamMembers = teamMembers;
            return obj;
        };


        const team1 = withPositions(positions)(teams[0]);
        const team2 = withPositions(positions)(teams[1]);


        const withNullPlayer = (player) => {
            if (player) return player.id;
            else return null;
        };

        const linesOfTeam = (team, isRightSide = false) => {
            const positionNames = [POSITION_NAMES.GOALKEEPER, POSITION_NAMES.DEFENDER, POSITION_NAMES.MIDFIELD, POSITION_NAMES.FORWARD];
            const sideNames = [SIDE_NAMES.LEFT, SIDE_NAMES.MIDDLE_LEFT, SIDE_NAMES.MIDDLE, SIDE_NAMES.MIDDLE_RIGHT, SIDE_NAMES.RIGHT];
            if (isRightSide) {
                positionNames.reverse();
                sideNames.reverse();
            }
            return positionNames.map(positionName => {
                let playersLines = [];
                if (positionName === POSITION_NAMES.GOALKEEPER) {
                    const foundGoalkeeper = team.teamMembers.find(teamMember => teamMember.position.name === positionName);
                    playersLines.push([null, null, foundGoalkeeper, null, null]);
                } else {
                    playersLines.push(sideNames.map(sideName => team.teamMembers.find(teamMember => teamMember.position.name === positionName && teamMember.position.side === sideName)));
                }
                return (
                    playersLines.map(playersLine =>
                        <Box p={1} bgcolor="grey.300" display="flex" flexDirection={"column"} className={classes.playersLine}>
                            {
                                playersLine.map(player =>
                                    <Box p={1}
                                         bgcolor="grey.300">
                                        {withNullPlayer(player)}
                                    </Box>
                                )
                            }
                        </Box>
                    )
                );
            });
        };


        const team1Lines = linesOfTeam(team1);
        const team2Lines = linesOfTeam(team2, true);

        return (
            <Grid container className={classes.footballPitch}>
                <Grid item xs={6}>
                    <Box
                        display="flex"
                        flexWrap="nowrap"
                        p={1}
                        m={1}
                    >
                        {team1Lines}
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box
                        display="flex"
                        flexWrap="nowrap"
                        p={1}
                        m={1}
                    >
                        {team2Lines}
                    </Box>
                </Grid>
            </Grid>);
    }
;

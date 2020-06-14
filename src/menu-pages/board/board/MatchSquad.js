import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {POSITION_NAMES, SIDE_NAMES} from "../../../api/constants";
import {TShirtPlayer} from "../../../forms/new_match/teambuilder/TShirtPlayer";
import styles from "../../../forms/new_match/teambuilder/TeamBuilder.module.css"
import Soccer_field from "../../../assets/Soccer_field.png";

const useStyles = makeStyles((theme) => ({
    lineStyle: {
        display: 'flex',
        // justifyContent: 'space-between',
        flexDirection: 'column',
        padding: '2px',
        border: '2px solid green',
        justifyContent: 'center',
        flexBasis: '100%',
    }
}));


const Pitch = (props) => {
    return <div className={styles.pitchContainer}>
        <img className={styles.responsivePitch} draggable="false" src={Soccer_field} alt="Soccer field"/>
        {props.children}
    </div>
};

const PitchHalf = (props) => {
    const isRightSide = props.isRightSide;
    const pitchHalfStyle = isRightSide === true ? {right: "7%"} : {left: "7%"};
    return (
        <div className={styles.pitchHalf} style={pitchHalfStyle}>
            {props.children}
        </div>
    );
};

// matchMemberMapper: (matchMember, team) => (color) => Component({})
export const MatchSquad = ({teams, positions, matchMemberMapper = ((matchMember, team) => TShirtPlayer({color: team.shirtColours}))}) => {
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


        const lineOfPlayersToLine = (lineOfPlayers, team) => {
            return <div className={classes.lineStyle}>
                {/*{lineOfPlayers.map(item => TShirtPlayer({color: color}))}*/}
                {lineOfPlayers.map(matchMember => matchMemberMapper(matchMember, team))}
            </div>;
        };

        const linesOfTeam = (team, isRightSide = false) => {
            const positionNames = [POSITION_NAMES.GOALKEEPER, POSITION_NAMES.DEFENDER, POSITION_NAMES.MIDFIELD, POSITION_NAMES.FORWARD];
            const sideNames = [SIDE_NAMES.LEFT, SIDE_NAMES.MIDDLE_LEFT, SIDE_NAMES.MIDDLE, SIDE_NAMES.MIDDLE_RIGHT, SIDE_NAMES.RIGHT];
            let playersLines = [];
            positionNames.forEach(positionName => {
                if (positionName === POSITION_NAMES.GOALKEEPER) {
                    const foundGoalkeeper = team.teamMembers.find(teamMember => teamMember.position.name === positionName);
                    playersLines.push(!!foundGoalkeeper ? [foundGoalkeeper] : []);
                } else {
                    playersLines.push(sideNames.map(sideName => team.teamMembers.find(teamMember => teamMember.position.name === positionName && teamMember.position.side === sideName)).filter(teamMember => !!teamMember));
                }
            });
            return <PitchHalf
                isRightSide={isRightSide}
            >
                {playersLines.map(playersLine => lineOfPlayersToLine(playersLine, team))}
            </PitchHalf>

        };

        return (
            <Pitch>
                {linesOfTeam(team1)}
                {linesOfTeam(team2, true)}
            </Pitch>);
    }
;



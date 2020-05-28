import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    playerBox: {}

}));


export const PositionPicker = ({teams, positions}) => {
    const classes = useStyles();
    const withPositions = (positions) => (team) => team.teamMembers.map(teamMember => {
        const position = positions.find(pos => teamMember.positionId === pos.id);
        return {...teamMember, position}
    });

    const team1 = withPositions(positions)(teams[0]);
    const team2 = withPositions(positions)(teams[1]);

    const positionNames = [];
    const sideNames = [];

    return (
        <Box
            display="flex"
            flexWrap="nowrap"
            p={1}
            m={1}
            bgcolor="background.paper"
            css={{maxWidth: 300}}
        >
            <Box p={1} bgcolor="grey.300" display="flex" flexDirection={"column"}>
                <Box p={1} bgcolor="grey.300">
                </Box>
                <Box p={1} bgcolor="grey.300">
                </Box>
                <Box p={1} bgcolor="grey.300">
                </Box>
                <Box p={1} bgcolor="grey.300">
                </Box>
                <Box p={1} bgcolor="grey.300">
                </Box>
            </Box>
            <Box p={1} bgcolor="grey.300">
                Item 2
            </Box>
            <Box p={1} bgcolor="grey.300">
                Item 3
            </Box>
            <Box p={1} bgcolor="grey.300">
                Item 4
            </Box>
        </Box>);
};

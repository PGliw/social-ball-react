import React, {forwardRef, useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {API_METHODS, withTokenFetchFromApi} from "../../api/baseFetch";
import Button from "@material-ui/core/Button";
import {EVENT_NAMES} from "../../api/constants";
import MaterialTable from 'material-table'
import Box from "@material-ui/core/Box";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {isEmpty, notNullOrEmptyValues} from "../../utils/helpers";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(6),
    },
    paper: {
        padding: theme.spacing(1),
        margin: theme.spacing(2),
    },
    paperBox: {
        padding: theme.spacing(1),
    },
    dialogPaper: {
        minHeight: '10vh',
        maxHeight: '100vh',
    },
    table: {
        minWidth: 650,
    }
}));

export const MatchProtocol = ({token, matchId}) => {
    const classes = useStyles();
    const [isEditable, setEditable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [existingEvents, setExistingEvents] = useState(null);
    const [events, setEvents] = useState(null);
    const [match, setMatch] = useState(null);
    const [isEditMode, setEditMode] = useState(false);
    const [user, setUser] = useState(null);
    const [isProtocolAdded, setProtocolAdded] = useState(false);
    const [data, setData] = useState([]);

    const eventResponseToData = (ev) => {
        // return {type: ev.type, dateTime: ev.dateTime, team: ev.teamName, matchMember: ev.matchMemberResponse}
        const matchMemberName = firstAndLastNameOf(ev.matchMemberResponse);
        return {type: ev.type, dateTime: ev.dateTime, team: ev.teamName, matchMember: matchMemberName}
    };

    const dataToEventDto = (dt) => {
        if (match && match.teams && match.teams.length > 0) {
            const type = dt.type;
            const matchedTeam = match.teams.find(team => team.name === dt.team);
            const matchedPlayer = matchedTeam.teamMembers.map(member => dt.matchMember === firstAndLastNameOf(member));
            const matchMemberId = matchedPlayer ? matchedPlayer.id : null;
            const footballMatchId = match.id;
            const dateTime = dt.dateTime ? dt.dateTime.toISOString() : null;
            return {type, matchMemberId, footballMatchId, dateTime}
        }
    };

    const firstAndLastNameOf = (matchMemberResponse) => {
        return matchMemberResponse.user ? matchMemberResponse.user.firstName + ' ' + matchMemberResponse.user.lastName : "Nieznany"
    };

    useEffect(() => {
        if (events) {
            const newData = events.map(event => eventResponseToData(event));
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    setData(newData);
                    resolve();
                }, 1000)
            })
        }
    }, [events]);

    useEffect(() => {
        if (existingEvents) {
            setEvents([...existingEvents]);
        }
    }, [existingEvents]);

    useEffect(() => {
        if (user && user.email && match && match.organizer && user.email === match.organizer.email) {
            setEditable(true);
        }
    }, [user, match]);

    useEffect(() => {
        if (!isEditMode) {
            const fetchFromApiWithToken = withTokenFetchFromApi(token);
            fetchFromApiWithToken(
                API_METHODS.GET,
                'profile',
                setLoading,
                setError,
                setUser);
        }
    }, [token]);

    useEffect(() => {
        if (!isEditMode) {
            const fetchFromApiWithToken = withTokenFetchFromApi(token);
            fetchFromApiWithToken(
                API_METHODS.GET,
                `footballMatches/${matchId}`,
                setLoading,
                setError,
                setMatch);
        }
    }, [token]);

    useEffect(() => {
        if (!isEditMode) {
            const fetchFromApiWithToken = withTokenFetchFromApi(token);
            fetchFromApiWithToken(
                API_METHODS.GET,
                `footballMatches/${matchId}/events`,
                setLoading,
                setError,
                setExistingEvents);
        }
    }, [token]);

    const handleCancel = () => {
        setEvents(existingEvents);
        setEditMode(false);
    };

    const handleSave = () => {
        const eventsDtos = data.map(dataToEventDto).filter(dto => notNullOrEmptyValues(dto));
        const protocolDto = {
            events: eventsDtos
        };
        const fetchFromApiWithToken = withTokenFetchFromApi(token);
        fetchFromApiWithToken(
            API_METHODS.POST,
            `footballMatches/${matchId}/events`,
            setLoading,
            setError,
            () => setProtocolAdded(true),
            protocolDto);
        setEditMode(false);
    };

    const [columns, setColumns] = useState([
        {
            title: 'Zdarzenie',
            field: 'type',
            // lookup: EVENT_NAMES
        },
        {title: 'Minuta', field: 'dateTime', type: 'time'},
        {
            title: 'Drużyna',
            field: 'team',
            // lookup: {},
        },
        {
            title: 'Gracz',
            field: 'matchMember',
            // lookup: {},
        },
    ]);

    if (match && match.hasProtocol === false && !isEditMode) {
        return <Box>
            <h3>Brak protokołu pomeczowego</h3>
            {isEditable ? <Button onClick={() => setEditMode(false)}>Dodaj</Button> : null}
        </Box>
    } else if (events && events.length === 0 && !isEditMode) {
        return <Box>
            <h3>Brak zarejestrowanych zdarzeń</h3>
            {isEditable ? <Button onClick={() => setEditMode(true)}>Dodaj</Button> : null}
        </Box>
    } else if (!data || !match) {
        return "Pobieranie informacji..."
    } else if (isEditMode) {
        return (
            <Box>
                <MaterialTable
                    title="Protokół pomeczowy"
                    columns={columns}
                    data={data}
                    icons={tableIcons}
                    editable={{
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    setData([...data, newData]);

                                    resolve();
                                }, 1000)
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataUpdate = [...data];
                                    const index = oldData.tableData.id;
                                    dataUpdate[index] = newData;
                                    setData([...dataUpdate]);

                                    resolve();
                                }, 1000)
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataDelete = [...data];
                                    const index = oldData.tableData.id;
                                    dataDelete.splice(index, 1);
                                    setData([...dataDelete]);

                                    resolve()
                                }, 1000)
                            }),
                    }}
                />
                <Button onClick={handleCancel}>Anuluj</Button>
                <Button onClick={handleSave}>Zapisz</Button>
            </Box>);
    } else {
        return <Box>
            <MaterialTable
                title="Protokół pomeczowy"
                columns={columns}
                icons={tableIcons}
                data={data}/>
            {isEditable && !isProtocolAdded ? <Button onClick={() => setEditMode(true)}>Edytuj</Button> : null}
            {isProtocolAdded ? <h2>✅ Dodano</h2> : null}
        </Box>
    }
};



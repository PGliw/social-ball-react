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
import {getKeyByValue, isEmpty, notNullOrEmptyValues} from "../../utils/helpers";

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

export const MatchProtocol = ({token, match}) => {
    const classes = useStyles();
    const isEditable = match.currentUserOrganizer;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [existingEvents, setExistingEvents] = useState(null);
    const [events, setEvents] = useState(null);
    const [isEditMode, setEditMode] = useState(false);
    const [isProtocolAdded, setProtocolAdded] = useState(false);
    const [data, setData] = useState([]);
    const [protocolReloader, setProtocolReoalder] = useState(false);


    const createMatchMemberLookup = () => {
        const teamMemberLists = match.details.teams.map(team => team.teamMembers);
        const matchMembers = [...teamMemberLists[0], ...teamMemberLists[1]];
        const matchMembersLookup = {};
        matchMembers.forEach((obj) => {
            matchMembersLookup[obj.id] = firstAndLastNameOf(obj);
        });
        return matchMembersLookup;
    };

    const eventResponseToData = (ev) => {
        // return {type: ev.type, dateTime: ev.dateTime, team: ev.teamName, matchMember: ev.matchMemberResponse}
        // const matchMemberName = firstAndLastNameOf(ev.matchMemberResponse);
        const typeKey = getKeyByValue(EVENT_NAMES, ev.type);
        return {
            id: ev.id,
            type: typeKey,
            dateTime: ev.dateTime ? new Date(ev.dateTime) : null,
            matchMember: ev.matchMemberResponse.id
        }
    };

    const dataToEventDto = (dt) => {
        const type = EVENT_NAMES[dt.type];
        const matchMemberId = dt.matchMember ? dt.matchMember : null;
        let dateTime = null;
        if (dt.dateTime
            && dt.dateTime.getMonth
            && typeof dt.dateTime.getMonth === 'function'
            && match
            && match.beginningTime
        ) {
            const matchStartDate = new Date(match.beginningTime);
            dateTime = new Date(matchStartDate.getTime());
            dateTime.setHours(dt.dateTime.getHours());
            dateTime.setMinutes(dt.dateTime.getMinutes());
            dateTime.setSeconds(dt.dateTime.getSeconds());
            dateTime = dt.dateTime.toISOString();
        } else {
            console.log("Invalid date obj: " + dt.dateTime);
        }
        return {id: dt.id, type, matchMemberId, dateTime}
    };

    function firstAndLastNameOf(matchMemberResponse) {
        return matchMemberResponse.user ? matchMemberResponse.user.firstName + ' ' + matchMemberResponse.user.lastName : "Nieznany"
    }

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
        if (!isEditMode) {
            const fetchFromApiWithToken = withTokenFetchFromApi(token);
            fetchFromApiWithToken(
                API_METHODS.GET,
                `footballMatches/${match.id}/events`,
                setLoading,
                setError,
                setExistingEvents);
        }
    }, [token]);

    const handleCancel = () => {
        setEvents(existingEvents);
        setEditMode(false);
    };

    const handleProtocolAdded = () => {
        setProtocolReoalder(!protocolReloader);
        setProtocolAdded(true);
    };

    const handleSave = () => {
        console.log(data);
        const eventsDtos = data.map(dataToEventDto).filter(dto => !!dto && !!dto.matchMemberId);
        const protocolDto = {
            events: eventsDtos
        };
        console.log(protocolDto);
        const fetchFromApiWithToken = withTokenFetchFromApi(token);
        fetchFromApiWithToken(
            API_METHODS.POST,
            `footballMatches/${match.id}/events`,
            setLoading,
            setError,
            handleProtocolAdded,
            protocolDto);
        setEditMode(false);
    };


    if (!match.teams || !match.teams.length < 2) {
        return <p>Brak informacji o drużynach</p>
    }
    const matchMembersLookup = createMatchMemberLookup();
    const columns = [
        {
            title: 'Zdarzenie',
            field: 'type',
            lookup: EVENT_NAMES
        },
        {title: 'Czas zdarzenia', field: 'dateTime', type: 'time'},
        {
            title: 'Gracz',
            field: 'matchMember',
            lookup: matchMembersLookup,
        },
    ];

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
                                    console.log([...data, newData]);
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
                                    console.log([...dataUpdate]);
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



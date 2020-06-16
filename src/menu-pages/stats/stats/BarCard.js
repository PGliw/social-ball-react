import React, {useEffect, useState} from "react";
import clsx from 'clsx';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {API_METHODS, withTokenFetchFromApi} from "../../../api/baseFetch";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export const data = {
  labels: ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug'],
  datasets: [
    {
      label: 'Ten tydzień',
      backgroundColor: "#43ad32",
      data: [18, 5, 19, 27, 29, 19, 20]
    },
    {
      label: 'Poprzedni tydzień',
      backgroundColor: "#AAAAAA",
      data: [11, 20, 12, 29, 30, 25, 13]
    }
  ]
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  legend: { display: false },
  cornerRadius: 20,
  tooltips: {
    enabled: true,
    mode: 'index',
    intersect: false,
    borderWidth: 1,
    borderColor: "#666666",
    backgroundColor: "#FFFFFF",
    titleFontColor: "#000000",
    bodyFontColor: "#111111",
    footerFontColor: "#111111"
  },
  layout: { padding: 0 },
  scales: {
    xAxes: [
      {
        barThickness: 12,
        maxBarThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
        ticks: {
          fontColor: "#111111"
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: "#111111",
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: "#666666",
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: "#666666"
        }
      }
    ]
  }
};

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 400,
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

export const BarCard = ({token, logout}) => {
  const classes = useStyles();
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [monthsNumber, setMonthsNumber] = useState(6);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  const transformData = (data) => {
    // 0: {month: "JUNE 2020", matches: 8, players: 0}
    // 1: {month: "MAY 2020", matches: 0, players: 0}
    // 2: {month: "APRIL 2020", matches: 0, players: 0}
    // 3: {month: "MARCH 2020", matches: 0, players: 0}

    return {
      labels: data.map(x => capitalizeFirstLetter(x.month)).reverse(),
      datasets: [
        {
          label: 'Mecze',
          backgroundColor: "#43ad32",
          data: data.map(x => x.matches).reverse()
        },
        {
          label: 'Zawodnicy',
          backgroundColor: "#AAAAAA",
          data: data.map(x => x.players).reverse()
        }
      ]
    };
  }

  const fetchData = () => {
    const fetchFromProtectedApi = withTokenFetchFromApi(token);
    fetchFromProtectedApi(
        API_METHODS.GET,
        `statistics/time?monthsNumber=${monthsNumber}`,
        setLoading,
        setError,
        data => setData(transformData(data.timeStats)),
    );
  }
  
  useEffect(fetchData, [token, monthsNumber]);

  const handleChange = (event) => {
    setMonthsNumber(event.target.value);
  };

  return (
    <Card
      className={classes.root}
    >
      <CardHeader
        action={
          <Select
            value={monthsNumber}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value={3}>Ostatni kwartał</MenuItem>
            <MenuItem value={6}>Ostatnie pół roku</MenuItem>
            <MenuItem value={12}>Ostatni rok</MenuItem>
          </Select>
        }
        title="Statystyki czasowe"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Bar
            data={data}
            options={options}
          />
        </div>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
        >
          Przegląd <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

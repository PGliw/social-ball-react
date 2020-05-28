import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const mockData = [
  {
    customer: {
      name: 'Ekaterina Tankova'
    },
    createdAt: 26
  },
  {
    customer: {
      name: 'Cao Yu'
    },
    createdAt: 24
  },
  {
    customer: {
      name: 'Alexa Richardson'
    },
    createdAt: 17
  }
];

export const Leaderboards = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [orders] = useState(mockData);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <Button
            color="primary"
            size="small"
            variant="outlined"
          >
            New entry
          </Button>
        }
        title="Latest Orders"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Miejsce</TableCell>
                  <TableCell>Zawodnik</TableCell>
                  <TableCell>Strzały</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order, i) => (
                  <TableRow
                    hover
                    key={order.id}
                  >
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <Avatar alt="Natalia Wcisło" src="/static/images/avatar/2.jpg" />
                            {order.customer.name}
                        </div>
                    </TableCell>
                    <TableCell>
                      {order.createdAt}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
        >
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};
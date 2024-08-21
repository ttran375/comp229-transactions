import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import auth from "../services/auth-helper.js";
import { listByAccount } from "../services/api-transaction.js";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
    fontSize: "1.2em",
  },
}));

export default function MyTransactions() {
  const classes = useStyles();
  const { accountId } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const jwt = auth.isAuthenticated();
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    listByAccount({ accountId }, { t: jwt.token }, signal).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setTransactions(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [accountId, jwt.token]);
  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString("en-US", options);
  };
  return (
    <Paper className={classes.root} elevation={4}>
      <Typography type="title" className={classes.title}>
        Account History
      </Typography>
      <List dense>
        {transactions.map((transaction, i) => (
          <span key={i}>
            <ListItem>
              <ListItemText
                primary={`Amount: $${transaction.amount}`}
                secondary={
                  <>
                    {`From: ${transaction.fromAccount.accountNumber} To: ${
                      transaction.toAccount.accountNumber
                    } - ${formatDate(transaction.date)}`}
                    <br />
                    {`Description: ${transaction.description}`}
                  </>
                }
              />
            </ListItem>
            <Divider />
          </span>
        ))}
        {transactions.length === 0 && !error && (
          <Typography>No transactions found for this account.</Typography>
        )}
        {error && <Typography color="error">{error}</Typography>}
      </List>
    </Paper>
  );
}

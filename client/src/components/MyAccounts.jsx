import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Edit from "@material-ui/icons/Edit";
import Divider from "@material-ui/core/Divider";
import auth from "../services/auth-helper.js";
import { listByOwner } from "../services/api-account.js";
import { Navigate, Link } from "react-router-dom";
import DeleteAccount from "./DeleteAccount.jsx";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(
      1
    )}px`,
    color: theme.palette.protectedTitle,
    fontSize: "1.2em",
  },
  addButton: {
    float: "right",
  },
  leftIcon: {
    marginRight: "8px",
  },
}));

export default function MyAccounts() {
  const classes = useStyles();
  const [accounts, setAccounts] = useState([]);
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const jwt = auth.isAuthenticated();
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    listByOwner({ userId: jwt.user._id }, { t: jwt.token }, signal).then(
      (data) => {
        if (data.error) {
          setRedirectToSignin(true);
        } else {
          setAccounts(data);
        }
      }
    );
    return function cleanup() {
      abortController.abort();
    };
  }, []);
  const removeAccount = (account) => {
    const updatedAccounts = [...accounts];
    const index = updatedAccounts.indexOf(account);
    updatedAccounts.splice(index, 1);
    setAccounts(updatedAccounts);
  };
  if (redirectToSignin) {
    return <Navigate to="/signin" />;
  }
  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Your Accounts
          <span className={classes.addButton}>
            <Link to="/account/new">
              <Button color="primary" variant="contained">
                <Edit className={classes.leftIcon} /> New Account
              </Button>
            </Link>
          </span>
        </Typography>
        <List dense>
          {accounts.map((account, i) => (
            <span key={i}>
              <ListItem
                button
                component={Link}
                to={`/account/${account._id}/transactions`}
              >
                <ListItemText
                  primary={account.accountNumber}
                  secondary={`Balance: $${account.balance}`}
                />
                {auth.isAuthenticated().user &&
                  auth.isAuthenticated().user._id === account.owner._id && (
                    <ListItemSecondaryAction>
                      <Link to={`/account/edit/${account._id}`}>
                        <IconButton aria-label="Edit" color="primary">
                          <Edit />
                        </IconButton>
                      </Link>
                      <DeleteAccount
                        account={account}
                        onRemove={removeAccount}
                      />
                    </ListItemSecondaryAction>
                  )}
              </ListItem>
              <Divider />
            </span>
          ))}
        </List>
      </Paper>
    </div>
  );
}

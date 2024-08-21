import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import auth from "../services/auth-helper.js";
import { makeStyles } from "@material-ui/core/styles";
import { read, update } from "../services/api-account.js";
import { Navigate, useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    textAlign: "center",
    paddingBottom: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
    fontSize: "1.2em",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
}));

export default function EditAccount() {
  const classes = useStyles();
  const { accountId } = useParams();
  const [values, setValues] = useState({
    accountNumber: "",
    balance: "",
    redirect: false,
    error: "",
  });
  const jwt = auth.isAuthenticated();
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    read({ accountId: accountId }, signal).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          accountNumber: data.accountNumber,
          balance: data.balance,
        });
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [accountId]);
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const clickSubmit = () => {
    const account = {
      accountNumber: values.accountNumber || undefined,
      balance: values.balance || 0,
    };
    update({ accountId: accountId }, { t: jwt.token }, account).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, redirect: true });
      }
    });
  };
  if (values.redirect) {
    return <Navigate to="/accounts" />;
  }
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography type="headline" component="h2" className={classes.title}>
          Edit Account
        </Typography>
        <TextField
          id="accountNumber"
          label="Account Number"
          className={classes.textField}
          value={values.accountNumber}
          onChange={handleChange("accountNumber")}
          margin="normal"
          disabled
        />
        <TextField
          id="balance"
          label="Balance"
          className={classes.textField}
          value={values.balance}
          onChange={handleChange("balance")}
          type="number"
          margin="normal"
        />
        {values.error && (
          <Typography component="p" color="error">
            {values.error}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          variant="contained"
          onClick={clickSubmit}
          className={classes.submit}
        >
          Update
        </Button>
      </CardActions>
    </Card>
  );
}

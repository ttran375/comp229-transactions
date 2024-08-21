import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { create } from "../services/api-transaction.js";
import auth from "../services/auth-helper.js";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
    fontSize: "1.2em",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
}));

export default function NewTransaction() {
  const classes = useStyles();
  const [values, setValues] = useState({
    amount: "",
    fromAccountNumber: "",
    toAccountNumber: "",
    description: "",
    redirect: false,
    error: "",
  });
  const jwt = auth.isAuthenticated();
  if (!jwt.user.active) {
    return <Navigate to="/" />;
  }
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const clickSubmit = () => {
    const transaction = {
      amount: values.amount || 0,
      fromAccountNumber: values.fromAccountNumber || undefined,
      toAccountNumber: values.toAccountNumber || undefined,
      description: values.description || "",
    };
    create({ t: jwt.token }, transaction).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", redirect: true });
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
          New Transaction
        </Typography>
        <TextField
          id="fromAccountNumber"
          label="From Account Number"
          className={classes.textField}
          value={values.fromAccountNumber}
          onChange={handleChange("fromAccountNumber")}
          margin="normal"
        />
        <TextField
          id="toAccountNumber"
          label="To Account Number"
          className={classes.textField}
          value={values.toAccountNumber}
          onChange={handleChange("toAccountNumber")}
          margin="normal"
        />
        <TextField
          id="amount"
          label="Amount"
          className={classes.textField}
          value={values.amount}
          onChange={handleChange("amount")}
          type="number"
          margin="normal"
        />
        <TextField
          id="description"
          label="Description"
          className={classes.textField}
          value={values.description}
          onChange={handleChange("description")}
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
          Submit
        </Button>
        <Button variant="contained" className={classes.submit}>
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}

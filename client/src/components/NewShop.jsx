import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { create } from "../services/api-account.js";
import { Link, Navigate } from "react-router-dom";
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
    fontSize: "1em",
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

export default function NewAccount() {
  const classes = useStyles();
  const [values, setValues] = useState({
    accountNumber: "",
    balance: "",
    redirect: false,
    error: "",
  });
  const jwt = auth.isAuthenticated();
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const clickSubmit = () => {
    const account = {
      accountNumber: values.accountNumber || undefined,
      balance: values.balance || 0,
    };
    console.log("Creating account with data:", account);
    create({ userId: jwt.user._id }, { t: jwt.token }, account).then((data) => {
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
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            New Account
          </Typography>
          <TextField
            id="accountNumber"
            label="Account Number"
            className={classes.textField}
            value={values.accountNumber}
            onChange={handleChange("accountNumber")}
            margin="normal"
          />
          <TextField
            id="balance"
            label="Initial Balance"
            value={values.balance}
            onChange={handleChange("balance")}
            className={classes.textField}
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
            Submit
          </Button>
          <Link to="/accounts" className={classes.submit}>
            <Button variant="contained">Cancel</Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
}

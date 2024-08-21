const create = async (credentials, transaction) => {
  try {
    let response = await fetch("/api/transaction", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: JSON.stringify(transaction),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const listByAccount = async (params, credentials, signal) => {
  try {
    let response = await fetch("/api/transactions/" + params.accountId, {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const remove = async (params, credentials) => {
  try {
    let response = await fetch("/api/transaction/" + params.transactionId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export { create, listByAccount, remove };

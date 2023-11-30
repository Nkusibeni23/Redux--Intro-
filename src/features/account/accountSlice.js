const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "DEPOSIT":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case "WITHDRAWAL":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "REQUEST_LOAN":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        // LATER
        loanPurpose: action.payload.loanPurpose,
        balance: state.balance + action.payload.amount,
      };
    case "PAY_LOAN":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    case "account/convertingCurrency":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}
export function Deposit(amount, currency) {
  if (currency === "USD") return { type: "DEPOSIT", payload: amount };

  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });
    // API call
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );

    const data = await res.json();
    const converted = data.rates.USD;

    // return action
    dispatch({ type: "DEPOSIT", payload: converted });
  };
}

export function Withdraw(amount) {
  return { type: "WITHDRAWAL", payload: amount };
}

export function Request_Loan(amount, loanPurpose) {
  return { type: "REQUEST_LOAN", payload: { amount, loanPurpose } };
}

export function Pay_Loan() {
  return { type: "PAY_LOAN" };
}

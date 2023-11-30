const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "DEPOSIT":
      return {
        ...state,
        balance: state.balance + action.payload,
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
    default:
      return state;
  }
}
export function Deposit(amount) {
  return { type: "DEPOSIT", payload: amount };
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

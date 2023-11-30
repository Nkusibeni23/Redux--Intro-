import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

function accountReducer(state = initialStateAccount, action) {
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

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

// store.dispatch({ type: "DEPOSIT", payload: 500 });
// store.dispatch({ type: "WITHDRAWAL", payload: 100 });
// console.log(store.getState());
// store.dispatch({
//   type: "REQUEST_LOAN",
//   payload: {
//     amount: 1000,
//     loanPurpose: "car",
//   },
// });
// console.log(store.getState());
// store.dispatch({ type: "PAY_LOAN" });
// console.log(store.getState());

// const ACCOUNT_DEPOSIT = "DEPOSIT";

function Deposit(amount) {
  return { type: "DEPOSIT", payload: amount };
}
function Withdraw(amount) {
  return { type: "WITHDRAWAL", payload: amount };
}

function Request_Loan(amount, loanPurpose) {
  return { type: "REQUEST_LOAN", payload: { amount, loanPurpose } };
}

function Pay_Loan() {
  return { type: "PAY_LOAN" };
}

store.dispatch(Deposit(500));
console.log(store.getState());
store.dispatch(Withdraw(100));
console.log(store.getState());
store.dispatch(Request_Loan(1000, "car"));
console.log(store.getState());
store.dispatch(Pay_Loan());
console.log(store.getState());

function createCustomer(fullName, nationalId) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalId, createdAt: new Date().toISOString() },
  };
}
function updateName(fullName) {
  return {
    type: "customer/updateName",
    payload: fullName,
  };
}

store.dispatch(createCustomer("Benny Chrispin", "1234567890"));
console.log(store.getState());
store.dispatch(Deposit(300));
console.log(store.getState());

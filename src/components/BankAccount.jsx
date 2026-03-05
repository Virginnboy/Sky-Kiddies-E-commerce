import { useQuery } from "@tanstack/react-query";
import { fetchBankDetails } from "../util";
import Spinner from "./Spinner";
import "../components/BankAccount.css";
import { Link } from "react-router-dom";

const BankAccount = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["bankAccount"],
    queryFn: fetchBankDetails
  });

  if (isLoading) {
    return <div style={{width: "100%", height: "70vh", margin: "auto"}}>
      <Spinner />;
    </div>
  }

  console.log(data)

  return (
    <div className="bank-container">
      <div className="bank-header">
        <Link className="add-btn" to="/admin-dashboard/add/bank-account">+ Add Account</Link>
      </div>

      <main className="bank-main">
        <h1>Account Details</h1>

        <ul className="account-list">
          {data.map((acct) => (
            <li className="account-card" key={acct._id}>
              <div className="bank-top">
                <h3>{acct.bankName}</h3>
                <span className="account-type">{acct.accountType}</span>
              </div>

              <div className="bank-body">
                <p className="account-name">{acct.accountName}</p>
                <p className="account-number">{acct.accountNumber}</p>
              </div>

              <Link className="edit-btn" to={`/admin-dashboard/edit/bank-details/${acct._id}`}>Edit Account</Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default BankAccount;
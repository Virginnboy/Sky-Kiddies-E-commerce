import "../components/BankInput.css";

export default function BankInput({acct, isPending}) {
  return (
    <div>
      <div className="form-group">
        <label htmlFor="bankName">Bank Name</label>
        <input 
          type="text" 
          name="bankName" 
          className="form-input" 
          defaultValue={acct?.bankName}
          />
      </div>

      <div className="form-group">
        <label htmlFor="bankName">Account Name</label>
        <input 
          type="text" 
          name="accountName" 
          className="form-input" 
          defaultValue={acct?.accountName}
          />
      </div>

      <div className="form-group">
        <label htmlFor="accountNumber">Account Number</label>
        <input 
          type="text" 
          name="accountNumber" 
          className="form-input"
          defaultValue={acct?.accountNumber}
          />
      </div>

      <div className="form-group">
        <label className="radio-group-label">Account Type</label>

        <div className="radio-group">
          <label className="radio-option">
            <input
              type="radio"
              name="accountType"
              value="Checking"
            />
            Checking
          </label>

          <label className="radio-option">
            <input
              type="radio"
              name="accountType"
              value="Savings"
            />
            Savings
          </label>
        </div>
      </div>

      <button className="save-btn" type="submit">{isPending? "Saving..." : "Save Account"}</button>
    </div>
  )
}
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { addAccount } from "../services/services";
import toast from "react-hot-toast";
import BankInput from "../components/BankInput";
import "../pages/AddBankDetails.css";


export default function AddBankDetails() {
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: addAccount,
    onSuccess: (res)=> {
      navigate("/admin-dashboard/bank-account")
      toast.success(res?.message)
    },
    onError: (err)=> {
      console.log(err)
      toast.error(err.response?.message)
    }
  })

  const handleSubmit = (e)=> {
    e.preventDefault()
    const formData = new FormData(e.target);
    const accountInfo = {
      bankName: formData.get("bankName"),
      accountName: formData.get("accountName"),
      accountNumber: formData.get("accountNumber"),
      accountType: formData.get("accountType")
    };

    mutate(accountInfo)
  }

  return (
    <div className="add-account-container">
        <div>
          <button onClick={()=>navigate(-1)} className="back-btn">
            <FaArrowLeft className="back-icon"/>
          </button>
        </div>

      <form onSubmit={handleSubmit} className="bank-account-container">
        <h1 className="bank-account-title">Add Account</h1>

        <div className="form-wrapper">
          <BankInput isPending={isPending}/>
        </div>
      </form>
    </div>

  )
}
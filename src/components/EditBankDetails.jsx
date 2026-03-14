import BankInput from "./BankInput";
import "../components/EditBankDetails.css";
import api from "../axios";
import { useLoaderData } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { editAccountDetails } from "../util";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const EditBankDetails = () => {
  const navigate = useNavigate();
  const account = useLoaderData();
  const params = useParams();
  
  const {mutate, isPending} = useMutation({
    mutationFn: editAccountDetails,

    onSuccess: (res)=> {
      navigate("/admin-dashboard/bank-account")
      toast.success(res?.message)
    },

    onError: (err)=> {
      toast.error(err?.response?.data.message)
    }
  })

  const handleEditAccountDetails = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);

    const editedInfo = {
      bankName: formData.get("bankName"),
      accountName: formData.get("accountName"),
      accountNumber: formData.get("accountNumber"),
      accountType: formData.get("accountType")
    };

    const accountId = params.accountId

    mutate({accountId, editedInfo})
  }

  return (
    <div className="edit-bank-container">
        <div>
          <button onClick={()=>navigate(-1)} className="back-btn">
            <FaArrowLeft size={30} className="back-icon"/>
          </button>
        </div>
      <form className="edit-account-form" onSubmit={handleEditAccountDetails}>
        <h1>Edit Account</h1>

        <div>
          <BankInput acct={account} isPending={isPending}/>
        </div>
      </form>   
    </div>

  )
}

export default EditBankDetails

export async function loader({params}) {
  const accountId = params.accountId
  console.log(accountId)
  try {
    const response = await api.get(`/admin/get-bank-details/${accountId}`);
    return response.data

  }catch(err) {
    console.log(err);
    throw new Response("Failed to fetch account", {status: 500})
  }
}
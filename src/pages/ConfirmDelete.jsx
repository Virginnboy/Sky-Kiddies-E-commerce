import Modal from "../components/Modal";

export default function ConfirmDelete() {
  return (
    <Modal>
      <h3>Are you Sure You want to Delete this product?</h3>

      <div style={{display: "flex", justifyContent: "space-between"}}>
        <button style={{backgroundColor: "white", fontSize: "17px"}}>Close</button>
        <button style={{fontSize: "15px", padding: "7px 20px"}}>Yes</button>
      </div>
    </Modal>
  )
}
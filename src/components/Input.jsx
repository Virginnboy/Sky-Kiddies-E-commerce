import "../components/Input.css";

export default function Input({id, label, textarea, ...props}) {
  return (
      <div className="custom-input">

        <label htmlFor={id}>{label}</label>

        {textarea? (
          <textarea id={id} name={id} {...props} required/>
        ) : (
          <input id={id} name={id} {...props} required/>
        )}
      </div>
  )
}
export function Truncate({text, length}) {
    if (text.length > length) 
      return <span>{text.slice(0, length)} ....</span>
  return (
    <span>{text}</span>
  )
};
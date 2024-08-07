interface SentMessageProps {
  sentChat: string
}
function SentMessage({sentChat}:SentMessageProps) {
  return (
    <div className="bg-blue-500 text-white p-3 rounded-lg inline-block self-end mb-2">
        <p className='text-right'>
            {sentChat}
        </p>
    </div>
  )
}

export default SentMessage
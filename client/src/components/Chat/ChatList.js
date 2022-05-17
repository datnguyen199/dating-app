import React, { useEffect, useState } from 'react'

function ChatList({ listMessage, matchUsers, user, setDisplayChat, setRecipient }) {
  const [lastReadAt, setLastReadAt] = useState('')

  const recipientId = 
    listMessage[0]['message']['sender_id'] === user.id ? 
    listMessage[0]['message']['recipient_id'] : 
    listMessage[0]['message']['sender_id']

  const recipient = matchUsers.find((matchUser) => matchUser.id === recipientId)

  const newMessages = lastReadAt ? listMessage.filter((message) => message.message.created_at > lastReadAt).length : listMessage.length
  const numberOfUnReadMessages = newMessages === 100 ? "99+" : newMessages

  useEffect(() => {
    if (user.id) {
      fetch(`/api/users/${user.id}/matches/${recipientId}`)
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => setLastReadAt(data.last_read_at))
        }
      })
    }    
  }, [user.id, recipientId, setLastReadAt])

  function handleClick() {
    setDisplayChat(true)
    setRecipient(recipient)
  }

  if (listMessage.length === 0) {
    return null
  }

  return (
    <div className="chat-list" onClick={handleClick}>
      <div className="chat-list-img-name">
        <img src={recipient.url1} className="profile-photo" alt="profile" />
        <div>
          <h3>{recipient.first_name}</h3>
          <p>{listMessage[0]['message']['content']}</p>
        </div>
      </div> 
      {newMessages !== 0 && <p className="unread-messages">{numberOfUnReadMessages}</p>}     
            
    </div>
  )
}

export default ChatList
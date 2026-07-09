import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'
import '../style/Homepage.css'

/* ── Icon components ──────────────────────────────────────── */
const LogoIcon = () => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
    </svg>
)

const PlusIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
)

const ChatIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
)

const SendIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
)

const getMessageText = (message) => {
    if (typeof message?.content === 'string') return message.content
    if (message?.content && typeof message.content === 'object') {
        return message.content.content ?? message.content.message ?? message.content.text ?? ''
    }
    if (typeof message?.message === 'string') return message.message
    if (typeof message?.text === 'string') return message.text
    return ''
}

/* ── Main Component ───────────────────────────────────────── */
const HomePage = () => {
    const chat = useChat()

    const chats = useSelector((state) => state.chat.chats)
    const currentChatId = useSelector((state) => state.chat.currentChatId)

    const [message, setMessage] = useState('')

    const currentMessages = currentChatId && chats[currentChatId]
        ? chats[currentChatId].messages
        : []
    
    console.log(currentMessages);
    
    /* Socket init */
    useEffect(() => {
        chat.initSocketConnection()
    }, [])

    /* Send — placeholder, real API to be wired up later */
    async function handleSend() {
        chat.handleSendMessages({ message, currentChatId })

    }

    return (
        <div className="hp-root">
            {/* ── Sidebar ── */}
            <aside className="hp-sidebar" aria-label="Chat history">
                {/* Brand */}
                <div className="hp-sidebar-header">
                    <div className="hp-logo-mark" aria-hidden="true"><LogoIcon /></div>
                    <span className="hp-brand-name">Perplexity</span>
                </div>

                {/* New Chat */}
                <button
                    id="new-chat-btn"
                    className="hp-new-chat-btn"
                    aria-label="Start new chat"
                >
                    <PlusIcon /> New Thread
                </button>

                {/* History */}
                <span className="hp-chat-list-label">Recents</span>
                <nav className="hp-chat-list" aria-label="Recent chats">
                    {Object.values(chats).map(c => (
                        <button
                            key={c._id}
                            className={`hp-chat-item ${currentChatId === c._id ? 'active' : ''}`}
                            aria-current={currentChatId === c._id ? 'page' : undefined}
                            aria-label={c.title}
                            id={`chat-item-${c._id}`}
                        >
                            <div className="hp-chat-item-icon"><ChatIcon /></div>
                            <div className="hp-chat-item-content">
                                <div className="hp-chat-item-title">{c.title}</div>
                            </div>
                        </button>
                    ))}
                </nav>

                {/* User */}
                <div className="hp-sidebar-footer">
                    <div className="hp-avatar" aria-hidden="true"></div>
                    <div className="hp-user-info">
                        <div className="hp-user-name"></div>
                    </div>
                </div>
            </aside>

            {/* ── Main ── */}
            <main className="hp-main" aria-label="Chat">
                {/* Messages */}
                <section className="hp-messages-area" aria-label="Conversation" aria-live="polite">
                    {currentMessages.map((msg, i) => (
                        <div key={i} className={`hp-msg-row ${msg.role === 'user' ? 'user-row' : 'ai-row'}`}>
                            <div className={`hp-msg-avatar ${msg.role === 'user' ? 'user-avatar' : 'ai-avatar'}`}>
                                {msg.role === 'user' ? 'U' : 'P'}
                            </div>
                            <div className="hp-msg-bubble-wrap">
                                <div className="hp-msg-bubble">{getMessageText(msg)}</div>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Input */}
                <div className="hp-input-bar" role="form" aria-label="Message input">
                    <div className="hp-input-wrap">
                        <textarea
                            id="chat-input"
                            className="hp-textarea"
                            rows={1}
                            onInput={(e) => { setMessage(e.target.value) }}
                            placeholder="Ask anything…"
                            aria-label="Type your message"
                        />
                        <button
                            id="send-message-btn"
                            className="hp-send-btn"
                            onClick={handleSend}
                            aria-label="Send message"
                        >
                            <SendIcon />
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default HomePage

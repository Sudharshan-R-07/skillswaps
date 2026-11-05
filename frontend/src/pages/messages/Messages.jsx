
import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import {
  Search,
  Send,
  MessageCircle,
  MoreVertical,
  Phone,
  Video,
  ArrowLeft,
  User
} from "lucide-react";

const initialChats = [
  {
    id: 1,
    name: "Arun Kumar",
    skill: "React Development",
    unread: 2,
    messages: [
      { id: 1, text: "Hi! Are you interested in learning React?", mine: false, time: "10:30 AM" },
      { id: 2, text: "Yes, definitely!", mine: true, time: "10:32 AM" },
      { id: 3, text: "We can schedule a session this weekend.", mine: false, time: "10:35 AM" }
    ]
  },
  {
    id: 2,
    name: "Priya Sharma",
    skill: "UI/UX Design",
    unread: 0,
    messages: [
      { id: 1, text: "Hello! I can help you with Figma.", mine: false, time: "Yesterday" },
      { id: 2, text: "Thank you! That would be helpful.", mine: true, time: "Yesterday" }
    ]
  },
  {
    id: 3,
    name: "Rahul",
    skill: "Python Programming",
    unread: 1,
    messages: [
      { id: 1, text: "Let's exchange Python and React skills.", mine: false, time: "Monday" }
    ]
  }
];

export default function Messages() {
  const [chats, setChats] = useState(initialChats);
  const [selectedChatId, setSelectedChatId] = useState(1);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [mobileChatOpen, setMobileChatOpen] = useState(false);

  const selectedChat = chats.find(chat => chat.id === selectedChatId);

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  const sendMessage = (e) => {
    e.preventDefault();

    if (!message.trim() || !selectedChat) return;

    const newMessage = {
      id: Date.now(),
      text: message.trim(),
      mine: true,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    setChats(prev =>
      prev.map(chat =>
        chat.id === selectedChatId
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      )
    );

    setMessage("");
  };

  const openChat = (id) => {
    setSelectedChatId(id);
    setMobileChatOpen(true);

    setChats(prev =>
      prev.map(chat =>
        chat.id === id ? { ...chat, unread: 0 } : chat
      )
    );
  };

  return (
    <>
      <Navbar />

      <main className="bg-slate-50 px-3 py-6 sm:px-6">
        <div className="mx-auto max-w-7xl">

          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-900">
              Messages
            </h1>
            <p className="mt-2 text-slate-500">
              Connect with learners and Resource Persons.
            </p>
          </div>

          <div className="grid h-[650px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:grid-cols-[320px_1fr]">

            {/* Conversation Sidebar */}
            <aside className={`border-r border-slate-200 ${
              mobileChatOpen ? "hidden md:block" : "block"
            }`}>
              <div className="border-b border-slate-200 p-4">
                <h2 className="font-semibold text-slate-900">
                  Conversations
                </h2>

                <div className="relative mt-4">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search conversations"
                    className="w-full rounded-xl bg-slate-100 py-3 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="overflow-y-auto">
                {filteredChats.map(chat => {
                  const lastMessage = chat.messages[chat.messages.length - 1];

                  return (
                    <button
                      key={chat.id}
                      onClick={() => openChat(chat.id)}
                      className={`flex w-full items-center gap-3 border-b border-slate-100 p-4 text-left hover:bg-slate-50 ${
                        selectedChatId === chat.id ? "bg-indigo-50" : ""
                      }`}
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                        <User size={22} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between gap-2">
                          <h3 className="truncate font-semibold text-slate-900">
                            {chat.name}
                          </h3>

                          {chat.unread > 0 && (
                            <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-xs text-white">
                              {chat.unread}
                            </span>
                          )}
                        </div>

                        <p className="mt-1 truncate text-xs text-slate-500">
                          {chat.skill}
                        </p>

                        <p className="mt-1 truncate text-sm text-slate-400">
                          {lastMessage?.text}
                        </p>
                      </div>
                    </button>
                  );
                })}

                {filteredChats.length === 0 && (
                  <p className="p-6 text-center text-sm text-slate-500">
                    No conversations found.
                  </p>
                )}
              </div>
            </aside>

            {/* Chat Panel */}
            <section className={`flex min-w-0 flex-col ${
              mobileChatOpen ? "flex" : "hidden md:flex"
            }`}>
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <header className="flex items-center justify-between border-b border-slate-200 p-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setMobileChatOpen(false)}
                        className="md:hidden"
                      >
                        <ArrowLeft size={20} />
                      </button>

                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                        <User size={20} />
                      </div>

                      <div>
                        <h2 className="font-semibold text-slate-900">
                          {selectedChat.name}
                        </h2>
                        <p className="text-xs text-green-600">
                          {selectedChat.skill}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-slate-400">
                      <button title="Voice call demo"><Phone size={18} /></button>
                      <button title="Video call demo"><Video size={18} /></button>
                      <button title="More options"><MoreVertical size={18} /></button>
                    </div>
                  </header>

                  {/* Messages */}
                  <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-5">
                    {selectedChat.messages.map(msg => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.mine ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          msg.mine
                            ? "rounded-br-sm bg-indigo-600 text-white"
                            : "rounded-bl-sm border border-slate-200 bg-white text-slate-800"
                        }`}>
                          <p className="break-words text-sm leading-6">
                            {msg.text}
                          </p>
                          <p className={`mt-2 text-right text-xs ${
                            msg.mine ? "text-indigo-200" : "text-slate-400"
                          }`}>
                            {msg.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <form
                    onSubmit={sendMessage}
                    className="flex items-center gap-3 border-t border-slate-200 p-4"
                  >
                    <input
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                    />

                    <button
                      type="submit"
                      disabled={!message.trim()}
                      className="rounded-xl bg-indigo-600 p-3 text-white hover:bg-indigo-700 disabled:opacity-40"
                    >
                      <Send size={20} />
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center text-slate-400">
                  <MessageCircle size={48} />
                  <p className="mt-4">Select a conversation</p>
                </div>
              )}
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

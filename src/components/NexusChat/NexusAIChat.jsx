import React, { useState, useRef, useEffect } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure'; 
import { IoMdSend, IoMdClose } from 'react-icons/io';
import { BsChatDotsFill } from 'react-icons/bs';

const QUICK_QUESTIONS = [
  'ভর্তি কীভাবে করব?',
  'ক্লাস কয়টা থেকে কয়টা?',
  'যোগাযোগ নম্বর কী?',
  'রেজাল্ট কোথায় দেখব?',
];

const NexusAIChat = () => {
  const axiosSecure = useAxiosSecure(); 
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(''); 
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: 'আসসালামু আলাইকুম! আমি Nexus AI। ভর্তি, রেজাল্ট, বা স্কুল সম্পর্কে যা জানতে চান জিজ্ঞেস করুন।',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async text => {
    const prompt = text || input;
    if (!prompt.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: prompt }]);
    setInput('');
    setLoading(true);

    try {
      
      const res = await axiosSecure.post('/nexus-ai', { prompt });

      
      if (res?.data?.anwser) {
        setMessages(prev => [...prev, { role: 'ai', text: res.data.anwser }]);
        setMessage(res.data.anwser);
      }
    } catch (err) {
      console.log(err);
      setMessages(prev => [
        ...prev,
        { role: 'ai', text: 'দুঃখিত, সংযোগ সমস্যা। আবার চেষ্টা করুন।' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button - Right Bottom */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 bg-blue-600 text-white"
      >
        {open ? <IoMdClose size={30} /> : <BsChatDotsFill size={28} />}
      </button>

      {/* Chat Panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 flex flex-col rounded-3xl overflow-hidden shadow-2xl border border-blue-100 bg-white animate-in slide-in-from-bottom-5"
          style={{ width: '350px', height: '520px' }}
        >
          {/* Header - Blue Theme */}
          <div className="p-5 text-white flex items-center gap-3 bg-blue-600 shadow-md">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold text-xl shadow-inner">
              N
            </div>
            <div>
              <p className="font-bold text-base leading-none">
                Nexus AI Assistant
              </p>
              <p className="text-[10px] opacity-80 mt-1 uppercase">
                Always Online
              </p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-slate-50">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] text-[13px] px-4 py-3 shadow-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-blue-600 text-white rounded-2xl rounded-tr-none'
                      : 'bg-white text-slate-700 rounded-2xl rounded-tl-none border border-blue-50'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-blue-50 p-3 rounded-2xl rounded-tl-none flex gap-1">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-3 bg-slate-50 flex flex-wrap gap-2">
              {QUICK_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => send(q)}
                  className="text-[11px] px-3 py-1.5 rounded-full bg-white border border-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm font-medium"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-slate-100 bg-white">
            <div className="relative flex items-center bg-slate-100 rounded-2xl px-2 py-1">
              <input
                className="flex-1 bg-transparent text-sm px-3 py-2.5 outline-none text-slate-700"
                placeholder="আপনার প্রশ্নটি লিখুন..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
              />
              <button
                onClick={() => send()}
                disabled={loading || !input.trim()}
                className="ml-2 w-10 h-10 flex items-center justify-center rounded-xl bg-blue-600 text-white shadow-md disabled:opacity-40 transition-all hover:bg-blue-700"
              >
                <IoMdSend size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NexusAIChat;

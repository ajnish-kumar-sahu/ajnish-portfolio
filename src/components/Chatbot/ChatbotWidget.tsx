import {
  ChevronDown,
  Copy,
  HelpCircle,
  Maximize2,
  MessageCircle,
  Minimize2,
  RefreshCw,
  Send,
  Sparkles,
  ThumbsUp,
  User,
  Volume2,
  VolumeX,
  X,
  Zap,
} from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { chatbotService } from '../../services/chatbotService';
import { ChatMessage } from '../../types/chatbot';
import { AiIconSmall } from './AiIcon';
import { AutoResizeTextarea } from './AutoResizeTextarea';

// Enhanced TypingIndicator inline
const TypingDots = () => (
  <div className="flex items-center gap-1.5 py-1 px-1">
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400"
        style={{
          animation: `chatbot-typing 1.4s ease-in-out infinite`,
          animationDelay: `${i * 0.16}s`,
        }}
      />
    ))}
    <span className="text-xs text-gray-400 dark:text-gray-500 ml-1 font-medium">thinking...</span>
  </div>
);

const QUICK_PROMPTS = [
  { label: '🚀 Projects', question: "What projects has Ajnish built?" },
  { label: '💼 Skills', question: "What are Ajnish's technical skills?" },
  { label: '🛒 Marketplace', question: "What's available in the marketplace?" },
  { label: '📬 Contact', question: "How can I contact Ajnish?" },
  { label: '🎓 Education', question: "Tell me about Ajnish's educational background." },
  { label: '⚡ Services', question: "What services does Ajnish offer?" },
];

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [likedMessages, setLikedMessages] = useState<Set<string>>(new Set());
  const [unreadCount, setUnreadCount] = useState(0);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: `### 👋 Hi there! I'm Ajnish's AI Assistant\n\nI'm here to help you learn everything about Ajnish — his skills, projects, services, and more!\n\n**Quick things I can tell you about:**\n- 💻 Tech Stack & Programming Skills\n- 🚀 Past & Current Projects  \n- 🛒 Digital Marketplace Products\n- 🎓 Academic Background\n- 📬 How to Get in Touch\n\nFeel free to ask me anything! 😊`,
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'disconnected'>('connected');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
    if (isOpen) setUnreadCount(0);
  }, [isOpen, isMinimized]);

  const handleSendMessage = useCallback(async (overrideText?: string) => {
    const text = (overrideText ?? inputMessage).trim();
    if (!text || isLoading) return;

    setInputMessage('');

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setIsTyping(true);
    setConnectionStatus('connecting');

    const typingMessage: ChatMessage = {
      id: 'typing',
      content: '',
      sender: 'assistant',
      timestamp: new Date(),
      isTyping: true,
    };
    setMessages((prev) => [...prev, typingMessage]);

    try {
      const response = await chatbotService.sendMessage(text);
      setMessages((prev) => prev.filter((msg) => msg.id !== 'typing'));
      setConnectionStatus('connected');

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response.message || 'I encountered an issue. Please try again.',
        sender: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      if (!isOpen) setUnreadCount((c) => c + 1);
    } catch {
      setMessages((prev) => prev.filter((msg) => msg.id !== 'typing'));
      setConnectionStatus('disconnected');

      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble connecting right now. Please try again or reach out directly at **ajnishkumar7070@gmail.com**.",
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  }, [inputMessage, isLoading, isOpen]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const handleResetChat = useCallback(() => {
    setMessages([
      {
        id: Date.now().toString(),
        content: `### 👋 Hi there! I'm Ajnish's AI Assistant\n\nI'm here to help you learn everything about Ajnish — his skills, projects, services, and more!\n\n**Quick things I can tell you about:**\n- 💻 Tech Stack & Programming Skills\n- 🚀 Past & Current Projects  \n- 🛒 Digital Marketplace Products\n- 🎓 Academic Background\n- 📬 How to Get in Touch\n\nFeel free to ask me anything! 😊`,
        sender: 'assistant',
        timestamp: new Date(),
      },
    ]);
    setConnectionStatus('connected');
    setInputMessage('');
  }, []);

  const copyMessage = async (id: string, content: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const toggleLike = (id: string) => {
    setLikedMessages((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const statusColor = {
    connected: 'bg-emerald-400',
    connecting: 'bg-amber-400 animate-pulse',
    disconnected: 'bg-red-400',
  }[connectionStatus];

  const statusText = {
    connected: 'Online',
    connecting: 'Connecting…',
    disconnected: 'Offline',
  }[connectionStatus];

  const widgetWidth = isExpanded ? 'w-[95vw] sm:w-[500px]' : 'w-[92vw] sm:w-96';
  const widgetHeight = isExpanded ? 'h-[90vh] sm:h-[680px]' : 'h-[82vh] sm:h-[580px]';

  /* ── Closed FAB ── */
  if (!isOpen) {
    return (
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={() => { setIsOpen(true); setUnreadCount(0); }}
          className="group relative w-14 h-14 rounded-2xl text-white shadow-2xl shadow-indigo-500/40 overflow-hidden hover:scale-110 transition-all duration-300"
          aria-label="Open chat assistant"
        >
          {/* Rotating conic gradient ring */}
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#6366f1,#8b5cf6,#ec4899,#f43f5e,#6366f1)] animate-[spin_4s_linear_infinite] opacity-90" />
          {/* Inner solid background */}
          <div className="absolute inset-[2.5px] rounded-[10px] bg-gradient-to-br from-indigo-600 to-purple-700" />
          {/* Shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-2xl" />

          <MessageCircle size={22} className="relative z-10 drop-shadow-lg" />

          {/* Unread badge */}
          {unreadCount > 0 && (
            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-black border-2 border-white dark:border-gray-900 z-20 animate-bounce">
              {unreadCount}
            </div>
          )}

          {/* Sparkle badge */}
          {unreadCount === 0 && (
            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gradient-to-tr from-pink-500 to-purple-500 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900 z-20">
              <Sparkles size={9} className="text-white" />
            </div>
          )}

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-gray-900/95 backdrop-blur-sm text-white text-xs font-medium rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-2xl border border-white/10 translate-y-1 group-hover:translate-y-0">
            Chat with Ajnish's AI 🤖
            <div className="absolute top-full right-5 border-l-[5px] border-r-[5px] border-t-[5px] border-transparent border-t-gray-900/95" />
          </div>
        </button>
      </div>
    );
  }

  /* ── Open Chat Panel ── */
  return (
    <div className="fixed bottom-5 right-5 z-50" style={{ maxWidth: '95vw' }}>
      <div
        className={`flex flex-col ${widgetWidth} ${isMinimized ? 'h-16' : widgetHeight} bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200/60 dark:border-gray-700/60 overflow-hidden transition-all duration-300 ease-in-out`}
        style={{ boxShadow: '0 25px 60px -10px rgba(99, 102, 241, 0.25), 0 10px 30px -10px rgba(0,0,0,0.2)' }}
      >
        {/* ─── Header ─── */}
        <div className="relative flex items-center justify-between px-4 py-3 flex-shrink-0 overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600" />
          {/* Mesh pattern */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:16px_16px]" />
          {/* Glow orbs */}
          <div className="absolute -top-4 -left-4 w-20 h-20 bg-white/10 rounded-full blur-xl" />
          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-pink-400/20 rounded-full blur-xl" />

          {/* Avatar + status */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg">
                <AiIconSmall size={22} className="text-white" />
              </div>
              <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${statusColor} rounded-full border-2 border-white/80`} />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">Ajnish's AI</p>
              <p className="text-white/70 text-[10px] flex items-center gap-1 font-medium">
                <span className={`inline-block w-1.5 h-1.5 rounded-full ${statusColor}`} />
                {isTyping ? '✨ Thinking…' : statusText}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="relative z-10 flex items-center gap-0.5">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-all duration-200 hover:scale-110 text-white/80 hover:text-white"
              title={soundEnabled ? 'Mute' : 'Unmute'}
            >
              {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            </button>
            <button
              onClick={handleResetChat}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-all duration-200 hover:scale-110 text-white/80 hover:text-white"
              title="Reset chat"
            >
              <RefreshCw size={14} />
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-all duration-200 hover:scale-110 text-white/80 hover:text-white hidden sm:block"
              title={isExpanded ? 'Shrink' : 'Expand'}
            >
              {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-all duration-200 hover:scale-110 text-white/80 hover:text-white"
              title={isMinimized ? 'Maximize' : 'Minimize'}
            >
              <ChevronDown size={14} className={`transition-transform duration-300 ${isMinimized ? 'rotate-180' : ''}`} />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-all duration-200 hover:scale-110 text-white/80 hover:text-white"
              title="Close"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* ─── Body (hidden when minimized) ─── */}
        {!isMinimized && (
          <>
            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/80 to-white dark:from-gray-900 dark:to-gray-900 chatbot-messages">
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isCopied={copiedId === message.id}
                  isLiked={likedMessages.has(message.id)}
                  onCopy={() => copyMessage(message.id, message.content)}
                  onLike={() => toggleLike(message.id)}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* ─── Quick Prompt Chips (shown on first message only) ─── */}
            {messages.length === 1 && (
              <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-900/80 flex-shrink-0">
                <div className="flex items-center gap-1.5 mb-2.5">
                  <HelpCircle size={13} className="text-indigo-400" />
                  <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quick questions</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {QUICK_PROMPTS.map((q) => (
                    <button
                      key={q.label}
                      onClick={() => handleSendMessage(q.question)}
                      className="px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-[11px] font-semibold rounded-full border border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ─── Input area ─── */}
            <div className="px-4 pb-4 pt-3 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 flex-shrink-0">
              <div className="flex items-end gap-2.5">
                <div className="flex-1 relative">
                  <AutoResizeTextarea
                    ref={inputRef}
                    value={inputMessage}
                    onChange={setInputMessage}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about Ajnish…"
                    className="w-full pl-4 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 dark:focus:border-indigo-400 text-sm resize-none min-h-[48px] max-h-[120px] transition-all duration-200"
                    disabled={isLoading}
                    maxLength={1000}
                  />
                </div>

                {/* Send button */}
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim() || isLoading}
                  className="relative w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 disabled:hover:scale-100 group"
                  aria-label="Send message"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 group-hover:from-indigo-600 group-hover:to-purple-700 transition-all duration-200" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                  {isLoading ? (
                    <div className="relative z-10 w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send size={16} className="relative z-10 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  )}
                </button>
              </div>

              {/* Footer hint */}
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] text-gray-400 dark:text-gray-600 flex items-center gap-1">
                  <Zap size={9} className="text-indigo-400" />
                  Powered by Gemini AI
                </span>
                <span className={`text-[10px] font-medium ${inputMessage.length > 800 ? 'text-red-500' : 'text-gray-400 dark:text-gray-600'}`}>
                  {inputMessage.length}/1000
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Message Bubble Component ─── */
interface BubbleProps {
  message: ChatMessage;
  isCopied: boolean;
  isLiked: boolean;
  onCopy: () => void;
  onLike: () => void;
}

const MessageBubble: React.FC<BubbleProps> = ({ message, isCopied, isLiked, onCopy, onLike }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`group flex items-end gap-2 animate-slide-in-up ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div
        className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${
          isUser
            ? 'bg-gradient-to-br from-indigo-500 to-purple-600'
            : 'bg-gradient-to-br from-gray-600 to-gray-700 dark:from-gray-600 dark:to-gray-800'
        }`}
      >
        {isUser ? <User size={13} className="text-white" /> : <AiIconSmall size={16} className="text-white" />}
      </div>

      {/* Bubble */}
      <div className={`relative max-w-[80%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        <div
          className={`px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed ${
            isUser
              ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-br-sm'
              : message.isTyping
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-bl-sm border border-gray-200 dark:border-gray-700'
              : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-sm border border-gray-200/60 dark:border-gray-700/60 shadow-sm'
          }`}
        >
          {message.isTyping ? (
            <TypingDots />
          ) : isUser ? (
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          ) : (
            <div className="chatbot-message prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-headings:my-1.5 prose-ul:my-1 prose-li:my-0 prose-code:bg-gray-100 dark:prose-code:bg-gray-700 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-indigo-600 dark:prose-code:text-indigo-400 prose-code:font-mono prose-code:text-xs">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>

        {/* Timestamp + actions */}
        {!message.isTyping && (
          <div className={`flex items-center gap-2 px-1 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
            <span className="text-[10px] text-gray-400 dark:text-gray-600">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>

            {/* Action buttons - visible on hover */}
            {!isUser && (
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={onCopy}
                  className="p-1 text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 rounded transition-colors"
                  title={isCopied ? 'Copied!' : 'Copy'}
                >
                  {isCopied ? (
                    <span className="text-[9px] font-bold text-emerald-500">✓</span>
                  ) : (
                    <Copy size={11} />
                  )}
                </button>
                <button
                  onClick={onLike}
                  className={`p-1 rounded transition-colors ${isLiked ? 'text-indigo-500' : 'text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400'}`}
                  title={isLiked ? 'Unlike' : 'Like'}
                >
                  <ThumbsUp size={11} className={isLiked ? 'fill-current' : ''} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

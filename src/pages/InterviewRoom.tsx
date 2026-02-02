import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Phone, 
  MessageSquare,
  Send,
  Clock,
  Brain,
  User
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { jobs } from '@/data/jobs';

type AIStatus = 'listening' | 'thinking' | 'speaking';

interface Message {
  id: string;
  role: 'ai' | 'user';
  content: string;
  timestamp: Date;
}

const InterviewRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = jobs.find((j) => j.id === id);
  
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [aiStatus, setAiStatus] = useState<AIStatus>('speaking');
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [progress, setProgress] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const questions = [
    "Hello! Welcome to your interview for the position. I'm your AI interviewer today. Let's start with a simple introduction. Could you tell me a bit about yourself and your background?",
    "That's great! Now, looking at your experience, could you walk me through a challenging project you've worked on and how you approached solving complex problems?",
    "Excellent response. Let's dive into some technical aspects. How do you stay updated with the latest technologies in your field?",
    "Good to know. Can you describe a situation where you had to work under pressure or meet a tight deadline? How did you handle it?",
    "Thank you for sharing that. As a final question, where do you see yourself in 5 years, and why are you interested in this role specifically?",
  ];

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Initialize with first question
  useEffect(() => {
    const initialMessage: Message = {
      id: '1',
      role: 'ai',
      content: questions[0],
      timestamp: new Date(),
    };
    setMessages([initialMessage]);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate video
  useEffect(() => {
    if (isVideoOn && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(() => {
          setIsVideoOn(false);
        });
    }
  }, [isVideoOn]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setAiStatus('thinking');

    // Simulate AI response
    setTimeout(() => {
      setAiStatus('speaking');
      const nextQuestion = currentQuestion + 1;
      
      if (nextQuestion < questions.length) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'ai',
          content: questions[nextQuestion],
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
        setCurrentQuestion(nextQuestion);
        setProgress((nextQuestion / questions.length) * 100);
      } else {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'ai',
          content: "Thank you for completing the interview! Your responses have been recorded and analyzed. You can now proceed to view your results and feedback.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
        setProgress(100);
        
        setTimeout(() => {
          navigate(`/results/${id}`, { state: { duration: timeElapsed } });
        }, 3000);
      }
    }, 2000);
  };

  const handleEndInterview = () => {
    navigate(`/results/${id}`, { state: { duration: timeElapsed } });
  };

  const statusConfig = {
    listening: { label: 'Listening...', color: 'text-accent', dotClass: 'listening' },
    thinking: { label: 'Thinking...', color: 'text-warning', dotClass: 'thinking' },
    speaking: { label: 'Speaking...', color: 'text-success', dotClass: 'speaking' },
  };

  return (
    <div className="min-h-screen bg-interview-bg flex flex-col">
      <Navbar />

      {/* Main Interview Area */}
      <div className="flex-1 container py-4 grid lg:grid-cols-3 gap-4">
        {/* Left Panel - AI Interviewer */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 interview-panel rounded-xl p-6 flex flex-col"
        >
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-foreground">AI Interviewer</h3>
            <p className="text-sm text-muted-foreground">{job?.company || 'Company'}</p>
          </div>

          {/* AI Avatar */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative">
              <motion.div
                animate={aiStatus === 'speaking' ? { scale: [1, 1.02, 1] } : {}}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-48 h-48 rounded-full bg-gradient-to-br from-primary to-accent p-1"
              >
                <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                  <Brain className="w-20 h-20 text-primary" />
                </div>
              </motion.div>
              
              {/* Status Ring */}
              {aiStatus === 'speaking' && (
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-success opacity-50"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              )}
            </div>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className={`status-dot ${statusConfig[aiStatus].dotClass}`} />
            <span className={`text-sm font-medium ${statusConfig[aiStatus].color}`}>
              {statusConfig[aiStatus].label}
            </span>
          </div>

          {/* Audio Visualization */}
          <div className="flex items-center justify-center gap-1 mt-4 h-8">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 rounded-full bg-primary"
                animate={aiStatus === 'speaking' ? {
                  height: ['8px', '24px', '8px'],
                } : { height: '8px' }}
                transition={{
                  repeat: Infinity,
                  duration: 0.5,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Center - Chat Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1 interview-panel rounded-xl flex flex-col"
        >
          {/* Chat Header */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              <span className="font-medium text-foreground">Interview Chat</span>
            </div>
            <span className="text-xs text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === 'ai' ? 'bg-primary/10' : 'bg-accent/10'
                  }`}>
                    {message.role === 'ai' ? (
                      <Brain className="w-4 h-4 text-primary" />
                    ) : (
                      <User className="w-4 h-4 text-accent" />
                    )}
                  </div>
                  <div className={`max-w-[80%] rounded-xl p-3 ${
                    message.role === 'ai'
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-primary text-primary-foreground'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <span className="text-[10px] opacity-60 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your response..."
                className="flex-1 px-4 py-2.5 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                className="p-2.5 rounded-lg bg-primary text-primary-foreground"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Right Panel - User Video */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1 interview-panel rounded-xl p-6 flex flex-col"
        >
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-foreground">Your Camera</h3>
          </div>

          {/* Video Feed */}
          <div className="flex-1 rounded-xl bg-muted overflow-hidden relative">
            {isVideoOn ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <VideoOff className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Camera is off</p>
                </div>
              </div>
            )}

            {/* Mic Indicator */}
            {isMicOn && (
              <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/20 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs text-success font-medium">Mic Active</span>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMicOn(!isMicOn)}
              className={`p-3 rounded-full ${
                isMicOn ? 'bg-secondary' : 'bg-destructive'
              }`}
            >
              {isMicOn ? (
                <Mic className="w-5 h-5 text-foreground" />
              ) : (
                <MicOff className="w-5 h-5 text-destructive-foreground" />
              )}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-3 rounded-full ${
                isVideoOn ? 'bg-secondary' : 'bg-destructive'
              }`}
            >
              {isVideoOn ? (
                <Video className="w-5 h-5 text-foreground" />
              ) : (
                <VideoOff className="w-5 h-5 text-destructive-foreground" />
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Control Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="border-t border-border bg-card"
      >
        <div className="container py-4">
          <div className="flex items-center justify-between">
            {/* Timer */}
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="font-mono text-sm">{formatTime(timeElapsed)}</span>
            </div>

            {/* Center Controls */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEndInterview}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium"
            >
              <Phone className="w-4 h-4" />
              End Interview
            </motion.button>

            {/* Right spacer for alignment */}
            <div className="w-9" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InterviewRoom;

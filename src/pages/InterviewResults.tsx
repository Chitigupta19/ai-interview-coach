import { useParams, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Download, 
  Home,
  CheckCircle2,
  TrendingUp,
  MessageSquare,
  Target,
  Sparkles,
  Star,
  AlertTriangle
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { jobs } from '@/data/jobs';
import { generateReportPDF } from '@/utils/generateReport';
import { useToast } from '@/hooks/use-toast';

const InterviewResults = () => {
  const { id } = useParams();
  const location = useLocation();
  const job = jobs.find((j) => j.id === id);
  const { toast } = useToast();
  
  // Get duration from navigation state or default
  const duration = (location.state as { duration?: number })?.duration || 0;
  
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const overallScore = 85;

  const skillScores = [
    { name: 'Technical Knowledge', score: 88, color: 'bg-primary' },
    { name: 'Communication', score: 82, color: 'bg-accent' },
    { name: 'Problem Solving', score: 90, color: 'bg-success' },
    { name: 'Confidence', score: 78, color: 'bg-warning' },
    { name: 'Clarity', score: 85, color: 'bg-primary' },
  ];

  const strengths = [
    'Strong technical foundation in core technologies',
    'Clear and structured communication style',
    'Excellent problem-solving approach with logical thinking',
    'Good understanding of system design principles',
  ];

  const improvements = [
    'Consider providing more specific examples from past experience',
    'Practice answering under time pressure for more concise responses',
    'Demonstrate more enthusiasm when discussing achievements',
  ];

  const feedback = [
    {
      question: 'Tell me about yourself',
      response: 'Good introduction with clear career trajectory',
      score: 88,
    },
    {
      question: 'Describe a challenging project',
      response: 'Excellent technical depth with clear problem-solving approach',
      score: 92,
    },
    {
      question: 'How do you stay updated?',
      response: 'Good awareness of learning resources and community involvement',
      score: 85,
    },
    {
      question: 'Working under pressure',
      response: 'Could benefit from more specific examples',
      score: 75,
    },
    {
      question: 'Where do you see yourself in 5 years?',
      response: 'Clear career goals aligned with role',
      score: 82,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 mb-4">
            <CheckCircle2 className="w-10 h-10 text-success" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Interview Completed!</h1>
          <p className="text-muted-foreground">
            Here's your detailed performance analysis
          </p>
        </motion.div>

        {/* Job Info */}
        {job && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-6 mb-8 max-w-2xl mx-auto"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-secondary overflow-hidden">
                <img src={job.companyLogo} alt={job.company} className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">{job.title}</h2>
                <p className="text-sm text-muted-foreground">{job.company} • {job.location}</p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Scores */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Overall Score */}
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <h3 className="text-lg font-semibold text-foreground mb-4">Overall Score</h3>
              <div className="relative w-40 h-40 mx-auto">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="10"
                    fill="none"
                    className="text-secondary"
                  />
                  <motion.circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="url(#gradient)"
                    strokeWidth="10"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: overallScore / 100 }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    style={{
                      strokeDasharray: `${2 * Math.PI * 70}`,
                      strokeDashoffset: 0,
                    }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="100%" stopColor="hsl(var(--accent))" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-foreground">{overallScore}</span>
                  <span className="text-sm text-muted-foreground">out of 100</span>
                </div>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 text-success text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                Above Average
              </div>
            </div>

          </motion.div>

          {/* Right Column - Feedback */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Strengths & Improvements */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-success" />
                  <h3 className="text-lg font-semibold text-foreground">Strengths</h3>
                </div>
                <ul className="space-y-3">
                  {strengths.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-warning" />
                  <h3 className="text-lg font-semibold text-foreground">Areas to Improve</h3>
                </div>
                <ul className="space-y-3">
                  {improvements.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Question Feedback */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Question-by-Question Feedback</h3>
              </div>
              <div className="space-y-4">
                {feedback.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-secondary/50 border border-border"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium text-foreground mb-1">{item.question}</p>
                        <p className="text-sm text-muted-foreground">{item.response}</p>
                      </div>
                      <div className={`shrink-0 px-3 py-1 rounded-full text-sm font-medium ${
                        item.score >= 85 ? 'bg-success/10 text-success' :
                        item.score >= 75 ? 'bg-warning/10 text-warning' :
                        'bg-destructive/10 text-destructive'
                      }`}>
                        {item.score}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Recommendation */}
            <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">AI Recommendation</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Based on your performance, you demonstrate strong technical capabilities and clear communication skills. 
                Your score of {overallScore}% places you in the <strong className="text-foreground">top 20%</strong> of candidates 
                for similar roles. We recommend focusing on providing more specific examples from your experience and 
                practicing time-constrained responses for even better results.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium"
              >
                <Home className="w-4 h-4" />
                Go to Dashboard
              </Link>
              <button
                onClick={() => {
                  generateReportPDF({
                    jobTitle: job?.title || 'Interview',
                    company: job?.company || 'Company',
                    overallScore,
                    skillScores,
                    strengths,
                    improvements,
                    feedback,
                  });
                  toast({
                    title: 'Report Generated',
                    description: 'Your interview report is ready for download/print.',
                  });
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium"
              >
                <Download className="w-4 h-4" />
                Download Report
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InterviewResults;

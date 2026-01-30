import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  TrendingUp, 
  Clock, 
  Target,
  ChevronRight,
  Star,
  Calendar,
  BarChart3,
  BookOpen,
  Sparkles,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { jobs } from '@/data/jobs';

const Dashboard = () => {
  const appliedJobs = [
    { ...jobs[0], status: 'Interview Completed', score: 85 },
    { ...jobs[2], status: 'In Progress', score: null },
    { ...jobs[4], status: 'Pending Review', score: null },
  ];

  const interviewHistory = [
    { id: '1', company: 'TechVision Inc.', role: 'Senior Frontend Engineer', date: '2 days ago', score: 85 },
    { id: '2', company: 'CloudScale Solutions', role: 'Full Stack Developer', date: '1 week ago', score: 78 },
    { id: '3', company: 'DataMind AI', role: 'Machine Learning Engineer', date: '2 weeks ago', score: 92 },
  ];

  const skillProgress = [
    { skill: 'Technical Knowledge', progress: 85, change: '+5' },
    { skill: 'Communication', progress: 78, change: '+3' },
    { skill: 'Problem Solving', progress: 90, change: '+8' },
    { skill: 'Confidence', progress: 72, change: '+2' },
  ];

  const recommendations = [
    { title: 'Practice System Design', description: 'Based on your interviews, improving system design skills could boost your score by 10%' },
    { title: 'Mock Interview: Behavioral', description: 'Schedule a practice session focused on behavioral questions' },
    { title: 'Resume Enhancement', description: 'Add more quantifiable achievements to strengthen your profile' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, Alex! 👋</h1>
          <p className="text-muted-foreground">
            Track your interview progress and improve your skills
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {[
            { icon: Briefcase, label: 'Applications', value: '12', sublabel: 'This month' },
            { icon: Target, label: 'Interviews', value: '8', sublabel: 'Completed' },
            { icon: TrendingUp, label: 'Avg. Score', value: '85%', sublabel: '+5% from last month' },
            { icon: Star, label: 'Top Performance', value: '92%', sublabel: 'Best score' },
          ].map(({ icon: Icon, label, value, sublabel }, index) => (
            <div
              key={label}
              className="bg-card border border-border rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className="text-xs text-muted-foreground mt-1">{sublabel}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Applied Jobs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">Applied Jobs</h2>
                <Link to="/" className="text-sm text-primary hover:underline flex items-center gap-1">
                  View all <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {appliedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 border border-border"
                  >
                    <div className="w-10 h-10 rounded-lg bg-background overflow-hidden">
                      <img src={job.companyLogo} alt={job.company} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{job.title}</p>
                      <p className="text-sm text-muted-foreground">{job.company}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                        job.status === 'Interview Completed' ? 'bg-success/10 text-success' :
                        job.status === 'In Progress' ? 'bg-warning/10 text-warning' :
                        'bg-secondary text-secondary-foreground'
                      }`}>
                        {job.status}
                      </span>
                      {job.score && (
                        <p className="text-sm font-medium text-foreground mt-1">{job.score}%</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Interview History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">Interview History</h2>
              </div>
              <div className="space-y-4">
                {interviewHistory.map((interview) => (
                  <div
                    key={interview.id}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{interview.role}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{interview.company}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {interview.date}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                        interview.score >= 85 ? 'bg-success/10 text-success' :
                        interview.score >= 70 ? 'bg-warning/10 text-warning' :
                        'bg-destructive/10 text-destructive'
                      }`}>
                        {interview.score}%
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Skill Progress */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Skill Progress</h2>
              </div>
              <div className="space-y-4">
                {skillProgress.map((item) => (
                  <div key={item.skill}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-muted-foreground">{item.skill}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{item.progress}%</span>
                        <span className="text-xs text-success">{item.change}</span>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${item.progress}%` }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* AI Recommendations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-accent" />
                <h2 className="text-lg font-semibold text-foreground">AI Recommendations</h2>
              </div>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-secondary/50 border border-border hover:border-primary/20 transition-colors cursor-pointer"
                  >
                    <p className="font-medium text-foreground text-sm mb-1">{rec.title}</p>
                    <p className="text-xs text-muted-foreground">{rec.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Link
                  to="/"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors"
                >
                  <Briefcase className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">Browse Jobs</span>
                </Link>
                <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors w-full text-left">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">Practice Interview</span>
                </button>
                <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors w-full text-left">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">View History</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

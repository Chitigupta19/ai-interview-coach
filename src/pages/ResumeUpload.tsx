import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  User, 
  Mail, 
  Briefcase, 
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { jobs } from '@/data/jobs';

interface ResumeData {
  name: string;
  email: string;
  skills: string[];
  experience: string;
  education: string;
}

const ResumeUpload = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = jobs.find((j) => j.id === id);
  
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [step, setStep] = useState(1);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      processFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const processFile = (selectedFile: File) => {
    setFile(selectedFile);
    setIsProcessing(true);

    // Simulate resume parsing
    setTimeout(() => {
      setResumeData({
        name: 'Alex Johnson',
        email: 'alex.johnson@email.com',
        skills: ['React', 'TypeScript', 'Node.js', 'Python', 'GraphQL', 'AWS'],
        experience: '5+ years in software development with focus on frontend technologies and cloud architecture',
        education: 'B.S. Computer Science, Stanford University',
      });
      setIsProcessing(false);
      setStep(2);
    }, 2000);
  };

  const steps = [
    { number: 1, title: 'Upload Resume' },
    { number: 2, title: 'Review Details' },
    { number: 3, title: 'Start Interview' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-8 max-w-4xl">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to job details
        </motion.button>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-4">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      step >= s.number
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    {step > s.number ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <span className="font-medium">{s.number}</span>
                    )}
                  </div>
                  <span
                    className={`hidden sm:block text-sm font-medium ${
                      step >= s.number ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    {s.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 sm:w-20 h-px mx-2 transition-colors ${
                      step > s.number ? 'bg-primary' : 'bg-border'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Job Info Header */}
        {job && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-6 mb-8"
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

        <AnimatePresence mode="wait">
          {/* Step 1: Upload */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-card border border-border rounded-xl p-8"
            >
              <h1 className="text-2xl font-bold text-foreground mb-2">Upload Your Resume</h1>
              <p className="text-muted-foreground mb-8">
                Upload your resume and we'll parse it to personalize your interview experience.
              </p>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                  isDragging
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                {isProcessing ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      >
                        <Sparkles className="w-8 h-8 text-primary" />
                      </motion.div>
                    </div>
                    <div>
                      <p className="text-lg font-medium text-foreground">Processing Resume</p>
                      <p className="text-sm text-muted-foreground">Extracting your information...</p>
                    </div>
                  </div>
                ) : file ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-success" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-foreground">{file.name}</p>
                      <p className="text-sm text-muted-foreground">File uploaded successfully</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-foreground">
                        Drag and drop your resume here
                      </p>
                      <p className="text-sm text-muted-foreground">
                        or click to browse (PDF, DOC, DOCX)
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
                <AlertCircle className="w-4 h-4" />
                <p>Your resume will be used to personalize AI interview questions</p>
              </div>
            </motion.div>
          )}

          {/* Step 2: Review */}
          {step === 2 && resumeData && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-card border border-border rounded-xl p-8"
            >
              <h1 className="text-2xl font-bold text-foreground mb-2">Review Your Details</h1>
              <p className="text-muted-foreground mb-8">
                Please verify the information extracted from your resume.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
                  <User className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                    <p className="text-foreground">{resumeData.name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
                  <Mail className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p className="text-foreground">{resumeData.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
                  <FileText className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-md bg-background text-sm text-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
                  <Briefcase className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Experience</p>
                    <p className="text-foreground">{resumeData.experience}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
                  <GraduationCap className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Education</p>
                    <p className="text-foreground">{resumeData.education}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium transition-all hover:bg-secondary/80"
                >
                  Upload Different Resume
                </button>
                <button
                  onClick={() => navigate(`/interview/${id}`)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-primary-foreground font-medium transition-all hover:opacity-90"
                >
                  Start AI Interview
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ResumeUpload;

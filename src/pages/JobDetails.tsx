import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Briefcase, 
  DollarSign, 
  Building2, 
  CheckCircle2,
  Star,
  Users,
  Sparkles
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { jobs } from '@/data/jobs';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = jobs.find((j) => j.id === id);

  if (!job) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Job not found</h1>
          <Link to="/" className="text-primary hover:underline">
            Return to jobs
          </Link>
        </div>
      </div>
    );
  }

  const hiringSteps = [
    { step: 1, title: 'Application Review', description: 'Resume screening and initial assessment' },
    { step: 2, title: 'AI Interview', description: 'Complete our AI-powered interview simulation' },
    { step: 3, title: 'Technical Assessment', description: 'Skills-based evaluation and coding challenge' },
    { step: 4, title: 'Final Interview', description: 'Meet with the team and hiring manager' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to jobs
        </motion.button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Header */}
            <div className="bg-card border border-border rounded-xl p-6 md:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center overflow-hidden">
                  <img
                    src={job.companyLogo}
                    alt={job.company}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {job.title}
                  </h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Building2 className="w-4 h-4" />
                    <span>{job.company}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Briefcase className="w-4 h-4" />
                  {job.experience}
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {job.postedAt}
                </span>
                {job.salary && (
                  <span className="flex items-center gap-1.5 text-foreground font-medium">
                    <DollarSign className="w-4 h-4" />
                    {job.salary}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mt-6">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-lg bg-secondary text-sm font-medium text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-card border border-border rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">About the Role</h2>
              <p className="text-muted-foreground leading-relaxed">{job.description}</p>
            </div>

            {/* Responsibilities */}
            <div className="bg-card border border-border rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Responsibilities</h2>
              <ul className="space-y-3">
                {job.responsibilities.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Qualifications */}
            <div className="bg-card border border-border rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Qualifications</h2>
              <ul className="space-y-3">
                {job.qualifications.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-card border border-border rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Benefits</h2>
              <ul className="space-y-3">
                {job.benefits.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Apply Card */}
            <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Ready to Apply?
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Submit your resume and complete an AI-powered interview to get matched with this role.
              </p>
              <Link
                to={`/apply/${job.id}`}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium transition-all hover:opacity-90"
              >
                Apply Now
                <Sparkles className="w-4 h-4" />
              </Link>

              {/* Stats */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">142 applicants</p>
                    <p className="text-xs text-muted-foreground">in the last 7 days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hiring Process */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Hiring Process
              </h3>
              <div className="space-y-4">
                {hiringSteps.map((item, index) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {item.step}
                        </span>
                      </div>
                      {index < hiringSteps.length - 1 && (
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-px h-8 bg-border" />
                      )}
                    </div>
                    <div className="pb-4">
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;

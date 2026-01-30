import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Briefcase, ChevronRight } from 'lucide-react';
import { Job } from '@/data/jobs';

interface JobCardProps {
  job: Job;
  index: number;
}

export function JobCard({ job, index }: JobCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-xl bg-card border border-border p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/20">
        {/* Company Logo & Info */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center overflow-hidden">
            <img
              src={job.companyLogo}
              alt={job.company}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground truncate group-hover:text-primary transition-colors">
              {job.title}
            </h3>
            <p className="text-sm text-muted-foreground">{job.company}</p>
          </div>
          <span className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium ${
            job.type === 'Remote' 
              ? 'bg-accent/10 text-accent' 
              : 'bg-secondary text-secondary-foreground'
          }`}>
            {job.type}
          </span>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            {job.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Briefcase className="w-4 h-4" />
            {job.experience}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {job.postedAt}
          </span>
        </div>

        {/* Salary */}
        {job.salary && (
          <p className="text-sm font-medium text-foreground mb-4">{job.salary}</p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {job.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md bg-secondary text-xs font-medium text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
          {job.tags.length > 4 && (
            <span className="px-2.5 py-1 rounded-md bg-secondary text-xs font-medium text-muted-foreground">
              +{job.tags.length - 4} more
            </span>
          )}
        </div>

        {/* Action */}
        <Link
          to={`/job/${job.id}`}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium transition-all hover:opacity-90"
        >
          View Job
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}

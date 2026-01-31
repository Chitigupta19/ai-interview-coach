import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

interface FilterPopoverProps {
  onApplyFilters: (filters: FilterState) => void;
  onClearFilters: () => void;
}

export interface FilterState {
  experience: string[];
  salaryRange: [number, number];
  locations: string[];
}

const experienceLevels = ['Entry Level', '1-2 years', '3-5 years', '5+ years'];
const locations = ['San Francisco, CA', 'New York, NY', 'Remote', 'Austin, TX', 'Los Angeles, CA', 'Chicago, IL'];

export function FilterPopover({ onApplyFilters, onClearFilters }: FilterPopoverProps) {
  const [open, setOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState<[number, number]>([50, 250]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const toggleExperience = (exp: string) => {
    setSelectedExperience((prev) =>
      prev.includes(exp) ? prev.filter((e) => e !== exp) : [...prev, exp]
    );
  };

  const toggleLocation = (loc: string) => {
    setSelectedLocations((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );
  };

  const handleApply = () => {
    onApplyFilters({
      experience: selectedExperience,
      salaryRange,
      locations: selectedLocations,
    });
    setOpen(false);
  };

  const handleClear = () => {
    setSelectedExperience([]);
    setSalaryRange([50, 250]);
    setSelectedLocations([]);
    onClearFilters();
  };

  const hasActiveFilters = selectedExperience.length > 0 || selectedLocations.length > 0 || salaryRange[0] > 50 || salaryRange[1] < 250;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="relative p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
          <Filter className="w-5 h-5 text-muted-foreground" />
          {hasActiveFilters && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full" />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Filters</h3>
            {hasActiveFilters && (
              <button
                onClick={handleClear}
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Clear all
              </button>
            )}
          </div>

          {/* Experience Level */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Experience Level</label>
            <div className="flex flex-wrap gap-2">
              {experienceLevels.map((exp) => (
                <button
                  key={exp}
                  onClick={() => toggleExperience(exp)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedExperience.includes(exp)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {exp}
                </button>
              ))}
            </div>
          </div>

          {/* Salary Range */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Salary Range: ${salaryRange[0]}k - ${salaryRange[1]}k
            </label>
            <Slider
              value={salaryRange}
              onValueChange={(value) => setSalaryRange(value as [number, number])}
              min={50}
              max={250}
              step={10}
              className="mt-2"
            />
          </div>

          {/* Locations */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Location</label>
            <div className="flex flex-wrap gap-2">
              {locations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => toggleLocation(loc)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedLocations.includes(loc)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          <Button onClick={handleApply} className="w-full">
            Apply Filters
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Menu, X, Github, Linkedin, Mail, Download, ChevronRight, ExternalLink, Award, Code, Briefcase, GraduationCap, User, Terminal, Phone } from 'lucide-react';
import { resumeData } from './data';
import AnimatedBackground from './components/AnimatedBackground';
import SplashScreen from './components/SplashScreen';
import { cn } from './lib/utils';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'experience', 'achievements', 'projects', 'skills', 'education', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  if (!isLoaded) {
    return <SplashScreen onComplete={() => setIsLoaded(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#020205] text-white selection:bg-blue-500/30">
      <AnimatedBackground />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#020205]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold tracking-tighter cursor-pointer"
            onClick={() => scrollTo('hero')}
          >
            JOLSANA<span className="text-blue-500">.</span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {['Experience', 'Achievements', 'Projects', 'Skills', 'Education'].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-blue-500",
                  activeSection === item.toLowerCase() ? "text-blue-500" : "text-white/60"
                )}
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollTo('contact')}
              className="px-5 py-2 bg-blue-500 text-white rounded-full text-sm font-bold hover:bg-blue-600 transition-all hover:scale-105 active:scale-95"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-[#020205] pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {['Experience', 'Achievements', 'Projects', 'Skills', 'Education', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="text-3xl font-bold text-left hover:text-blue-500 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex flex-col justify-center px-6 pt-20 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold mb-6 uppercase tracking-widest">
              Available for Hybrid & On-site Roles
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 leading-tight">
              {resumeData.basics.name}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
                Software Engineer
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/60 max-w-2xl mb-10 leading-relaxed">
              {resumeData.basics.summary}
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => scrollTo('experience')}
                className="group px-8 py-4 bg-blue-500 text-white rounded-full font-bold flex items-center gap-2 hover:bg-blue-600 transition-all hover:scale-105 active:scale-95"
              >
                View Experience
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => window.print()}
                className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold hover:bg-white/10 transition-all flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Resume
              </button>
            </div>
          </motion.div>

          {/* Top 3 Impact Strip */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/5 pt-10"
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold text-blue-500">10+</div>
              <div className="text-xs text-white/40 uppercase tracking-widest font-bold leading-tight">Modular Angular<br/>Components Built</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold text-blue-500">5+</div>
              <div className="text-xs text-white/40 uppercase tracking-widest font-bold leading-tight">Distinct User<br/>Flows Delivered</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold text-blue-500">12+</div>
              <div className="text-xs text-white/40 uppercase tracking-widest font-bold leading-tight">Agile Sprints<br/>Successfully Shipped</div>
            </div>
          </motion.div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-32 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">Professional Journey</h2>
              <p className="text-white/40 max-w-md">Building production-grade applications across the full stack.</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <Briefcase className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Career Timeline</span>
            </div>
          </div>

          <div className="space-y-6">
            {resumeData.work.map((job, idx) => (
              <ExperienceCard key={idx} job={job} />
            ))}
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="py-32 px-6 bg-white/[0.02] border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 text-center">Key Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {resumeData.certifications.map((cert, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -10 }}
                  className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-blue-500/50 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Award className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 leading-tight">{cert}</h3>
                  <div className="text-xs text-white/40 font-mono">CERTIFIED PROFESSIONAL</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32 px-6 max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16">Featured Projects</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {resumeData.projects.map((project, idx) => (
              <ProjectCard key={idx} project={project} />
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-32 px-6 bg-blue-500/[0.02]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16">Technical Arsenal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {resumeData.skills.map((skillGroup, idx) => (
                <div key={idx}>
                  <h3 className="text-blue-500 font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-sm">
                    <Terminal className="w-4 h-4" />
                    {skillGroup.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, sIdx) => (
                      <span 
                        key={sIdx}
                        className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-32 px-6 max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16">Education</h2>
          <div className="space-y-12">
            {resumeData.education.map((edu, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-8 md:gap-20">
                <div className="md:w-1/4">
                  <div className="text-blue-500 font-bold font-mono">{edu.startDate} — {edu.endDate}</div>
                  <div className="text-sm text-white/40 mt-1">{edu.score}</div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-2xl font-bold mb-2">{edu.institution}</h3>
                  <div className="text-lg text-white/60 mb-4">{edu.studyType} {edu.area && `in ${edu.area}`}</div>
                  {edu.courses && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {edu.courses.map((course, cIdx) => (
                        <span key={cIdx} className="text-xs px-2 py-1 rounded bg-white/5 text-white/40">{course}</span>
                      ))}
                    </div>
                  )}
                  {(edu as any).activities && (
                    <ul className="space-y-2">
                      {(edu as any).activities.map((activity: string, aIdx: number) => (
                        <li key={aIdx} className="text-sm text-white/50 flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  )}
                  {(edu as any).project && (
                    <div className="mt-6 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                      <div className="text-xs font-bold text-blue-500 uppercase mb-2">Final Year Project</div>
                      <p className="text-sm text-white/70">{(edu as any).project}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="p-12 md:p-20 rounded-[3rem] bg-gradient-to-b from-blue-500/10 to-transparent border border-blue-500/20"
          >
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">Let's build something<br />extraordinary.</h2>
            <p className="text-xl text-white/60 mb-12 max-w-xl mx-auto">
              Currently open to new opportunities and exciting tech projects. Feel free to connect or drop a message.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a 
                href={`mailto:${resumeData.basics.email}`}
                className="px-10 py-5 bg-blue-500 text-white rounded-full font-bold text-lg hover:bg-blue-600 transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
              >
                <Mail className="w-6 h-6" />
                Get in Touch
              </a>
              <div className="flex gap-4">
                {resumeData.basics.profiles.map((profile, idx) => (
                  <a
                    key={idx}
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all hover:scale-110"
                  >
                    {profile.network === 'GitHub' ? <Github className="w-6 h-6" /> : <Linkedin className="w-6 h-6" />}
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-16 text-white/30 text-sm font-mono flex flex-col items-center gap-2">
              <p>{resumeData.basics.location.city}, {resumeData.basics.location.region}, {resumeData.basics.location.countryCode}</p>
              <a 
                href={`tel:${resumeData.basics.phone}`}
                className="text-blue-500/60 hover:text-blue-500 transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                {resumeData.basics.phone}
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="py-10 px-6 border-t border-white/5 text-center text-white/20 text-xs font-mono uppercase tracking-widest">
        © 2026 Jolsana Jaimon • Built with Next.js & Motion
      </footer>
    </div>
  );
};

const ExperienceCard: React.FC<{ job: any }> = ({ job }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      layout
      className="rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden hover:border-white/10 transition-colors"
    >
      <div 
        className="p-8 flex flex-col md:flex-row md:items-center justify-between cursor-pointer gap-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex gap-6 items-center">
          <div className="hidden md:flex w-12 h-12 rounded-xl bg-blue-500/10 items-center justify-center text-blue-500 font-bold">
            {job.company[0]}
          </div>
          <div>
            <h3 className="text-xl font-bold">{job.position}</h3>
            <div className="text-white/40 text-sm">{job.company} • {job.location}</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="font-mono text-xs text-blue-500 font-bold">{job.startDate} — {job.endDate}</div>
            <div className="text-[10px] text-white/30 uppercase tracking-widest">{job.duration}</div>
          </div>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
            <ChevronRight className="w-5 h-5 text-white/20" />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-8 pb-8"
          >
            <p className="text-white/60 mb-6 leading-relaxed italic border-l-2 border-blue-500/30 pl-4">
              {job.summary}
            </p>
            <ul className="space-y-3">
              {job.highlights.map((point: string, idx: number) => (
                <li key={idx} className="text-sm text-white/50 flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ProjectCard: React.FC<{ project: any }> = ({ project }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-blue-500/30 transition-all flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
          <Code className="w-6 h-6" />
        </div>
        <div className="flex gap-2">
          {project.skills.slice(0, 3).map((skill: string, idx: number) => (
            <span key={idx} className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-white/40 font-bold uppercase tracking-widest">
              {skill}
            </span>
          ))}
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-500 transition-colors">{project.name}</h3>
      <p className="text-white/40 text-sm mb-6">{project.description}</p>
      <ul className="space-y-3 mb-8 flex-grow">
        {project.highlights.map((point: string, idx: number) => (
          <li key={idx} className="text-xs text-white/60 flex items-start gap-2">
            <span className="text-blue-500">•</span>
            {point}
          </li>
        ))}
      </ul>
      <div className="pt-6 border-t border-white/5 flex flex-wrap gap-2">
        {project.skills.slice(3, 8).map((skill: string, idx: number) => (
          <span key={idx} className="text-[9px] text-white/20 uppercase tracking-tighter">{skill}</span>
        ))}
      </div>
    </motion.div>
  );
};

export default App;

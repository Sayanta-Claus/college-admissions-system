import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, GraduationCap, BookOpen, Users, Award, ChevronRight, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import logoUrl from '../assets/Jadavpur_University_Logo.svg.png';

const LandingPage = () => {
  const { theme, toggleTheme } = useTheme();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">

      {/* ── Navbar ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoUrl} alt="JU Logo" className="h-9 w-9" />
            <span className="font-bold text-lg text-blue-700 dark:text-blue-400">Jadavpur University</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-300">
            <button onClick={() => scrollTo('home')} className="hover:text-blue-600 dark:hover:text-blue-400 transition">Home</button>
            <button onClick={() => scrollTo('about')} className="hover:text-blue-600 dark:hover:text-blue-400 transition">About</button>
            <button onClick={() => scrollTo('admission')} className="hover:text-blue-600 dark:hover:text-blue-400 transition">Admissions</button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800 transition"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section id="home" className="relative pt-28 pb-24 px-6 overflow-hidden">
        {/* Background gradient blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute top-20 right-0 w-80 h-80 bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-sky-400/10 dark:bg-sky-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <img src={logoUrl} alt="Jadavpur University Logo" className="h-24 w-24 drop-shadow-xl" />
          </div>
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border border-blue-200 dark:border-blue-700">
            <Award className="h-3.5 w-3.5" />
            Ranked Among India's Top Universities
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-6">
            Welcome to<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Jadavpur University
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
            A premier institution of higher learning in India, fostering excellence in education, research, and innovation since 1955.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollTo('admission')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition"
            >
              Apply Now <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-800 dark:text-gray-200 font-semibold rounded-xl transition"
            >
              Learn More <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="relative max-w-4xl mx-auto mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Students Enrolled', value: '12,000+' },
            { label: 'Faculty Members', value: '600+' },
            { label: 'Departments', value: '37' },
            { label: 'Years of Excellence', value: '70+' },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-5 text-center shadow-sm"
            >
              <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">{value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── About Section ── */}
      <section id="about" className="py-24 px-6 bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">About Us</span>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mt-3 mb-4">A Legacy of Excellence</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Jadavpur University has been shaping brilliant minds for over seven decades, blending tradition with cutting-edge research.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <GraduationCap className="h-7 w-7" />,
                title: 'Academic Excellence',
                desc: 'Our rigorous curricula across Engineering, Science, Arts & Humanities produce graduates sought by the world\'s leading institutions and companies.',
              },
              {
                icon: <BookOpen className="h-7 w-7" />,
                title: 'Research & Innovation',
                desc: 'Home to dozens of research centres pursuing breakthroughs in technology, environmental science, literature, and social sciences.',
              },
              {
                icon: <Users className="h-7 w-7" />,
                title: 'Vibrant Community',
                desc: 'A diverse, inclusive campus of over 12,000 students from across India and the world, united by a passion for knowledge.',
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-8 shadow-sm hover:shadow-md transition group"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-5 group-hover:scale-110 transition">
                  {icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Admissions Section ── */}
      <section id="admission" className="py-24 px-6 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">Admissions</span>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mt-3 mb-4">Start Your Journey</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Our admissions portal makes it simple to apply, track your application, and view results — all in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {[
              { step: '01', title: 'Create Account', desc: 'Register on our portal with your basic details to get started.' },
              { step: '02', title: 'Submit Application', desc: 'Fill in academic details and upload required documents securely.' },
              { step: '03', title: 'Track & View Results', desc: 'Monitor your application status and check admission results in real time.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="relative bg-gray-50 dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-8">
                <span className="text-6xl font-extrabold text-blue-100 dark:text-slate-800 absolute top-4 right-6 select-none">{step}</span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-12 text-center text-white shadow-2xl shadow-blue-500/30">
            <h3 className="text-3xl font-extrabold mb-3">Ready to Apply?</h3>
            <p className="text-blue-100 mb-8 max-w-lg mx-auto">
              Log in or create a new account to begin your application to Jadavpur University today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="px-8 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition shadow-lg"
              >
                Sign In to Portal
              </Link>
              <Link
                to="/register"
                className="px-8 py-3 bg-blue-500/30 hover:bg-blue-500/50 border border-white/30 text-white font-bold rounded-xl transition"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 py-12 px-6 transition-colors duration-300">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src={logoUrl} alt="JU Logo" className="h-8 w-8" />
              <span className="font-bold text-gray-900 dark:text-white">Jadavpur University</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              188, Raja S.C. Mallick Road, Kolkata — 700032, West Bengal, India.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><button onClick={() => scrollTo('home')} className="hover:text-blue-600 dark:hover:text-blue-400 transition">Home</button></li>
              <li><button onClick={() => scrollTo('about')} className="hover:text-blue-600 dark:hover:text-blue-400 transition">About</button></li>
              <li><button onClick={() => scrollTo('admission')} className="hover:text-blue-600 dark:hover:text-blue-400 transition">Admissions</button></li>
              <li><Link to="/login" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Student Portal</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-blue-500 shrink-0" /> Kolkata, West Bengal, India</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-blue-500 shrink-0" /> +91-33-2414-6011</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-blue-500 shrink-0" /> registrar@jadavpuruniversity.in</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-gray-200 dark:border-slate-800 text-center text-xs text-gray-400 dark:text-gray-600">
          © {new Date().getFullYear()} Jadavpur University. All rights reserved.
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;

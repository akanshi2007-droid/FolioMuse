import { uid } from './utils.js';

export const emptyProfile = () => ({
  name: '',
  role: '',
  tagline: '',
  bio: '',
  location: '',
  email: '',
  photo: '',
  skills: [],
  projects: [],
  socials: { github: '', linkedin: '', twitter: '', instagram: '', website: '' },
});

export const newProject = () => ({ id: uid(), title: '', description: '', tech: [], repo: '', demo: '', image: '' });

export const sampleProfile = () => ({
  name: 'Aakanksha',
  role: 'Full-Stack Developer',
  tagline: 'I turn messy ideas into clean, friendly web experiences.',
  bio:
    "I'm a second-year computer science student who loves the space where design meets code. I've shipped hackathon projects, led a club's website redesign and I'm always sketching the next interface.\n\nWhen I'm not building, I'm usually playing retro games or reading about typography.",
  location: 'Chennai, India',
  email: 'ada.rao@example.com',
  photo: '',
  skills: ['React', 'JavaScript', 'Tailwind CSS', 'Node.js', 'Figma', 'SQL', 'Git', 'UI Design'],
  projects: [
    { id: uid(), title: 'CampusLive', description: 'A real-time events board for college clubs with RSVPs, reminders and a calendar view.', tech: ['React', 'Supabase', 'Tailwind'], repo: 'github.com/ada/campuslive', demo: 'campuslive.example.com', image: '' },
    { id: uid(), title: 'QR Attendance', description: 'Geo-tagged QR attendance for classrooms. Teachers generate a code, students scan, location is verified.', tech: ['Node.js', 'MongoDB', 'Express'], repo: 'github.com/ada/qr-attendance', demo: '', image: '' },
    { id: uid(), title: 'Pixel Palette', description: 'A tiny colour-palette generator that exports swatches as CSS variables.', tech: ['JavaScript', 'CSS'], repo: 'github.com/ada/pixel-palette', demo: 'pixelpalette.example.com', image: '' },
  ],
  socials: { github: 'akanshi2007-droid', linkedin: 'aakanksha07', twitter: '', instagram: '', website: '' },
});

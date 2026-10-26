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
  email: 'akanshi2007@gmail.com',
  photo: '/aakanksha.png',
  skills: ['React', 'JavaScript', 'Tailwind CSS', 'Node.js', 'Figma', 'SQL', 'Git', 'UI Design'],
  projects: [
    { id: uid(), title: 'SRMlive', description: 'A real-time events board for college clubs with RSVPs, reminders and a calendar view.', tech: ['React', 'Supabase', 'Tailwind'], repo: 'github.com/ada/campuslive', demo: 'campuslive.example.com', image: '/image2.png' },
    { id: uid(), title: 'QRious', description: 'Geo-tagged QR attendance for classrooms. Teachers generate a code, students scan, location is verified.', tech: ['Node.js', 'MongoDB', 'Express'], repo: 'github.com/ada/qr-attendance', demo: '', image: '/image1.png' },
    { id: uid(), title: 'Pixel Palette', description: 'A tiny colour-palette generator that exports swatches as CSS variables.', tech: ['JavaScript', 'CSS'], repo: 'github.com/ada/pixel-palette', demo: 'pixelpalette.example.com', image: '/image.png' },
  ],
  socials: { github: 'https://github.com/akanshi2007-droid', linkedin: 'https://www.linkedin.com/in/aakanksha-singh007/?isSelfProfile=true', twitter: '', instagram: '', website: '' },
});

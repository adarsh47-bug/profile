import {
  Hero,
  About,
  Skills,
  Projects,
  Experience,
  Achievements,
  Contact
} from '../components/sections';
import Education from '../components/sections/Education';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Education />
      <Projects />
      <Achievements />
      <Skills />
      <Contact />
    </>
  );
}

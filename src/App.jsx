import { Layout } from './components/common';
import {
  Hero,
  About,
  Skills,
  Projects,
  Experience,
  Achievements,
  Contact
} from './components/sections';

function App() {
  return (
    <Layout>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Achievements />
      <Contact />
    </Layout>
  );
}

export default App;

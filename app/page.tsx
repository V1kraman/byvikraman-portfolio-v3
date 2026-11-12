import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Currently } from "@/components/Currently";
import { Projects } from "@/components/Projects";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Education } from "@/components/Education";
import { Contact, Footer } from "@/components/Contact";
import { getAllPosts, getFeaturedWork } from "@/lib/content/mdx";

export default function Home() {
  const allPosts = getAllPosts();
  // Retrieve strictly the single most recently published project (limit = 1)
  const latestProject = getFeaturedWork(allPosts, 1);

  return (
    <main id="main-content" className="relative min-h-screen flex flex-col">
      <Navbar />
      <Hero projects={latestProject} />
      <Currently />
      <Projects
        projects={latestProject}
        totalProjectsCount={allPosts.length}
        viewAllLink="/work"
        viewAllText="Explore Work"
        showIndex={true}
      />
      <About />
      <Skills />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}

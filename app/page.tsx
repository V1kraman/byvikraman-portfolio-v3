import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Education } from "@/components/Education";
import { Contact, Footer } from "@/components/Contact";
import { getAllPosts, getFeaturedWork } from "@/lib/content/mdx";

export default function Home() {
  const allPosts = getAllPosts();
  const featuredWork = getFeaturedWork(allPosts, 2);

  return (
    <main className="relative min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects 
        projects={featuredWork} 
        totalProjectsCount={allPosts.length}
        viewAllLink="/work" 
        viewAllText="Explore Work" 
        showIndex={false}
      />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}

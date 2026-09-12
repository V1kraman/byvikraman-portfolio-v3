import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Education } from "@/components/Education";
import { Contact, Footer } from "@/components/Contact";
import { getAllPosts } from "@/lib/content/mdx";

export default function Home() {
  const posts = getAllPosts();
  const allProjects = posts.filter(post => post.type === 'project');
  const featuredProjects = allProjects.filter(post => post.featured);

  return (
    <main className="relative min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects 
        projects={featuredProjects.slice(0, 4)} 
        totalProjectsCount={allProjects.length}
        viewAllLink="/work" 
        viewAllText="Explore All Work" 
        showIndex={false}
      />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}

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
  const featuredProjects = posts.filter(post => post.type === 'project' && post.featured);

  return (
    <main className="relative min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects projects={featuredProjects.slice(0, 2)} viewAllLink="/work" viewAllText="Explore All Work" />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}

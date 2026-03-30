import NavBar from '@/components/NavBar'
import HeroSection from '@/components/HeroSection'
import FeaturedPost from '@/components/FeaturedPost'
import PostsGrid from '@/components/PostsGrid'
import PollWidget from '@/components/PollWidget'
import WhyZambiaSection from '@/components/WhyZambiaSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#06060a]">
      <NavBar />
      <HeroSection />
      <FeaturedPost />
      <div className="circuit-line max-w-7xl mx-auto !w-full mb-8" style={{ margin: '0 auto', maxWidth: '80rem' }} />
      <PostsGrid />
      <div className="circuit-line max-w-7xl mx-auto !w-full mb-8" style={{ margin: '0 auto', maxWidth: '80rem' }} />
      <PollWidget />
      <WhyZambiaSection />
      <Footer />
    </main>
  )
}

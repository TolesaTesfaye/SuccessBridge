import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@components/common/Button'

export const About: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About SuccessBridge</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            We're on a mission to democratize education in Ethiopia by providing accessible, high-quality learning resources to students across all universities and high schools.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-4">
                To empower every Ethiopian student with access to quality educational resources, interactive learning tools, and personalized support to achieve their academic goals.
              </p>
              <p className="text-lg text-gray-600">
                We believe that education is the foundation of progress, and every student deserves the opportunity to succeed regardless of their background or location.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-6xl mb-4">🎯</div>
                <p className="text-xl font-semibold">Empowering Education</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Our Values</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600">
                We're committed to providing the highest quality educational content and tools.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Accessibility</h3>
              <p className="text-gray-600">
                Education should be accessible to everyone, everywhere, at any time.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                We continuously innovate to provide better learning experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Our Impact</h2>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-8 border-2 border-purple-200 rounded-lg">
              <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
              <p className="text-gray-600">Universities Supported</p>
            </div>

            <div className="p-8 border-2 border-purple-200 rounded-lg">
              <div className="text-4xl font-bold text-purple-600 mb-2">1000+</div>
              <p className="text-gray-600">Learning Resources</p>
            </div>

            <div className="p-8 border-2 border-purple-200 rounded-lg">
              <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
              <p className="text-gray-600">Interactive Quizzes</p>
            </div>

            <div className="p-8 border-2 border-purple-200 rounded-lg">
              <div className="text-4xl font-bold text-purple-600 mb-2">10K+</div>
              <p className="text-gray-600">Active Students</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Our Team</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                AB
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Abebe Kebede</h3>
              <p className="text-gray-600 mb-2">Founder & CEO</p>
              <p className="text-sm text-gray-500">
                Passionate about education and technology. Leading SuccessBridge's vision.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                AT
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Almaz Tadesse</h3>
              <p className="text-gray-600 mb-2">Head of Content</p>
              <p className="text-sm text-gray-500">
                Curating high-quality educational resources for all subjects.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                BA
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Berhanu Assefa</h3>
              <p className="text-gray-600 mb-2">Head of Technology</p>
              <p className="text-sm text-gray-500">
                Building scalable technology solutions for education.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Join Our Mission</h2>
          <p className="text-xl text-gray-600 mb-8">
            Help us transform education in Ethiopia. Whether you're a student, educator, or partner, there's a place for you.
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="primary" onClick={() => navigate('/register')} className="px-8 py-3">
              Get Started
            </Button>
            <Button variant="secondary" onClick={() => navigate('/')} className="px-8 py-3">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

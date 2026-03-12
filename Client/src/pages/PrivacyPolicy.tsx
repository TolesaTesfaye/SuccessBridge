import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@components/common/Button'

export const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-gray-500 mt-4">Last updated: March 2024</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Information We Collect</h2>
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Name and email address when you register</li>
                <li>• Educational information (school, grade level, subjects)</li>
                <li>• Profile information you choose to provide</li>
                <li>• Communication preferences</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Usage Information</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Learning progress and quiz results</li>
                <li>• Resources accessed and time spent</li>
                <li>• Device and browser information</li>
                <li>• IP address and location data</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">How We Use Your Information</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Educational Services</h3>
                <p className="text-blue-800">
                  To provide personalized learning experiences, track progress, and recommend relevant resources.
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-green-900 mb-3">Platform Improvement</h3>
                <p className="text-green-800">
                  To analyze usage patterns, improve our services, and develop new features.
                </p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-900 mb-3">Communication</h3>
                <p className="text-purple-800">
                  To send important updates, educational content, and respond to your inquiries.
                </p>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-orange-900 mb-3">Security & Safety</h3>
                <p className="text-orange-800">
                  To protect our platform, prevent fraud, and ensure a safe learning environment.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Information Sharing</h2>
            <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-8">
              <h3 className="text-lg font-semibold text-red-900 mb-2">We Do NOT Sell Your Data</h3>
              <p className="text-red-800">
                SuccessBridge never sells, rents, or trades your personal information to third parties for marketing purposes.
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Limited Sharing</h3>
                <p className="text-gray-600 mb-4">We may share information only in these specific cases:</p>
                <ul className="text-gray-600 space-y-2">
                  <li>• With your explicit consent</li>
                  <li>• To comply with legal requirements</li>
                  <li>• To protect our rights and safety</li>
                  <li>• With trusted service providers (under strict agreements)</li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Your Rights</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <div className="text-3xl mb-3">👁️</div>
                <h3 className="font-semibold text-gray-900 mb-2">Access</h3>
                <p className="text-sm text-gray-600">View all data we have about you</p>
              </div>
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <div className="text-3xl mb-3">✏️</div>
                <h3 className="font-semibold text-gray-900 mb-2">Correct</h3>
                <p className="text-sm text-gray-600">Update or fix your information</p>
              </div>
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <div className="text-3xl mb-3">🗑️</div>
                <h3 className="font-semibold text-gray-900 mb-2">Delete</h3>
                <p className="text-sm text-gray-600">Remove your account and data</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Data Security</h2>
            <div className="bg-green-50 p-6 rounded-lg mb-8">
              <p className="text-green-800 mb-4">
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="text-green-700 space-y-2">
                <li>• Encrypted data transmission (HTTPS/SSL)</li>
                <li>• Secure data storage with access controls</li>
                <li>• Regular security audits and updates</li>
                <li>• Limited employee access on need-to-know basis</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Cookies & Tracking</h2>
            <div className="space-y-4 mb-8">
              <p className="text-gray-600">
                We use cookies and similar technologies to enhance your experience:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Essential Cookies</h4>
                  <p className="text-sm text-gray-600">Required for basic platform functionality</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Analytics Cookies</h4>
                  <p className="text-sm text-gray-600">Help us understand how you use our platform</p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Contact Us</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <p className="text-blue-800 mb-4">
                If you have questions about this privacy policy or your data:
              </p>
              <div className="space-y-2 text-blue-700">
                <p>📧 Email: privacy@successbridge.edu.et</p>
                <p>📞 Phone: +251 900 000 000</p>
                <p>📍 Address: Addis Ababa, Ethiopia</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions About Privacy?</h2>
          <p className="text-lg text-gray-600 mb-8">
            We're here to help. Contact us anytime about your privacy concerns.
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="primary" onClick={() => navigate('/contact')} className="px-8 py-3">
              Contact Us
            </Button>
            <Button variant="secondary" onClick={() => navigate('/')} className="px-8 py-3">
              Back to Home
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
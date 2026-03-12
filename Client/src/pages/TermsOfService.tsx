import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@components/common/Button'

export const TermsOfService: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Please read these terms carefully before using SuccessBridge. By using our platform, you agree to these terms.
          </p>
          <p className="text-sm text-gray-500 mt-4">Last updated: March 2024</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Acceptance of Terms</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <p className="text-blue-800">
                By accessing and using SuccessBridge, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Use License</h2>
            <div className="space-y-6 mb-8">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-green-900 mb-4">Permitted Use</h3>
                <ul className="text-green-800 space-y-2">
                  <li>• Access educational resources for personal learning</li>
                  <li>• Take quizzes and track your progress</li>
                  <li>• Participate in educational discussions</li>
                  <li>• Share appropriate educational content</li>
                </ul>
              </div>

              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-red-900 mb-4">Prohibited Use</h3>
                <ul className="text-red-800 space-y-2">
                  <li>• Modify or copy the materials</li>
                  <li>• Use materials for commercial purposes</li>
                  <li>• Remove copyright or proprietary notations</li>
                  <li>• Transfer materials to another person</li>
                  <li>• Attempt to reverse engineer any software</li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">User Accounts</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-900 mb-3">Account Responsibility</h3>
                <p className="text-purple-800 text-sm">
                  You are responsible for maintaining the confidentiality of your account and password. 
                  You agree to accept responsibility for all activities under your account.
                </p>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-orange-900 mb-3">Accurate Information</h3>
                <p className="text-orange-800 text-sm">
                  You agree to provide accurate, current, and complete information during registration 
                  and to update such information as necessary.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Educational Content</h2>
            <div className="space-y-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Content Accuracy</h3>
                <p className="text-gray-600 mb-4">
                  While we strive to provide accurate and up-to-date educational content, we make no warranties 
                  about the completeness, reliability, or accuracy of this information.
                </p>
                <p className="text-gray-600">
                  Any reliance you place on such information is strictly at your own risk.
                </p>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-yellow-900 mb-4">User-Generated Content</h3>
                <p className="text-yellow-800 mb-4">
                  By submitting content to SuccessBridge, you grant us a non-exclusive, worldwide, 
                  royalty-free license to use, reproduce, and distribute such content.
                </p>
                <p className="text-yellow-800">
                  You represent that you own or have the necessary rights to all content you submit.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Privacy & Data Protection</h2>
            <div className="bg-indigo-50 p-6 rounded-lg mb-8">
              <p className="text-indigo-800 mb-4">
                Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy.
              </p>
              <Button 
                variant="secondary" 
                onClick={() => navigate('/privacy-policy')} 
                className="text-sm"
              >
                Read Privacy Policy
              </Button>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Intellectual Property</h2>
            <div className="space-y-4 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Platform Ownership</h3>
                <p className="text-gray-600">
                  The SuccessBridge platform, including its design, functionality, and original content, 
                  is owned by SuccessBridge and protected by international copyright laws.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Educational Materials</h3>
                <p className="text-gray-600">
                  Educational materials are provided for learning purposes only. 
                  Redistribution or commercial use requires explicit permission.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Service Availability</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">No Guarantee of Availability</h3>
              <p className="text-yellow-800">
                We strive to maintain service availability but do not guarantee uninterrupted access. 
                We may suspend or terminate services for maintenance, updates, or other reasons.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Limitation of Liability</h2>
            <div className="bg-red-50 p-6 rounded-lg mb-8">
              <p className="text-red-800 mb-4">
                SuccessBridge shall not be liable for any indirect, incidental, special, consequential, 
                or punitive damages resulting from your use of the platform.
              </p>
              <p className="text-red-800">
                Our total liability shall not exceed the amount you paid for using our services (which is currently free).
              </p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Termination</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">By You</h3>
                <p className="text-gray-600 text-sm">
                  You may terminate your account at any time by contacting us or using the account deletion feature.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">By Us</h3>
                <p className="text-gray-600 text-sm">
                  We may terminate accounts that violate these terms or engage in harmful activities.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Changes to Terms</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <p className="text-blue-800 mb-4">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting.
              </p>
              <p className="text-blue-800">
                Continued use of the platform after changes constitutes acceptance of the new terms.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Governing Law</h2>
            <div className="bg-green-50 p-6 rounded-lg mb-8">
              <p className="text-green-800">
                These terms are governed by the laws of Ethiopia. Any disputes will be resolved in the courts of Addis Ababa, Ethiopia.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Contact Information</h2>
            <div className="bg-indigo-50 p-6 rounded-lg mb-8">
              <p className="text-indigo-800 mb-4">
                If you have questions about these Terms of Service:
              </p>
              <div className="space-y-2 text-indigo-700">
                <p>📧 Email: legal@successbridge.edu.et</p>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Learning?</h2>
          <p className="text-lg text-gray-600 mb-8">
            By using SuccessBridge, you agree to these terms and can start your educational journey.
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="primary" onClick={() => navigate('/register')} className="px-8 py-3">
              Get Started
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
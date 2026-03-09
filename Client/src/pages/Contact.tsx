import React, { useState } from 'react'
import { Button } from '@components/common/Button'
import { FormInput } from '@components/forms/FormInput'
import { FormTextarea } from '@components/forms/FormTextarea'

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send to a backend
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Have questions or feedback? We'd love to hear from you. Contact us anytime.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                  <p className="text-gray-600">
                    <a href="mailto:support@successbridge.edu" className="hover:text-purple-600">
                      support@successbridge.edu
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
                  <p className="text-gray-600">
                    <a href="tel:+251911234567" className="hover:text-purple-600">
                      +251 (0) 911 234 567
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Address</h3>
                  <p className="text-gray-600">
                    Addis Ababa, Ethiopia<br />
                    East Africa
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>

                {submitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800">Thank you! We'll get back to you soon.</p>
                  </div>
                )}

                <div className="space-y-6">
                  <FormInput
                    label="Full Name"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                  <FormInput
                    label="Email Address"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                  <FormInput
                    label="Subject"
                    type="text"
                    name="subject"
                    placeholder="What is this about?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />

                  <FormTextarea
                    label="Message"
                    name="message"
                    placeholder="Tell us more..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    required
                  />

                  <Button variant="primary" type="submit" className="w-full">
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is SuccessBridge free?</h3>
              <p className="text-gray-600">
                Yes! SuccessBridge is completely free for all students. We believe education should be accessible to everyone.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I create an account?</h3>
              <p className="text-gray-600">
                Simply click the "Sign Up" button and fill in your details. You'll have access to all resources immediately.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I upload resources?</h3>
              <p className="text-gray-600">
                Only admins and super admins can upload resources. If you're an educator, contact us to become an admin.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I track my progress?</h3>
              <p className="text-gray-600">
                Your progress is automatically tracked. Visit the "Progress" section in your dashboard to see detailed analytics.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What subjects are available?</h3>
              <p className="text-gray-600">
                We cover all major subjects for high school and university levels. New subjects are added regularly.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How can I report an issue?</h3>
              <p className="text-gray-600">
                Use this contact form to report any issues. Our team will respond within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

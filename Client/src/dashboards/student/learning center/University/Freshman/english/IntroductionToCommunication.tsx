import React from 'react'

const IntroductionToCommunication: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Introduction to Communication</h1>
        
        <div className="prose prose-lg max-w-none">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">What is Communication?</h2>
            <p className="text-gray-700 text-lg">
              Communication is the process of exchanging information, ideas, thoughts, and feelings between individuals or groups. 
              It is a fundamental human activity that enables us to share knowledge, build relationships, and coordinate activities.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Components of Communication</h2>
            
            <div className="grid gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-800 mb-3">1. Sender</h3>
                <p className="text-gray-700">
                  The person who initiates the message. The sender encodes their thoughts, ideas, or feelings into a message 
                  that can be transmitted to the receiver. The effectiveness of communication often depends on the sender's 
                  ability to clearly express their intended meaning.
                </p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-purple-800 mb-3">2. Message</h3>
                <p className="text-gray-700">
                  The information being conveyed. This can be verbal (spoken or written words), non-verbal (body language, 
                  gestures, facial expressions), or visual (images, symbols, charts). The message should be clear, 
                  relevant, and appropriate for the intended audience.
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-orange-800 mb-3">3. Channel</h3>
                <p className="text-gray-700">
                  The medium used to transmit the message. This could be face-to-face conversation, telephone, email, 
                  text message, letter, or any other form of communication medium. The choice of channel can significantly 
                  impact how the message is received and interpreted.
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-red-800 mb-3">4. Receiver</h3>
                <p className="text-gray-700">
                  The person for whom the message is intended. The receiver decodes the message and interprets its meaning 
                  based on their own knowledge, experience, and context. Effective communication requires considering 
                  the receiver's perspective and background.
                </p>
              </div>

              <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-teal-800 mb-3">5. Feedback</h3>
                <p className="text-gray-700">
                  The receiver's response to the message. Feedback helps the sender understand whether the message was 
                  received and interpreted correctly. It can be verbal, non-verbal, or written, and is essential for 
                  ensuring effective two-way communication.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-yellow-800 mb-4">The Communication Process</h2>
            <div className="text-gray-700">
              <p className="mb-4">
                Effective communication follows a cyclical process:
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>The sender has an idea or message to communicate</li>
                <li>The sender encodes the message into words, symbols, or gestures</li>
                <li>The message is transmitted through a chosen channel</li>
                <li>The receiver receives and decodes the message</li>
                <li>The receiver provides feedback to the sender</li>
                <li>The process continues as needed for clarification or further communication</li>
              </ol>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Barriers to Effective Communication</h2>
            <div className="text-gray-700">
              <p className="mb-4">Several factors can interfere with effective communication:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Physical barriers:</strong> Noise, distance, poor technology</li>
                <li><strong>Language barriers:</strong> Different languages, jargon, technical terms</li>
                <li><strong>Cultural barriers:</strong> Different cultural backgrounds and norms</li>
                <li><strong>Emotional barriers:</strong> Stress, anger, fear, or other strong emotions</li>
                <li><strong>Perceptual barriers:</strong> Different interpretations and assumptions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IntroductionToCommunication
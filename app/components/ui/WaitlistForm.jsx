import { useState } from 'react';

function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [interestedInPremium, setInterestedInPremium] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:3001/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, interested_in_premium: interestedInPremium }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Thank you for joining the waitlist!');
        setEmail('');
        setInterestedInPremium(false);
      } else {
        setMessage(data.message || 'Failed to join waitlist');
      }
    } catch (error) {
      console.error('Waitlist error:', error);
      setMessage('Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-[#2c3e50] mb-4">Join Our Waitlist</h2>
      <p className="text-[#2c3e50] mb-4">
        Be the first to access premium features like advanced DSA analytics!
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-[#2c3e50] mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3498db]"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center text-[#2c3e50]">
            <input
              type="checkbox"
              checked={interestedInPremium}
              onChange={(e) => setInterestedInPremium(e.target.checked)}
              className="mr-2"
            />
            Interested in premium features (e.g., analytics, exclusive content)
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md text-white ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#3498db] hover:bg-[#2980b9]'
          }`}
        >
          {loading ? 'Joining...' : 'Join Waitlist'}
        </button>
      </form>
      {message && (
        <p
          className={`mt-4 text-center ${
            message.includes('Thank you') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default WaitlistForm;
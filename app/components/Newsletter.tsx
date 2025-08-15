import { useState } from "react";

interface NewsletterProps {
  inline?: boolean;
  banner?: boolean;
  title?: string;
  description?: string;
}

export function Newsletter({ 
  inline = false,
  banner = false,
  title = "Subscribe to Research Updates",
  description = "Get notified when new investment research is published."
}: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Placeholder for email service integration
      // Replace with actual API call (Mailchimp, ConvertKit, etc.)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('success');
      setMessage("Thank you for subscribing! You'll receive updates on new research.");
      setEmail("");
    } catch (error) {
      setStatus('error');
      setMessage("Something went wrong. Please try again.");
    }
  };

  if (banner) {
    return (
      <div className="bg-gray-50 border-b border-gray-200 py-4">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{title}</h3>
                  <p className="text-xs text-gray-600">{description}</p>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="text-sm px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-black w-full sm:w-48"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="text-sm px-4 py-2 bg-black text-white rounded-sm hover:bg-gray-800 disabled:opacity-50 transition-colors whitespace-nowrap"
                  >
                    {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
              </div>
            </div>
            
            {status === 'success' && (
              <div className="mt-2">
                <p className="text-green-600 text-xs">{message}</p>
              </div>
            )}
            {status === 'error' && (
              <div className="mt-2">
                <p className="text-red-600 text-xs">{message}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (inline) {
    return (
      <div className="bg-gray-50 p-6 rounded-sm my-8">
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-black"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-2 bg-black text-white rounded-sm hover:bg-gray-800 disabled:opacity-50 transition-colors"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        {status === 'success' && (
          <p className="text-green-600 text-sm mt-2">{message}</p>
        )}
        {status === 'error' && (
          <p className="text-red-600 text-sm mt-2">{message}</p>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-light mb-4">{title}</h2>
      <p className="text-gray-600 mb-6">{description}</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-black"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-3 bg-black text-white rounded-sm hover:bg-gray-800 disabled:opacity-50 transition-colors"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      
      {status === 'success' && (
        <p className="text-green-600 text-sm mt-4">{message}</p>
      )}
      {status === 'error' && (
        <p className="text-red-600 text-sm mt-4">{message}</p>
      )}
    </div>
  );
}
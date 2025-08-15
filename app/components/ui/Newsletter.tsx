import { useState, useEffect } from "react";
import { useFetcher } from "react-router";
import { Modal } from "./Modal";
import confetti from "canvas-confetti";

interface NewsletterProps {
  inline?: boolean;
  banner?: boolean;
  title?: string;
  description?: string;
}

export function Newsletter({ 
  inline = false,
  banner = false,
  title = "Subscribe to my newsletter",
  description = "Get notified when I publish new ideas and projects."
}: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const fetcher = useFetcher();

  const isLoading = fetcher.state === "submitting";
  const isSuccess = fetcher.data?.success;
  const error = fetcher.data?.error;

  useEffect(() => {
    if (isSuccess) {
      setEmail("");
      setShowSuccessModal(true);
    }
  }, [isSuccess]);

  // Trigger confetti when success modal opens
  useEffect(() => {
    if (showSuccessModal) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        disableForReducedMotion: true,
        colors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57']
      });
    }
  }, [showSuccessModal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    fetcher.submit(formData, { method: 'POST' });
  };

  if (banner) {
    return (
      <>
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
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="text-sm px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-black w-full sm:w-48 h-9"
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="text-sm px-4 py-2 bg-black text-white rounded-sm hover:bg-gray-800 disabled:opacity-50 transition-colors whitespace-nowrap h-9 flex items-center justify-center"
                    >
                      {isLoading ? 'Subscribing...' : 'Subscribe'}
                    </button>
                  </form>
                </div>
              </div>
              
              {error && (
                <div className="mt-2">
                  <p className="text-red-600 text-xs">{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <Modal 
          isOpen={showSuccessModal} 
          onClose={() => setShowSuccessModal(false)}
          title="Successfully Subscribed! 🎉"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-gray-600 leading-relaxed mb-8 font-light">{fetcher.data?.message}</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="px-6 py-2 bg-black text-white rounded-sm hover:bg-gray-800 transition-colors font-medium"
            >
              Got it
            </button>
          </div>
        </Modal>
      </>
    );
  }

  if (inline) {
    return (
      <>
        <div className="bg-gray-50 p-6 rounded-sm my-8">
          <h3 className="text-lg font-medium mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-black h-10"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-black text-white rounded-sm hover:bg-gray-800 disabled:opacity-50 transition-colors h-10 flex items-center justify-center whitespace-nowrap"
            >
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          {error && (
            <p className="text-red-600 text-sm mt-2">{error}</p>
          )}
        </div>
        
        <Modal 
          isOpen={showSuccessModal} 
          onClose={() => setShowSuccessModal(false)}
          title="Successfully Subscribed! 🎉"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-gray-600 leading-relaxed mb-8 font-light">{fetcher.data?.message}</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="px-6 py-2 bg-black text-white rounded-sm hover:bg-gray-800 transition-colors font-medium"
            >
              Got it
            </button>
          </div>
        </Modal>
      </>
    );
  }

  return (
    <>
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
            disabled={isLoading}
            className="w-full py-3 bg-black text-white rounded-sm hover:bg-gray-800 disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        
        {error && (
          <p className="text-red-600 text-sm mt-4">{error}</p>
        )}
      </div>
      
      <Modal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)}
        title="Successfully Subscribed!"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-gray-600 leading-relaxed mb-8">{fetcher.data?.message}</p>
          <button
            onClick={() => setShowSuccessModal(false)}
            className="px-6 py-2 bg-black text-white rounded-sm hover:bg-gray-800 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
}
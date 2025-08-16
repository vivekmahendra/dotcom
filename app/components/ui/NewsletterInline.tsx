import { useState, useEffect } from "react";
import { Form, useActionData, useNavigation } from "react-router";
import { Modal } from "./Modal";
import confetti from "canvas-confetti";
import { TEXT_CONFIG } from "../../config/text";

export function NewsletterInline() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const actionData = useActionData() as any;
  const navigation = useNavigation();
  
  const isLoading = navigation.state === "submitting";

  useEffect(() => {
    if (actionData?.success) {
      setShowSuccessModal(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        disableForReducedMotion: true,
        colors: ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FECA57"],
      });
    }
  }, [actionData]);

  return (
    <>
      <div className="bg-gray-50 p-6 rounded-sm my-8">
        <h3 className="text-lg font-medium mb-2">{TEXT_CONFIG.newsletter.inline.title}</h3>
        <p className="text-gray-600 mb-4">{TEXT_CONFIG.newsletter.inline.description}</p>
        <Form 
          method="post"
          className="flex flex-col sm:flex-row gap-3 sm:items-center"
        >
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="flex-1 px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-black h-10"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-black text-white rounded-sm hover:bg-gray-800 disabled:opacity-50 transition-colors h-10 flex items-center justify-center whitespace-nowrap"
          >
            {isLoading ? "Subscribing..." : "Subscribe"}
          </button>
        </Form>
        {actionData?.error && (
          <p className="text-red-600 text-sm mt-2">{actionData.error}</p>
        )}
      </div>

      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Successfully Subscribed! 🎉"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-gray-600 leading-relaxed mb-8 font-light">
            {actionData?.message || "Thank you for subscribing! You'll receive updates when I publish new ideas and projects."}
          </p>
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
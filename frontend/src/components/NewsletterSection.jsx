import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubscribed(true);
    setEmail("");
  };

  const MailIcon = (props) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 4h16v16H4z" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  );

  return (
    <section className="py-16 bg-purple-700/5">
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-2xl mx-auto rounded-lg border bg-white">
          <div className="p-8 text-center">
            <MailIcon className="h-12 w-12 text-purple-700 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Stay in the Scent
            </h2>
            <p className="text-slate-500 mb-6">
              Subscribe to our newsletter and be the first to discover new
              arrivals, exclusive offers, and fragrance tips from our experts.
            </p>

            {isSubscribed ? (
              <div className="text-purple-700 font-medium">
                Thank you for subscribing! Check your email for exclusive
                offers.
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4"
                noValidate
              >
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 h-11 rounded-md border border-slate-200 bg-white px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-700"
                />
                <button
                  type="submit"
                  className="shrink-0 inline-flex items-center justify-center h-11 px-6 rounded-md bg-purple-700 text-white hover:bg-purple-700/90"
                >
                  Subscribe
                </button>
              </form>
            )}

            <p className="text-xs text-slate-500 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#07071A] text-white px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-white/40 text-sm mb-12">Last updated: April 2025</p>

        <div className="space-y-10 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Information We Collect</h2>
            <p>When you sign in with Google, we collect your name, email address, and profile picture provided by Google. If you connect additional social accounts (Instagram, TikTok, X, YouTube), we store OAuth access tokens required to interact with those platforms on your behalf.</p>
            <p className="mt-2">We also store any Anthropic API key you choose to provide, which is used solely to power AI content generation for your account.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>To authenticate you and maintain your session</li>
              <li>To generate AI content via the Anthropic Claude API using your key</li>
              <li>To connect and manage your linked social media accounts</li>
              <li>To display analytics and content history within your dashboard</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Data Sharing</h2>
            <p>We do not sell, rent, or share your personal data with third parties. Your API keys and OAuth tokens are stored securely in our database and are never shared or exposed to other users.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Data Storage & Security</h2>
            <p>Your data is stored in a PostgreSQL database hosted on Railway. We use industry-standard security practices including encrypted connections and hashed passwords. OAuth tokens are stored encrypted at rest.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Third-Party Services</h2>
            <p>ContentFlow integrates with the following third-party services:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Google OAuth — for authentication and YouTube access</li>
              <li>Meta (Instagram) — for Instagram account access</li>
              <li>TikTok — for TikTok account access</li>
              <li>X (Twitter) — for X account access</li>
              <li>Anthropic — for AI content generation</li>
            </ul>
            <p className="mt-2">Each service is subject to its own privacy policy.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Your Rights</h2>
            <p>You may request deletion of your account and all associated data at any time by contacting us. You can also disconnect any linked social account from within the dashboard settings.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Contact</h2>
            <p>If you have questions about this privacy policy, please contact us through the app or via the GitHub repository.</p>
          </section>
        </div>
      </div>
    </div>
  )
}

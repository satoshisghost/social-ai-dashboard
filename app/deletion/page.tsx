export default function DeletionPage() {
  return (
    <div className="min-h-screen bg-[#07071A] text-white px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">User Data Deletion</h1>
        <p className="text-white/40 text-sm mb-12">Last updated: April 2025</p>

        <div className="space-y-10 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">How to Delete Your Data</h2>
            <p>You have the right to request deletion of all personal data associated with your ContentFlow account at any time. This includes your profile information, connected social accounts, generated content, and any stored API keys.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">What Gets Deleted</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Your name, email address, and profile picture</li>
              <li>All connected social account tokens (Instagram, TikTok, X, YouTube, Google)</li>
              <li>All AI-generated content and drafts</li>
              <li>Your stored Anthropic API key</li>
              <li>Your account login credentials</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">How to Request Deletion</h2>
            <p className="mb-4">You can delete your account and all associated data through any of the following methods:</p>
            <ol className="list-decimal list-inside space-y-3">
              <li>
                <strong className="text-white">From within the app:</strong> Sign in → go to <span className="text-purple-400">Settings</span> → scroll to the bottom → click <span className="text-purple-400">Delete Account</span>. Your data will be permanently deleted immediately.
              </li>
              <li>
                <strong className="text-white">Via email:</strong> Send a deletion request to the contact listed on our GitHub repository. Include the email address associated with your account. We will process your request within 30 days.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Instagram / Meta Data Deletion</h2>
            <p>If you connected your Instagram account and wish to revoke access, you can also do so directly from Instagram:</p>
            <ol className="list-decimal list-inside space-y-2 mt-2">
              <li>Go to your Instagram account settings</li>
              <li>Tap <strong className="text-white">Apps and Websites</strong></li>
              <li>Find <strong className="text-white">ContentFlow</strong> and tap <strong className="text-white">Remove</strong></li>
            </ol>
            <p className="mt-3">This revokes our access token. To delete all stored data, also submit a deletion request using one of the methods above.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Confirmation</h2>
            <p>Once your data has been deleted, you will receive a confirmation. Deletion is permanent and cannot be undone.</p>
          </section>
        </div>
      </div>
    </div>
  )
}

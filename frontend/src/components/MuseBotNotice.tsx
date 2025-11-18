function MuseBotNotice() {
  return (
    <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
      <p className="font-semibold">⚠️ Notice</p>
      <p className="mt-1">
        This feature is powered by OpenAI. All responses and bundle suggestions
        are AI-generated and should not be taken as professional musical advice.
      </p>
      <p className="mt-1">
        You are limited to 6 total requests per 15 minutes (chat + bundles combined). If you reach 
        the limit, please try again after a few minutes.
      </p>
    </div>
  );
}
export default MuseBotNotice;
// Prefilled mailto links rather than a form: there is no backend to receive
// submissions, and a form that silently discards messages is worse than none.
const ContactChannels = ({ channels }) => {
  return (
    <div className="max-w-3xl mx-auto mb-6 grid gap-4 sm:grid-cols-2">
      {channels.map((channel) => (
        <a
          key={channel.subject}
          href={`mailto:${channel.email}?subject=${encodeURIComponent(channel.subject)}`}
          className="group block rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-neutral-950 p-5 shadow-sm hover:border-blue-400 dark:hover:border-blue-500 transition"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {channel.title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            {channel.description}
          </p>
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:underline break-all">
            {channel.email}
          </span>
        </a>
      ))}
    </div>
  );
};

export default ContactChannels;

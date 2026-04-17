const ChatbotIcon = ({ className = "" }) => {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      {/* Bubble */}
      <path
        d="M7.5 5.5h9c2.76 0 5 2.24 5 5v3c0 2.76-2.24 5-5 5H12l-3.9 2.6A1 1 0 0 1 6.5 20.3V18.5h-1c-2.2 0-4-1.8-4-4v-4c0-2.76 2.24-5 5-5Z"
        fill="currentColor"
      />
      {/* Dots */}
      <circle cx="9.2" cy="12" r="1.05" fill="currentColor" opacity="0.35" />
      <circle cx="12" cy="12" r="1.05" fill="currentColor" opacity="0.35" />
      <circle cx="14.8" cy="12" r="1.05" fill="currentColor" opacity="0.35" />
    </svg>
  );
};

export default ChatbotIcon;
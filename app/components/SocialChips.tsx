export default function SocialChips() {
  return (
    <div className="socialChips">
      {/* Twitter (X) */}
      <a
        href="https://x.com/"
        target="_blank"
        rel="noreferrer"
        className="chip"
        aria-label="X"
        title="X"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="chipIcon"
          aria-hidden="true"
        >
          {/* Simple X mark */}
          <path
            d="M3 3l8.3 9.1L3 21h3.1l6.5-7.2L19.5 21H21l-8.6-9.4L21 3h-3.1l-6 6.7L7.7 3H3z"
            fill="currentColor"
          />
        </svg>
      </a>

      {/* Farcaster (arch) */}
      <a
        href="https://www.farcaster.xyz/"
        target="_blank"
        rel="noreferrer"
        className="chip chipPurple"
        aria-label="Farcaster"
        title="Farcaster"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 64 64"
          className="chipIcon"
          aria-hidden="true"
        >
          {/* Arch logo (simplified) */}
          <rect x="10" y="44" width="44" height="6" rx="2" fill="currentColor" />
          <rect x="10" y="18" width="10" height="26" rx="2" fill="currentColor" />
          <rect x="44" y="18" width="10" height="26" rx="2" fill="currentColor" />
          <path
            d="M20 24c7-8 17-8 24 0v20h-8V34a4 4 0 0 0-8 0v10h-8V24z"
            fill="currentColor"
          />
        </svg>
      </a>

      {/* Clanker (3 bars) */}
      <a
        href="https://clanker.world"
        className="chip chipPurple"
        aria-label="Clanker"
        title="Clanker"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 64 64"
          className="chipIcon"
          aria-hidden="true"
        >
          <rect x="10" y="38" width="10" height="16" rx="2" fill="currentColor" />
          <rect x="27" y="30" width="10" height="24" rx="2" fill="currentColor" />
          <rect x="44" y="18" width="10" height="36" rx="2" fill="currentColor" />
        </svg>
      </a>
    </div>
  );
}

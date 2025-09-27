import React from 'react';

export const GoogleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.485 14.34C34.938 10.892 29.834 8 24 8C12.955 8 4 16.955 4 28s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
    <path fill="#FF3D00" d="M6.306 14.691c-1.229 2.59-1.94 5.48-1.94 8.618s.711 6.028 1.94 8.618l8.307-6.425C13.565 24.34 13 22.25 13 20s.565-4.34 1.613-6.025L6.306 14.691z" />
    <path fill="#4CAF50" d="M24 48c5.166 0 9.86-1.977 13.409-5.192l-6.19-4.82c-1.896 1.226-4.223 1.96-6.81 1.96c-5.225 0-9.654-3.52-11.23-8.283l-8.412 6.516C7.94 42.448 15.367 48 24 48z"
    <path fill="#1976D2" d="M43.611 20.083L43.593 20H24v8h11.303a12.04 12.04 0 0 1-4.958 6.425l6.19 4.82A20.006 20.006 0 0 0 44 28c0-1.341-.138-2.65-.389-3.917z" />
  </svg>
);

export const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#1877F2" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.99 3.657 9.128 8.438 9.879V15.89H8.207v-3.784h2.231V9.604c0-2.213 1.317-3.442 3.32-3.442.962 0 1.983.17 1.983.17v3.23h-1.68c-1.09 0-1.42.64-1.42 1.36v1.66h3.604l-.576 3.784h-3.028v6.004C18.343 21.128 22 16.99 22 12z" />
  </svg>
);

export const AppleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M15.229 5.215C16.142 5.22 17.26 5.618 18.23 6.13c.27.143.549.28.848.394a.507.507 0 0 1 .324.63c-.22.459-.46.91-.709 1.356c-.5.88-.99 1.76-1.49 2.628c-.32.559-.61 1.138-.85 1.747c-.03.08-.04.158-.06.247c-.33-.04-.66-.06-.99-.06c-.46 0-.92.03-1.37.09c-.83.11-1.63.3-2.39.56c-1.28.43-2.54.9-3.57 1.63c-1.47 1-2.67 2.3-3.13 4.02c-.14.51-.2.98-.24 1.48c.03.01.05.02.08.02c.75 0 1.43-.26 2.06-.6c.92-.5 1.76-1.11 2.6-1.74c.48-.35.98-.68 1.5-.98c.41-.24.84-.44 1.28-.61c.5-.19 1.01-.3 1.53-.33c.12 0 .23-.01.35-.01c.42 0 .84.02 1.25.07c.83.1 1.64.27 2.41.53c.27.09.53.2.78.32c.12.06.27.11.39.11c.06 0 .12-.01.17-.03c.53-.19.82-.76.62-1.3c-.34-.92-.68-1.85-1.03-2.77c-.49-1.26-.98-2.53-1.46-3.8c-.28-.75-.54-1.5-.74-2.26c-.03-.1-.03-.2-.01-.3c.09.01.18.01.26.02c1.43.1 2.8.53 3.98 1.27c.36.22.7.47 1.01.76c.2.19.46.25.71.13c.26-.13.39-.39.39-.67c-.01-.5-.02-1-.02-1.5c0-.07 0-.13-.01-.2c-.08-.75-.28-1.46-.58-2.12c-.52-1.15-1.2-2.19-2.05-3.1c-.85-.92-1.83-1.66-2.91-2.22c-.54-.28-1.1-.52-1.67-.71c-1.1-.36-2.24-.54-3.4-.54c-1.37 0-2.7.27-3.92.81c-.7.31-1.36.7-1.96 1.17c-1.21.94-2.1 2.1-2.65 3.43c-.46 1.12-.66 2.3-.64 3.5c.01.7.09 1.38.21 2.06c.06.32.32.56.64.57c.33.01.62-.22.68-.54c.14-1.15.54-2.22 1.17-3.19c.64-.97 1.46-1.79 2.45-2.42c.8-.5 1.68-.88 2.61-1.12c.7-.18 1.42-.27 2.14-.27c.4 0 .8.03 1.19.08c.08.01.16.02.24.03c-.1-.13-.2-.26-.29-.39c-.9-1.26-1.32-2.6-1.5-4.01c-.02-.19-.08-.38-.02-.56c.11-.32.48-.48.8-.41M14.63 0C13.62.03 12.56.32 11.66.8c-.32.17-.64.36-.95.56c-.7.44-1.35.96-1.92 1.57c-1.15 1.2-1.93 2.6-2.34 4.15c-.17.65-.27 1.32-.32 2c-.03.35.15.68.48.8c.33.12.69.02.9-.25c.87-1.1 2.12-1.85 3.5-2.2c1.1-.28 2.24-.26 3.32.05c1.3.38 2.49.99 3.42 1.95c.2.2.4.4.6.62c.3-.01.6-.01.9-.01c.54 0 1.08.04 1.6.13c.27.05.54.1.8.18c.33.1.66.23.97.39c.28.14.54.3.79.47c.12.09.28.09.43.02c.14-.07.24-.2.24-.35c0-.98-.01-1.97-.01-2.95c0-.12-.02-.23-.05-.34c-.41-1.48-1.1-2.85-2.04-4.06c-.8-1.03-1.76-1.9-2.85-2.6c-.85-.54-1.77-.94-2.73-1.18c-.48-.12-.96-.2-1.45-.24c-.1-.01-.2-.01-.3-.01Z"/>
  </svg>
);

export const MetamaskIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 112 104" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M111.34 43.15L69.29 2.09C64.92-1.3 58.2-1.28 53.86 2.12L11.53 43.18C-1.89 53.25 -3.48 70.8 7.39 82.59L12.03 88.01L27.61 71.32L17.2 60.12C12.83 55.4 12.83 47.93 17.2 43.21L55.93 2.18L95.14 43.15C99.51 47.88 99.51 55.35 95.14 60.07L84.73 71.29L100.31 87.98L104.95 82.56C116.82 70.77 115.23 53.21 111.34 43.15Z" fill="#E17726"/>
        <path d="M27.58 71.35L12 88.04L7.36 82.62C-3.51 70.83 -1.92 53.27 11.5 43.21L27.58 59.81V71.35Z" fill="#E27625"/>
        <path d="M84.73 71.35V59.81L100.81 43.21C112.67 55 111.09 72.56 100.22 84.35L84.73 71.35Z" fill="#E27625"/>
        <path d="M100.28 88.01L84.7 71.32L74.29 82.53L81.72 90.58L100.28 88.01Z" fill="#E27625"/>
        <path d="M27.61 71.32L12.03 88.01L30.59 90.58L37.99 82.53L27.61 71.32Z" fill="#E27625"/>
        <path d="M74.32 82.56L81.75 90.61L60.4 103.58L51.98 103.55L30.62 90.61L38.02 82.56L56.11 62.94L74.32 82.56Z" fill="#E27625"/>
        <path d="M56.08 62.96L38.01 82.55L30.61 90.59L51.96 103.54L56.08 62.96Z" fill="#D7C0B4"/>
        <path d="M56.14 62.96L74.21 82.55L81.61 90.59L60.26 103.54L56.14 62.96Z" fill="#F6851B"/>
        <path d="M74.29 82.53L56.11 62.94L37.99 82.53L56.11 94.7L74.29 82.53Z" fill="#C0AD9E"/>
        <path d="M56.11 94.7L37.99 82.53L56.11 86.83L74.29 82.53L56.11 94.7Z" fill="#161616"/>
        <path d="M56.08 2.18L17.2 43.21C12.83 47.93 12.83 55.4 17.2 60.12L27.61 71.32L56.08 40.42V2.18Z" fill="#F6851B"/>
        <path d="M55.93 2.18V40.42L84.39 71.32L95.14 60.1C99.51 55.37 99.51 47.9 95.14 43.18L55.93 2.18Z" fill="#E27625"/>
    </svg>
);

export const UserGroupIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.282.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>);
export const CheckBadgeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>);
export const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className || "h-10 w-10 mx-auto"} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L13 12l-1.293-1.293a1 1 0 010-1.414L14 7m5 5l2.293 2.293a1 1 0 010 1.414L19 19l-1.293-1.293a1 1 0 010-1.414L20 14m-3-3l2.293 2.293a1 1 0 010 1.414L17 16l-1.293-1.293a1 1 0 010-1.414L18 11m-5-5l2.293 2.293a1 1 0 010 1.414L13 10l-1.293-1.293a1 1 0 010-1.414L14 5z" /></svg>);
export const CurrencyDollarIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1m0-1V4m0 2.01v.01M12 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 14v-1m0 1v.01M12 12v-1m0 1V10m0 2.01v.01M18 10a6 6 0 11-12 0 6 6 0 0112 0z" /></svg>);
export const CubeTransparentIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M12 21v-2.5M12 18.5l-2 1m2-1l2 1M4 7l2 1M4 7l2-1M4 7v2.5M12 12l2 1m-2-1l-2-1m2 1V9.5M12 4.5v2.5M12 7l2-1M12 7l-2-1" /></svg>);
export const ShieldCheckIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 0118-8.618c0-3.32-1.34-6.32-3.382-8.324z" /></svg>);
export const ScaleIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>);
export const UserPlusIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.375 12.375 0 0110.5 21h-5.076A12.375 12.375 0 014 19.235z" /></svg>);
export const ClipboardIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a2.25 2.25 0 01-2.25 2.25h-1.5a2.25 2.25 0 01-2.25-2.25v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" /></svg>);

export const HeartIcon: React.FC<{ className?: string, isFilled?: boolean }> = ({ className, isFilled }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill={isFilled ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
    </svg>
);

export const ChatBubbleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

export const PaperAirplaneIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>
);

export const ChatBubbleLeftRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.721.124c-.624.041-1.203.24-1.705.572l-3.07 2.456a.75.75 0 01-1.088 0l-3.07-2.456a4.5 4.5 0 00-1.705-.572L3.231 17.193a2.25 2.25 0 01-1.98-2.193V6.428c0-1.136.847-2.1 1.98-2.193l3.721-.124c.624-.041 1.203-.24 1.705-.572L11.4 1.256a.75.75 0 011.088 0l3.07 2.456a4.5 4.5 0 001.705.572l3.721.124a2.25 2.25 0 011.98 2.193z" />
    </svg>
);

export const ShareIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 4.186m0-4.186a2.25 2.25 0 110 4.186m0 0l2.25 1.125m-2.25-1.125l2.25-1.125m0 0l2.25 1.125m-2.25-1.125L12 8.25l-2.25 1.125m2.25-1.125l2.25-1.125M12 8.25l2.25-1.125M12 8.25V3.75m0 4.5l-2.25 1.125m0 0l-2.25 1.125m-2.25-1.125l2.25-1.125m2.25-1.125l2.25-1.125" />
    </svg>
);

export const ArrowUpCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const ArrowDownCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const BellIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
);

export const FilmIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
    </svg>
);

export const AdobeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FF0000" d="M14.504 23.484h7.992V.516h-7.992zM1.504 23.484h7.992V.516H1.504zM8 8.484h8v7.032H8z" />
    </svg>
);

export const OpenAIIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="M22.2819 9.88181L23.1239 10.3638C23.5939 10.6278 23.8619 11.1698 23.8619 11.7458V13.0478C23.8619 13.6238 23.5939 14.1658 23.1239 14.4298L18.0239 17.3458L17.1819 16.8638L22.2819 13.9478V10.8458L17.1819 7.92981L12.0009 10.8758L6.81992 7.92981L1.71992 10.8458V13.9478L6.81992 16.8638L7.66192 17.3458L2.56192 14.4298C2.09192 14.1658 1.82392 13.6238 1.82392 13.0478V11.7458C1.82392 11.1698 2.09192 10.6278 2.56192 10.3638L11.1609 5.57081C11.6019 5.32281 12.1269 5.32281 12.5679 5.57081L22.2819 9.88181ZM12.0009 13.1258L16.3399 10.6538L15.4979 10.1718L12.0009 12.1538L8.50392 10.1718L7.66192 10.6538L12.0009 13.1258ZM17.1819 16.8638L12.0009 19.8098L6.81992 16.8638L2.56192 14.4298L1.71992 14.9118L11.1609 20.1978C11.6019 20.4458 12.1269 20.4458 12.5679 20.1978L23.1239 14.4298L22.2819 13.9478L17.1819 16.8638Z" />
    </svg>
);

export const AnthropicIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="M22.51 13.33H13.7V22.5h-3.41V13.33H1.5V10.6H10.3V1.5h3.41V10.6h8.81v2.73Z" />
    </svg>
);


// SKILL ICONS
export const PaintBrushIcon: React.FC<{className?: string}> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.47 2.118v-.09A12.75 12.75 0 0112 3c2.618 0 5.097 1.028 6.953 2.75l-4.118 4.118a3 3 0 00-1.128 5.78z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12.75m0 0a3 3 0 01-3 3H7.5a3 3 0 01-3-3v-2.25m6 5.25v-2.25m0 0a3 3 0 003-3H12m0 0a3 3 0 00-3 3m3-3V3m0 12.75a3 3 0 013 3v2.25m-6-5.25a3 3 0 003-3m-3 3a3 3 0 00-3 3m0 0h2.25" /></svg>);
export const PencilSquareIcon: React.FC<{className?: string}> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>);
export const CodeBracketIcon: React.FC<{className?: string}> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" /></svg>);
export const CameraIcon: React.FC<{className?: string}> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" /></svg>);
export const BriefcaseIcon: React.FC<{className?: string}> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.098a2.25 2.25 0 01-2.25 2.25h-13.5a2.25 2.25 0 01-2.25-2.25v-4.098m18-8.622a2.25 2.25 0 00-2.25-2.25h-13.5A2.25 2.25 0 002.25 5.528v4.098h18V5.528zM12 18.375a3.75 3.75 0 000-7.5 3.75 3.75 0 000 7.5z" /></svg>);
export const ChartBarIcon: React.FC<{className?: string}> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>);
export const AcademicCapIcon: React.FC<{className?: string}> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path d="M12 14.25c-3.72 0-7.102.13-9.544.372a.75.75 0 00-.456.665v1.98a.75.75 0 00.569.734c2.046.333 4.484.549 7.431.549s5.385-.216 7.431-.55a.75.75 0 00.569-.734v-1.98a.75.75 0 00-.456-.665c-2.442-.242-5.824-.372-9.544-.372z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14.25L12 6.75m0 0l-2.25 1.125M12 6.75L14.25 7.875M12 6.75v1.875m0 0l-2.25 1.125m2.25-1.125l2.25 1.125M3 14.25l9-4.5 9 4.5M3 10.125l9 4.5 9-4.5" /></svg>);
export const BookOpenIcon: React.FC<{className?: string}> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>);
export const Squares2X2Icon: React.FC<{className?: string}> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>);
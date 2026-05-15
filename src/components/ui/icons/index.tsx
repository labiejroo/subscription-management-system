interface IconProps {
  d: React.ReactNode;
  size?: number;
  stroke?: number;
  className?: string;
}

type SvgIconProps = Omit<IconProps, 'd'>;

export const Icon = ({ d, size = 16, stroke = 1.75, className = '' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {d}
  </svg>
);

export const IconSearch = (p: SvgIconProps) => (
  <Icon
    {...p}
    d={
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </>
    }
  />
);
export const IconChevronD = (p: SvgIconProps) => <Icon {...p} d={<path d="m6 9 6 6 6-6" />} />;
export const IconChevronL = (p: SvgIconProps) => <Icon {...p} d={<path d="m15 18-6-6 6-6" />} />;
export const IconChevronR = (p: SvgIconProps) => <Icon {...p} d={<path d="m9 18 6-6-6-6" />} />;
export const IconDownload = (p: SvgIconProps) => (
  <Icon
    {...p}
    d={
      <>
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
      </>
    }
  />
);
export const IconRefresh = (p: SvgIconProps) => (
  <Icon
    {...p}
    d={
      <>
        <path d="M3 12a9 9 0 0 1 15.5-6.3L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-15.5 6.3L3 16" />
        <path d="M3 21v-5h5" />
      </>
    }
  />
);
export const IconCheck = (p: SvgIconProps) => <Icon {...p} d={<path d="m5 12 5 5L20 7" />} />;
export const IconCardCoin = (p: SvgIconProps) => (
  <Icon
    {...p}
    d={
      <>
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10h18" />
      </>
    }
  />
);
export const IconWallet = (p: SvgIconProps) => (
  <Icon
    {...p}
    d={
      <>
        <path d="M3 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2" />
        <rect x="3" y="9" width="18" height="11" rx="2" />
        <circle cx="16" cy="14.5" r="1.2" />
      </>
    }
  />
);
export const IconAlert = (p: SvgIconProps) => (
  <Icon
    {...p}
    d={
      <>
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
        <path d="M10.3 3.8 2.5 18a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0z" />
      </>
    }
  />
);
export const IconClock = (p: SvgIconProps) => (
  <Icon
    {...p}
    d={
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    }
  />
);
export const IconArrowUp = (p: SvgIconProps) => <Icon {...p} d={<path d="M7 14l5-5 5 5" />} />;
export const IconArrowDown = (p: SvgIconProps) => <Icon {...p} d={<path d="M7 10l5 5 5-5" />} />;
export const IconFilter = (p: SvgIconProps) => (
  <Icon {...p} d={<path d="M3 5h18M6 12h12M10 19h4" />} />
);
export const IconClose = (p: SvgIconProps) => (
  <Icon
    {...p}
    d={
      <>
        <path d="M6 6l12 12" />
        <path d="M18 6 6 18" />
      </>
    }
  />
);

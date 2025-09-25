"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX, IconRocket } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import AnimatedButton from "./AnimatedButton";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";

// --- Tabler Eye SVG Logo (static, mobile/desktop responsive) ---
// Use the same gradient as the "OPSIGHT" text for the SVG

// Removed unused gradient ID


const EyeLogo: React.FC<{ className?: string; size?: number }> = ({
  className,
  size = 44,
}) => {
  // Add mobile detection for animation performance
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Simple static logo for mobile
  if (isMobile) {
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #ec4899, #a21caf, #60a5fa)",
          borderRadius: "50%",
          flexShrink: 0,
        }}
      >
        <svg
          width={size * 0.6}
          height={size * 0.6}
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ display: "block" }}
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </div>
    );
  }

  // Animated logo for desktop
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="url(#opsight-logo-gradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{
        display: "block",
        minWidth: size,
        minHeight: size,
        maxWidth: "100%",
        maxHeight: "100%",
        flexShrink: 0,
      }}
      aria-label="Eye logo"
      role="img"
      initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 12,
        duration: 0.8,
      }}
      whileHover={{
        scale: 1.08,
        rotate: 2,
        filter: "drop-shadow(0 0 8px #60a5fa)",
        transition: { type: "spring", stiffness: 300, damping: 15 },
      }}
    >
      <defs>
        <linearGradient id="opsight-logo-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ec4899" />
          <stop offset="0.5" stopColor="#a21caf" />
          <stop offset="1" stopColor="#60a5fa" />
        </linearGradient>
        <radialGradient id="opsight-logo-gradient-fill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#a21caf" />
        </radialGradient>
      </defs>
      <motion.path
        stroke="none"
        d="M0 0h24v24H0z"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      />
      <motion.path
        d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeInOut" }}
        stroke="url(#opsight-logo-gradient)"
      />
      <motion.path
        d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
        stroke="url(#opsight-logo-gradient)"
      />
      <motion.circle
        cx="12"
        cy="12"
        r="2"
        fill="url(#opsight-logo-gradient-fill)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10, delay: 1.1 }}
      />
    </motion.svg>
  );
};

const OpsightEyeLogo: React.FC<{ className?: string; size?: number }> = ({
  className,
  size = 30,
}) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="url(#opsight-workflow-gradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{
        display: "block",
        minWidth: size,
        minHeight: size,
        maxWidth: "100%",
        maxHeight: "100%",
        flexShrink: 0,
      }}
      aria-label="Opsight Eye logo"
      role="img"
      initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 12,
        duration: 0.8,
      }}
    >
      <defs>
        <linearGradient id="opsight-workflow-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ec4899" />
          <stop offset="0.5" stopColor="#a21caf" />
          <stop offset="1" stopColor="#60a5fa" />
        </linearGradient>
        <radialGradient id="opsight-workflow-gradient-fill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#a21caf" />
        </radialGradient>
      </defs>
      <motion.path
        stroke="none"
        d="M0 0h24v24H0z"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      />
      <motion.path
        d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeInOut" }}
        stroke="url(#opsight-workflow-gradient)"
      />
      <motion.path
        d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
        stroke="url(#opsight-workflow-gradient)"
      />
      <motion.circle
        cx="12"
        cy="12"
        r="2"
        fill="url(#opsight-workflow-gradient-fill)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10, delay: 1.1 }}
      />
    </motion.svg>
  );
};

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 200) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn("fixed inset-x-0 top-0 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "60%" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full px-8 py-3 lg:flex backdrop-blur-md border",
        visible && "shadow-2xl",
        className,
      )}
      style={{
        minWidth: "1000px",
        backgroundColor: 'var(--card)',
        borderColor: 'var(--border)',
        opacity: visible ? 0.95 : 0.9
      }}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-8 text-sm font-medium transition duration-200 lg:flex lg:space-x-8",
        className,
      )}
      style={{ color: 'var(--muted-foreground)' }}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={(e) => {
            setHovered(idx);
            e.currentTarget.style.color = 'var(--foreground)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--muted-foreground)';
          }}
          onClick={onItemClick}
          className="relative px-4 py-2 whitespace-nowrap transition-colors"
          style={{
            color: 'var(--muted-foreground)',
          }}
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full"
              style={{ backgroundColor: 'var(--accent)' }}
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "98%" : "100%",
        paddingRight: visible ? "8px" : "0px",
        paddingLeft: visible ? "8px" : "0px",
        borderRadius: visible ? "8px" : "2rem",
        y: visible ? 10 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between px-0 py-2 lg:hidden backdrop-blur-md border",
        visible && "shadow-2xl",
        className,
      )}
      style={{
        backgroundColor: 'var(--card)',
        borderColor: 'var(--border)',
        opacity: visible ? 0.95 : 0.9
      }}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg px-4 py-8 shadow-2xl border backdrop-blur-md mr-4",
            className,
          )}
          style={{
            backgroundColor: 'var(--card)',
            borderColor: 'var(--border)',
            opacity: 0.95
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  // Make the icon mobile compatible: responsive sizing and touch target
  return isOpen ? (
    <IconX
      className="cursor-pointer w-8 h-8 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 p-1"
      onClick={onClick}
      style={{
        color: 'var(--foreground)',
        touchAction: "manipulation",
        minWidth: "2rem",
        minHeight: "2rem",
        display: "relative",
        marginRight: "1rem",
      }}
      aria-label="Close menu"
      tabIndex={0}
      role="button"
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
    />
  ) : (
    <IconMenu2
      className="cursor-pointer w-8 h-8 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 p-1"
      onClick={onClick}
      style={{
        color: 'var(--foreground)',
        touchAction: "manipulation",
        minWidth: "2rem",
        minHeight: "2rem",
        display: "relative",
        marginRight: "1rem",
      }}
      aria-label="Open menu"
      tabIndex={0}
      role="button"
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
    />
  );
};

// --- NavbarLogo using the new Logo component ---
export const NavbarLogo = ({ size = 36, className = "" }: { size?: number, className?: string }) => {
  const router = useRouter();

  return (
    <motion.div
      onClick={() => router.push('/')}
      className={`cursor-pointer ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Logo size={size} animated={true} showText={true} />
    </motion.div>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-4 py-2 rounded-md bg-white button bg-white text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary: "bg-transparent shadow-none dark:text-white",
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};

// Main navbar component that uses all the above components
export default function AdvancedNavbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Problems', link: '#problems' },
    { name: 'Process', link: '#process' },
    { name: 'Services', link: '#services' }
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <Navbar>
      {/* Desktop Navbar */}
      <NavBody>
        <NavbarLogo size={36} className="w-8 h-8" />
        <NavItems
          items={navItems}
          onItemClick={() => setIsOpen(false)}
        />
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <AnimatedButton
            onClick={() => router.push('/auth/signup')}
            variant="gradient"
            size="sm"
            className="text-xs px-4 py-1.5"
          >
            <IconRocket className="h-3 w-3 xs:h-4 xs:w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-5 lg:w-5" />
            <span>Free Pilot</span>
          </AnimatedButton>
        </div>
      </NavBody>

      {/* Mobile Navbar */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo size={32} className="w-8 h-8 flex-shrink-0" />
          <MobileNavToggle
            isOpen={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          />
        </MobileNavHeader>
        <MobileNavMenu
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleNavClick(item.link)}
              className="transition-colors"
              style={{
                color: 'var(--muted-foreground)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--foreground)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--muted-foreground)';
              }}
            >
              {item.name}
            </motion.a>
          ))}
          <div className="flex flex-col space-y-4 w-full pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-center">
              <ThemeToggle />
            </div>
            <AnimatedButton
              onClick={() => router.push('/auth/signup')}
              variant="gradient"
              size="md"
              className="w-full"
            >
              <IconRocket className="h-5 w-5 xs:h-6 xs:w-6 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-7 lg:w-7" />
              <span>Get Free Pilot</span>
            </AnimatedButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}

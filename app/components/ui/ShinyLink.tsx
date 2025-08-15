import { ShinyText } from "../react-bits";

interface ShinyLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  speed?: number;
}

export function ShinyLink({ 
  href, 
  children, 
  className = "", 
  external = true,
  speed = 3
}: ShinyLinkProps) {
  const linkProps = external 
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a 
      href={href}
      className={`inline-block group cursor-pointer ${className}`}
      {...linkProps}
    >
      <ShinyText 
        text={typeof children === 'string' ? children : href}
        speed={speed}
        className="text-gray-600"
      />
    </a>
  );
}
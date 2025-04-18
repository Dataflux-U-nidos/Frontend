import logo from '@/assets/logo.png';

interface LogoIconProps {
  className?: string; // Add this line
}

export const LogoIcon = ({ className }: LogoIconProps) => {
  return (
    <img src={logo} alt="Logo" className={className} />
  );
};
import { LogoIcon } from "../atoms/icons";

interface RetrievePasswordTemplateProps {
    children: React.ReactNode;
  }
  
  export const RetrievePasswordTemplate = ({ children }: RetrievePasswordTemplateProps) => {
    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <LogoIcon className="w-30 h-11 mb-4" />
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
          {children}
        </div>
      </div>
      
    );
  };
  
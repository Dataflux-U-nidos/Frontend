import * as React from "react";

interface CircleImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallback?: string;
}

export function CircleImage({ src, alt, fallback = "P", className, ...props }: Readonly<CircleImageProps>) {
    return (
        <div className={`relative h-50 w-50 overflow-hidden rounded-full bg-gray-300 flex items-center justify-center ${className}`}>
            {src ? (
                <img src={src} alt={alt} className="h-full w-full object-cover rounded-full" {...props} />
            ) : (
                <span className="text-xl font-bold text-white">{fallback}</span>
            )}
        </div>
    );
}

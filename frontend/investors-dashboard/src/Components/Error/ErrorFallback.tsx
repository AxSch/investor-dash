import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { FallbackProps } from "react-error-boundary";

const ErrorFallback: React.FC<{}> = ({ error, resetErrorBoundary }: FallbackProps) => {
    const location = useLocation();
    const errorLocation = useRef(location.pathname);
    useEffect(() => {
        if (location.pathname !== errorLocation.current) {
            resetErrorBoundary();
        }
    }, [location.pathname]);
    console.log('errors', error, location, errorLocation, resetErrorBoundary);

    return (
        <div className="container mx-auto mt-20">
            <div className="flex items-center flex-col">
                <p className="text-xl mb-3">I have failed you Anakin... I have failed you.</p>
                <pre className="text-red-500">{error.message}</pre>
                <button className="mt-4 font-bold text-gray-700 p-2 text-sm rounded-md drop-shadow-sm bg-gray-200" onClick={resetErrorBoundary}>Try again</button>
            </div>
        </div>
    )
}
export default ErrorFallback;

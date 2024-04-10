import React from "react";

const RouteErrorFallback: React.FC<{}> = ()  => {
    return (
        <div className="container mx-auto mt-20">
            <div className="flex items-center flex-col">
                <p className="text-xl mb-3">Only a Sith deals in absolutes</p>
            </div>
        </div>
    )
}
export default RouteErrorFallback;

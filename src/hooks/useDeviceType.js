import { useEffect, useState } from "react";

export default function useDeviceType() {
    const [device, setDevice] = useState(getDeviceType(window.innerWidth));

    useEffect(() => {
        const handleResize = () => {
            setDevice(getDeviceType(window.innerWidth));
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return device;
}

function getDeviceType(width) {
    if (width <= 480) return "mobile";
    if (width <= 1024) return "tablet";
    return "desktop";
}

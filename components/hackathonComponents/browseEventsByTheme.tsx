import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Brain, Bitcoin, Gamepad2, Wifi, Shield, Globe } from "lucide-react";

const BrowseEventsByTheme = () => {
    const themes = [
        { name: "AI", icon: <Brain className="w-14 h-14 text-pink-400" />, events: "1K Events" },
        { name: "Crypto", icon: <Bitcoin className="w-14 h-14 text-yellow-400" />, events: "800 Events" },
        { name: "AR VR", icon: <Gamepad2 className="w-14 h-14 text-purple-400" />, events: "500 Events" },
        { name: "IoT", icon: <Wifi className="w-14 h-14 text-green-400" />, events: "300 Events" },
        { name: "Cybersecurity", icon: <Shield className="w-14 h-14 text-red-400" />, events: "700 Events" },
        { name: "Open Theme", icon: <Globe className="w-14 h-14 text-gray-400" />, events: "1.2K Events" }
    ];

    return (
        <div>
            <h1 className="text-3xl text-secondary font-bold mb-6">Browse by Themes</h1>
            <div className="grid grid-cols-3 gap-4">
                {themes.map((theme, index) => (
                    <Card key={index} className="bg-neutral-900 w-[270px] h-[110px] hover:border-neutral-700 border border-neutral-800 flex items-start p-4">
                        {theme.icon}
                        <div className="ml-4">
                            <CardTitle className="text-xl text-secondary font-semibold">{theme.name}</CardTitle>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default BrowseEventsByTheme;

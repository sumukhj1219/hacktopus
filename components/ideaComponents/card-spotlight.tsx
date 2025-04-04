import { CardSpotlight } from "@/components/ui/card-spotlight";

export function CardSpotlightDemo({children}:{children:React.ReactNode}) {
  return (
    <CardSpotlight className="border border-neutral-700 rounded-2xl">
      {children}
    </CardSpotlight>
  );
}





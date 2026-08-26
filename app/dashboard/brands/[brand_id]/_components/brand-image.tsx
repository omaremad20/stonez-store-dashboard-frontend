import { ImageOff } from "lucide-react";

interface BrandImageProps {
    imageUrl: string | null;
    brandName: string;
}

export function BrandImage({ imageUrl, brandName }: BrandImageProps) {
    return (
        <div className="aspect-4/3 w-full overflow-hidden rounded-lg border bg-muted">
            {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={imageUrl}
                    alt={`${brandName} logo`}
                    className="size-full object-cover"
                />
            ) : (
                <div className="flex size-full flex-col items-center justify-center gap-2 text-muted-foreground">
                    <ImageOff className="size-8" aria-hidden />
                    <span className="text-sm">No image available</span>
                </div>
            )}
        </div>
    );
}
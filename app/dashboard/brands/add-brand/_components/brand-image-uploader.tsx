"use client";

import {
    ACCEPTED_IMAGE_EXTENSIONS_LABEL,
    ACCEPTED_IMAGE_TYPES,
    MAX_ORIGINAL_FILE_SIZE_LABEL,
    formatFileSize,
    processBrandImage,
    validateBrandImageFile,
} from "@/app/dashboard/brands/add-brand/_lib/image/process-brand-image";
import type { ProcessedBrandImage } from "@/app/dashboard/brands/add-brand/_lib/validations/brand";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ImageUp, Loader2, RefreshCw, X } from "lucide-react";
import { useCallback, useId, useRef, useState } from "react";
import { toast } from "sonner";

interface BrandImageUploaderProps {
    value: ProcessedBrandImage | null | undefined;
    onChange: (image: ProcessedBrandImage | null) => void;
    onProcessingChange?: (isProcessing: boolean) => void;
    disabled?: boolean;
    error?: string;
}

export function BrandImageUploader({
    value,
    onChange,
    onProcessingChange,
    disabled,
    error,
}: BrandImageUploaderProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessingState] = useState(false);
    const describedById = useId();

    const setIsProcessing = useCallback(
        (processing: boolean) => {
            setIsProcessingState(processing);
            onProcessingChange?.(processing);
        },
        [onProcessingChange]
    );

    const openFileDialog = useCallback(() => {
        if (disabled || isProcessing) return;
        inputRef.current?.click();
    }, [disabled, isProcessing]);

    const handleFile = useCallback(
        async (file: File) => {
            const validationError = validateBrandImageFile(file);

            if (validationError === "unsupported-type") {
                toast.error(`Please upload a ${ACCEPTED_IMAGE_EXTENSIONS_LABEL} image.`);
                return;
            }

            if (validationError === "too-large") {
                toast.error(`Image size must be less than ${MAX_ORIGINAL_FILE_SIZE_LABEL}.`);
                return;
            }

            setIsProcessing(true);
            try {
                const processed = await processBrandImage(file);
                // Replacing an image: release the previous preview's object URL.
                if (value?.previewUrl) URL.revokeObjectURL(value.previewUrl);
                onChange(processed);
            } catch {
                toast.error("We couldn't process this image. Please try another image.");
            } finally {
                setIsProcessing(false);
            }
        },
        [onChange, value?.previewUrl]
    );

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        event.target.value = ""; // allow re-selecting the same file
        if (file) void handleFile(file);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        if (disabled || isProcessing) return;
        const file = event.dataTransfer.files?.[0];
        if (file) void handleFile(file);
    };

    const handleRemove = () => {
        if (value?.previewUrl) URL.revokeObjectURL(value.previewUrl);
        onChange(null);
    };

    return (
        <div className="space-y-2">
            <input
                ref={inputRef}
                type="file"
                accept={ACCEPTED_IMAGE_TYPES.join(",")}
                onChange={handleInputChange}
                className="sr-only"
                aria-label="Upload brand image"
                disabled={disabled || isProcessing}
            />

            {!value ? (
                <div
                    role="button"
                    tabIndex={disabled ? -1 : 0}
                    aria-disabled={disabled || isProcessing}
                    aria-describedby={describedById}
                    onClick={openFileDialog}
                    onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            openFileDialog();
                        }
                    }}
                    onDragOver={(event) => {
                        event.preventDefault();
                        if (!disabled && !isProcessing) setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    className={cn(
                        "flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed px-6 py-10 text-center transition-colors",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        isDragging ? "border-primary bg-accent" : "border-border hover:bg-accent/50",
                        (disabled || isProcessing) && "pointer-events-none opacity-60"
                    )}
                >
                    {isProcessing ? (
                        <>
                            <Loader2 className="size-6 animate-spin text-muted-foreground" aria-hidden />
                            <p className="text-sm font-medium">Processing image...</p>
                        </>
                    ) : (
                        <>
                            <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                                <ImageUp className="size-5 text-muted-foreground" aria-hidden />
                            </div>
                            <p className="text-sm font-medium">
                                Drag & drop an image, or{" "}
                                <span className="text-primary underline underline-offset-4">browse</span>
                            </p>
                            <p id={describedById} className="text-xs text-muted-foreground">
                                {ACCEPTED_IMAGE_EXTENSIONS_LABEL} · up to {MAX_ORIGINAL_FILE_SIZE_LABEL}
                            </p>
                        </>
                    )}
                </div>
            ) : (
                <div className="flex items-center gap-4 rounded-lg border p-3">
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-md border bg-muted">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={value.previewUrl}
                            alt="Brand image preview"
                            className="size-full object-cover"
                        />
                    </div>
                    <div className="min-w-0 flex-1 space-y-0.5">
                        <p className="truncate text-sm font-medium">{value.originalName}</p>
                        <p className="text-xs text-muted-foreground">
                            WebP · {formatFileSize(value.sizeBytes)}
                        </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={openFileDialog}
                            disabled={disabled || isProcessing}
                            aria-label="Replace image"
                        >
                            {isProcessing ? (
                                <Loader2 className="size-4 animate-spin" aria-hidden />
                            ) : (
                                <RefreshCw className="size-4" aria-hidden />
                            )}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={handleRemove}
                            disabled={disabled || isProcessing}
                            aria-label="Remove image"
                        >
                            <X className="size-4" aria-hidden />
                        </Button>
                    </div>
                </div>
            )}

            {error ? (
                <p role="alert" className="text-sm font-medium text-destructive">
                    {error}
                </p>
            ) : null}
        </div>
    );
}
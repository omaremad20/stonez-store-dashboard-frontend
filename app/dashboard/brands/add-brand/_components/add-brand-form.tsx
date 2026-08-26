"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { BrandImageUploader } from "@/app/dashboard/brands/add-brand/_components/brand-image-uploader";
import { getFriendlyErrorMessage } from "@/app/dashboard/brands/add-brand/_lib/utils/error-messages";
import {
    addBrandFormDefaultValues,
    addBrandFormSchema,
    DESCRIPTION_MAX_LENGTH,
    type AddBrandFormInput,
    type AddBrandFormOutput,
} from "@/app/dashboard/brands/add-brand/_lib/validations/brand";
import type { CreateBrandPayload } from "@/app/dashboard/brands/_types/brand";

/**
 * Mock submit handler. Swap this out for the real Server Action / React
 * Query mutation later — the rest of the form does not need to change.
 */
async function mockCreateBrand(payload: CreateBrandPayload): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    void payload; // not sent anywhere yet
}

export function AddBrandForm() {
    const [formError, setFormError] = useState<string | null>(null);
    const [isImageProcessing, setIsImageProcessing] = useState(false);

    const form = useForm<AddBrandFormInput, unknown, AddBrandFormOutput>({
        resolver: zodResolver(addBrandFormSchema),
        defaultValues: addBrandFormDefaultValues,
        mode: "onBlur",
    });

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = form;

    const descriptionValue = watch("description") ?? "";
    const imageValue = watch("image");

    const onSubmit = async (values: AddBrandFormOutput) => {
        setFormError(null);

        const payload: CreateBrandPayload = {
            name: values.name,
            description: values.description ?? null,
            image: values.image.file,
            is_active: values.is_active,
        };

        try {
            await mockCreateBrand(payload);

            toast.success("Brand created successfully.");

            if (values.image.previewUrl) URL.revokeObjectURL(values.image.previewUrl);
            reset(addBrandFormDefaultValues);
        } catch (error) {
            setFormError(getFriendlyErrorMessage(error));
        }
    };

    const isBusy = isSubmitting || isImageProcessing;

    return (
        <Card>
            <CardContent className="pt-6">
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
                    {formError ? (
                        <Alert variant="destructive">
                            <AlertTriangle className="size-4" aria-hidden />
                            <AlertTitle>Couldn&apos;t create brand</AlertTitle>
                            <AlertDescription>{formError}</AlertDescription>
                        </Alert>
                    ) : null}

                    <div className="grid gap-8 md:grid-cols-2">
                        {/* Brand information */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    placeholder="e.g. Nike"
                                    autoComplete="off"
                                    aria-invalid={Boolean(errors.name)}
                                    aria-describedby={errors.name ? "name-error" : undefined}
                                    disabled={isBusy}
                                    {...register("name")}
                                />
                                {errors.name ? (
                                    <p id="name-error" role="alert" className="text-sm font-medium text-destructive">
                                        {errors.name.message}
                                    </p>
                                ) : null}
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="description">Description</Label>
                                    <span className="text-xs text-muted-foreground">
                                        {descriptionValue.length} / {DESCRIPTION_MAX_LENGTH}
                                    </span>
                                </div>
                                <Textarea
                                    id="description"
                                    placeholder="A short description shown on the storefront."
                                    rows={5}
                                    maxLength={DESCRIPTION_MAX_LENGTH + 20}
                                    aria-invalid={Boolean(errors.description)}
                                    aria-describedby={errors.description ? "description-error" : undefined}
                                    disabled={isBusy}
                                    {...register("description")}
                                />
                                {errors.description ? (
                                    <p
                                        id="description-error"
                                        role="alert"
                                        className="text-sm font-medium text-destructive"
                                    >
                                        {errors.description.message}
                                    </p>
                                ) : null}
                            </div>

                            <div className="flex items-start justify-between gap-4 rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <Label htmlFor="is_active">Active</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Inactive brands won&apos;t be visible on the storefront.
                                    </p>
                                </div>
                                <Switch
                                    id="is_active"
                                    checked={watch("is_active")}
                                    onCheckedChange={(checked) => setValue("is_active", checked)}
                                    disabled={isBusy}
                                />
                            </div>
                        </div>

                        {/* Brand image */}
                        <div className="space-y-2">
                            <Label htmlFor="brand-image">Brand image</Label>
                            <BrandImageUploader
                                value={imageValue}
                                onChange={(image) =>
                                    setValue("image", image ?? undefined, {
                                        shouldValidate: true,
                                        shouldDirty: true,
                                    })
                                }
                                onProcessingChange={setIsImageProcessing}
                                disabled={isBusy}
                                error={errors.image?.message as string | undefined}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end border-t pt-6">
                        <Button type="submit" disabled={isBusy}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="size-4 animate-spin" aria-hidden />
                                    Creating brand...
                                </>
                            ) : (
                                "Add Brand"
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
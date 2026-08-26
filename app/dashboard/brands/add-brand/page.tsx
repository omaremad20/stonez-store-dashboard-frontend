import { AddBrandForm } from "@/app/dashboard/brands/add-brand/_components/add-brand-form";

export const metadata = {
    title: "Add Brand",
};

export default function AddBrand() {
    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-semibold tracking-tight">Add brand</h1>
                <p className="text-sm text-muted-foreground">
                    Create a new brand. Display order is managed from the brands list.
                </p>
            </div>

            <AddBrandForm />
        </div>
    );
}
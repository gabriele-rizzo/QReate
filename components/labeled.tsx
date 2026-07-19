import type { Orientation } from "@base-ui/react";
import { Field, FieldDescription, FieldLabel } from "./ui/field";
import { Label } from "./ui/label";

interface LabeledProps extends React.PropsWithChildren {
    label: string;
    secondary?: string;
    htmlFor?: string;
    description?: string;
    className?: string;
    orientation?: Orientation;
}

export function Labeled({ htmlFor, label, secondary, description, className, children }: LabeledProps) {
    return (
        <Field className={className}>
            <div className="flex flex-row gap-2 w-fit!">
                <FieldLabel htmlFor={htmlFor}>{label}</FieldLabel>
                {secondary && <Label className="text-muted-foreground">{secondary}</Label>}
            </div>

            <div className={className}>{children}</div>

            {description && <FieldDescription>{description}</FieldDescription>}
        </Field>
    );
}

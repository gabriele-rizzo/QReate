"use client";

import { Labeled } from "@/components/labeled";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useCodeConfigStore } from "@/stores/code-config/provider";
import { useCallback } from "react";

type FieldDef = {
    key: string;
    label: string;
    kind: "text" | "textarea" | "url" | "email" | "tel" | "datetime" | "select" | "switch";
    placeholder?: string;
    inputMode?: React.ComponentProps<"input">["inputMode"];
    options?: { value: string; label: string }[];
};

const CONTENT_FIELDS: { [K in CodeType]: FieldDef[] } = {
    text: [{ key: "text", label: "Text", kind: "textarea", placeholder: "Enter any text" }],
    url: [{ key: "url", label: "URL", kind: "url", placeholder: "example.com" }],
    email: [
        { key: "to", label: "Recipient", kind: "email", placeholder: "name@example.com" },
        { key: "subject", label: "Subject", kind: "text", placeholder: "Subject" },
        { key: "body", label: "Message", kind: "textarea", placeholder: "Message" },
    ],
    phone: [{ key: "phone", label: "Phone Number", kind: "tel", placeholder: "+1 555 000 0000" }],
    sms: [
        { key: "phone", label: "Phone Number", kind: "tel", placeholder: "+1 555 000 0000" },
        { key: "message", label: "Message", kind: "textarea", placeholder: "Message" },
    ],
    wifi: [
        { key: "ssid", label: "Network Name (SSID)", kind: "text", placeholder: "MyNetwork" },
        {
            key: "encryption",
            label: "Encryption",
            kind: "select",
            options: [
                { value: "WPA", label: "WPA/WPA2" },
                { value: "WEP", label: "WEP" },
                { value: "nopass", label: "None" },
            ],
        },
        { key: "password", label: "Password", kind: "text", placeholder: "Password" },
        { key: "hidden", label: "Hidden Network", kind: "switch" },
    ],
    contact: [
        { key: "firstName", label: "First Name", kind: "text", placeholder: "Jane" },
        { key: "lastName", label: "Last Name", kind: "text", placeholder: "Doe" },
        { key: "organization", label: "Organization", kind: "text", placeholder: "Company" },
        { key: "title", label: "Title", kind: "text", placeholder: "Job title" },
        { key: "phone", label: "Phone", kind: "tel", placeholder: "+1 555 000 0000" },
        { key: "email", label: "Email", kind: "email", placeholder: "name@example.com" },
        { key: "url", label: "Website", kind: "url", placeholder: "example.com" },
    ],
    calendar: [
        { key: "title", label: "Event Title", kind: "text", placeholder: "Meeting" },
        { key: "location", label: "Location", kind: "text", placeholder: "Location" },
        { key: "start", label: "Starts", kind: "datetime" },
        { key: "end", label: "Ends", kind: "datetime" },
        { key: "description", label: "Description", kind: "textarea", placeholder: "Details" },
    ],
    geolocation: [
        { key: "latitude", label: "Latitude", kind: "text", inputMode: "decimal", placeholder: "41.9028" },
        { key: "longitude", label: "Longitude", kind: "text", inputMode: "decimal", placeholder: "12.4964" },
    ],
    crypto: [
        {
            key: "coin",
            label: "Currency",
            kind: "select",
            options: [
                { value: "bitcoin", label: "Bitcoin" },
                { value: "ethereum", label: "Ethereum" },
                { value: "litecoin", label: "Litecoin" },
            ],
        },
        { key: "address", label: "Address", kind: "text", placeholder: "Wallet address" },
        { key: "amount", label: "Amount", kind: "text", inputMode: "decimal", placeholder: "0.00" },
    ],
    data: [{ key: "data", label: "Raw Bytes", kind: "textarea", placeholder: "Raw data" }],
};

const INPUT_TYPE: Partial<Record<FieldDef["kind"], React.ComponentProps<"input">["type"]>> = {
    url: "url",
    email: "email",
    tel: "tel",
    datetime: "datetime-local",
};

export function ValueFields() {
    const { set, ...store } = useCodeConfigStore((s) => s);

    const { type } = store.data;
    const content = store.data.content[type] as Record<string, string | boolean>;

    const update = useCallback(
        (key: string, value: string | boolean) => {
            set({
                ...store,
                data: {
                    ...store.data,
                    content: {
                        ...store.data.content,
                        [type]: { ...store.data.content[type], [key]: value },
                    },
                },
            });
        },
        [set, store, type],
    );

    return (
        <div className="flex flex-col gap-4">
            {CONTENT_FIELDS[type].map((field) => {
                if (field.kind === "switch") {
                    return (
                        <Field key={field.key} orientation="horizontal">
                            <FieldContent>
                                <div className="flex flex-row gap-2">
                                    <FieldLabel htmlFor={field.key}>{field.label}</FieldLabel>
                                    <Switch
                                        id={field.key}
                                        checked={Boolean(content[field.key])}
                                        onCheckedChange={(checked) => update(field.key, checked)}
                                    />
                                </div>
                            </FieldContent>
                        </Field>
                    );
                }

                return (
                    <Labeled key={field.key} label={field.label} htmlFor={field.key}>
                        {field.kind === "textarea" ? (
                            <Textarea
                                id={field.key}
                                placeholder={field.placeholder}
                                value={String(content[field.key] ?? "")}
                                onChange={(e) => update(field.key, e.target.value)}
                            />
                        ) : field.kind === "select" ? (
                            <NativeSelect
                                id={field.key}
                                className="w-full"
                                value={String(content[field.key] ?? "")}
                                onChange={(e) => update(field.key, e.target.value)}
                            >
                                {field.options?.map((option) => (
                                    <NativeSelectOption key={option.value} value={option.value}>
                                        {option.label}
                                    </NativeSelectOption>
                                ))}
                            </NativeSelect>
                        ) : (
                            <Input
                                id={field.key}
                                type={INPUT_TYPE[field.kind] ?? "text"}
                                inputMode={field.inputMode}
                                placeholder={field.placeholder}
                                value={String(content[field.key] ?? "")}
                                onChange={(e) => update(field.key, e.target.value)}
                            />
                        )}
                    </Labeled>
                );
            })}
        </div>
    );
}

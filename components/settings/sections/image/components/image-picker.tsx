"use client";

import { Button } from "@/components/ui/button";
import {
    FileUpload,
    FileUploadDropzone,
    FileUploadItem,
    FileUploadItemDelete,
    FileUploadItemMetadata,
    FileUploadItemPreview,
    FileUploadList,
    FileUploadTrigger,
} from "@/components/ui/file-upload";
import { useCodeConfigStore } from "@/stores/code-config/provider";
import { UploadIcon, XIcon } from "@phosphor-icons/react";
import { useCallback, useState } from "react";

export function ImagePicker() {
    const [invalid, setInvalid] = useState(false);
    const image = useCodeConfigStore((s) => s.image);
    const set = useCodeConfigStore((s) => s.set);

    const onUpload = useCallback(
        (files: File[]) => {
            if (!files[0]) {
                set({ image: undefined });
                return;
            }

            set((s) => ({
                image: { ...s.image, width: 25, height: 25, file: files[0], excavate: true, opacity: 1 },
            }));
        },
        [set],
    );

    return (
        <FileUpload
            maxFiles={2}
            maxSize={5 * 1024 * 1024}
            className="w-full"
            accept="image/*"
            value={image?.file ? [image.file] : []}
            onValueChange={onUpload}
            invalid={invalid}
            onFileAccept={() => setInvalid(false)}
            onFileReject={(_, message) => {
                setInvalid(true);
                alert(message);
            }}
        >
            {typeof image === "undefined" && (
                <FileUploadDropzone>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <div className="flex items-center justify-center rounded-full border p-2.5">
                            <UploadIcon className="size-6 text-muted-foreground" />
                        </div>

                        <p className="font-medium text-sm">Drag & drop your image here</p>
                        <p className="text-muted-foreground text-xs -mt-4">Or click to browse (up to 5MB)</p>
                    </div>

                    <FileUploadTrigger asChild>
                        <Button variant="outline" size="sm" className="mt-2 w-fit">
                            Browse files
                        </Button>
                    </FileUploadTrigger>
                </FileUploadDropzone>
            )}

            {image && (
                <FileUploadList>
                    <FileUploadItem value={image.file}>
                        <FileUploadItemPreview />
                        <FileUploadItemMetadata />

                        <FileUploadItemDelete asChild onClick={() => set({ image: undefined })}>
                            <Button variant="ghost" size="icon" className="size-7">
                                <XIcon />
                            </Button>
                        </FileUploadItemDelete>
                    </FileUploadItem>
                </FileUploadList>
            )}
        </FileUpload>
    );
}

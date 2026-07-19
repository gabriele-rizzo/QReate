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
    const { set, ...store } = useCodeConfigStore((s) => s);

    const onUpload = useCallback(
        (files: File[]) => {
            if (!files[0]) {
                set({ ...store, image: undefined });
                return;
            }

            const size = { width: 25, height: 25 };
            const settings = { file: files[0], excavate: true, opacity: 1 };

            set({ ...store, image: { ...store.image, ...size, ...settings } });
        },
        [store, set],
    );

    return (
        <FileUpload
            maxFiles={2}
            maxSize={5 * 1024 * 1024}
            className="w-full"
            accept="image/*"
            value={store.image?.file ? [store.image.file] : []}
            onValueChange={onUpload}
            invalid={invalid}
            onFileAccept={() => setInvalid(false)}
            onFileReject={(_, message) => {
                setInvalid(true);
                alert(message);
            }}
        >
            {typeof store.image === "undefined" && (
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

            {store.image && (
                <FileUploadList>
                    <FileUploadItem value={store.image?.file}>
                        <FileUploadItemPreview />
                        <FileUploadItemMetadata />

                        <FileUploadItemDelete asChild onClick={() => set({ ...store, image: undefined })}>
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

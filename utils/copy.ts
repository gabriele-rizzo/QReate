async function png(url: string): Promise<Blob> {
    const image = new Image();

    await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
        image.src = url;
    });

    const canvas = document.createElement("canvas");

    canvas.width = image.width;
    canvas.height = image.height;
    canvas.getContext("2d")!.drawImage(image, 0, 0);

    return await new Promise((resolve, reject) =>
        canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Failed to create PNG from URL"))), "image/png"),
    );
}

export async function copy(svg: SVGSVGElement) {
    const serializer = new XMLSerializer();
    const text = serializer.serializeToString(svg);
    const blob = new Blob([text], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    try {
        await navigator.clipboard.write([new ClipboardItem({ "image/png": await png(url) })]);
    } finally {
        URL.revokeObjectURL(url);
    }
}

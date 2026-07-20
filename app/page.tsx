import { CopyButton } from "@/components/actions/copy-button";
import { DownloadButton } from "@/components/actions/download-button";
import { ResetButton } from "@/components/actions/reset-button";
import { ShareButton } from "@/components/actions/share-button";
import { CodeWrapper } from "@/components/layout/code-wrapper";
import { Footer } from "@/components/layout/footer";
import { Nav } from "@/components/layout/nav";
import { Settings } from "@/components/settings";
import { ButtonGroup } from "@/components/ui/button-group";
import { Separator } from "@/components/ui/separator";
import packageJson from "@/package.json";

export default function RootPage() {
    return (
        <div className="flex w-full flex-col h-dvh overflow-hidden">
            <Nav
                actions={
                    <>
                        <ShareButton />

                        <ButtonGroup>
                            <CopyButton />
                            <DownloadButton />
                        </ButtonGroup>
                    </>
                }
            />

            <Separator orientation="horizontal" />

            <div className="flex flex-col sm:h-full sm:flex-row sm:*:odd:flex-1 overflow-scroll sm:overflow-hidden">
                <CodeWrapper />

                <div>
                    <Separator orientation="vertical" className="h-full not-sm:hidden" />
                    <Separator orientation="horizontal" className="w-full sm:hidden" />
                </div>

                <div className="relative sm:flex-1 sm:overflow-hidden">
                    <div className="sm:h-full sm:overflow-scroll pb-20">
                        <Settings />
                    </div>

                    <ResetButton />
                </div>
            </div>

            <Separator orientation="horizontal" />
            <Footer
                author={{ name: "Gabriele Rizzo", href: "https://x.com/gabrielerizzoo" }}
                payment="https://buymeacoffee.com/gabrielerizzo"
                version={packageJson.version}
            />
        </div>
    );
}

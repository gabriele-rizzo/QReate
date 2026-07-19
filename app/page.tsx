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
        <div className="h-dvh w-full flex-col flex overflow-hidden">
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

            <div className="h-full flex flex-col md:flex-row *:odd:flex-1 overflow-hidden">
                <CodeWrapper />

                <div>
                    <Separator orientation="vertical" className="h-full not-md:hidden" />
                    <Separator orientation="horizontal" className="w-full md:hidden" />
                </div>

                <div className="relative flex-1 overflow-hidden">
                    <div className="h-full overflow-scroll">
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

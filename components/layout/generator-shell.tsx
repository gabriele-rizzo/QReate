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
import { CodeProvider } from "@/hooks/use-code";
import { CodeConfigStoreProvider } from "@/stores/code-config/provider";
import packageJson from "@/package.json";

interface GeneratorShellProps extends React.PropsWithChildren {
    /** Preselects the tool's code type (used by the per-type landing pages). */
    initialType?: CodeType;
}

/**
 * Shared page frame: the generator fills the first viewport (on sm+), and any
 * landing content passed as children flows below it, followed by the footer.
 * On mobile everything stacks and the document scrolls naturally — better for
 * crawlers and for reading the content sections.
 */
export function GeneratorShell({ initialType, children }: GeneratorShellProps) {
    return (
        <CodeConfigStoreProvider initialType={initialType}>
            <CodeProvider>
                <div className="flex w-full flex-col">
                    <main>
                        <section aria-label="QR code generator" className="flex flex-col sm:h-dvh sm:overflow-hidden">
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

                            <div className="flex flex-col sm:flex-1 sm:min-h-0 sm:flex-row sm:*:odd:flex-1 sm:overflow-hidden">
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
                        </section>

                        {children}
                    </main>

                    <Separator orientation="horizontal" />
                    <Footer
                        author={{ name: "Gabriele Rizzo", href: "https://x.com/gabrielerizzoo" }}
                        payment="https://buymeacoffee.com/gabrielerizzo"
                        version={packageJson.version}
                    />
                </div>
            </CodeProvider>
        </CodeConfigStoreProvider>
    );
}

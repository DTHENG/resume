import DefaultLayout from "@/layouts/default";

export default function DocsPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className="font-semibold text-xl mb-4">Page Not Found</h1>
          <div className="flex flex-row justify-between">
            <a className="link font-semibold" href="/">
              Home
            </a>
            <a className="link font-semibold" href="/resume">
              Resume
            </a>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}

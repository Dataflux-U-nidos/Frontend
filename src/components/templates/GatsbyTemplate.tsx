import React from "react";

interface Props<T> {
    data: T[];
    SearchBarComponent: React.ComponentType<any>;
    searchBarProps?: any;
    cardRenderer: (item: T) => React.ReactNode;

    pageTitle: string;
    pageDescription: string;
}

export function GatsbyTemplate<T>({
    data,
    SearchBarComponent,
    searchBarProps = {},
    cardRenderer,
    pageTitle,
    pageDescription,
}: Props<T>) {
    return (
        <main className="flex flex-col gap-6 p-4 md:p-6" /* anima el wrapper */>
            <header className="space-y-1">
                <h1 className="text-2xl font-bold">{pageTitle}</h1>
                <p className="text-gray-600">{pageDescription}</p>
            </header>

            <SearchBarComponent {...searchBarProps} />

            <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data.map(cardRenderer)}
            </section>
        </main>
    );
}

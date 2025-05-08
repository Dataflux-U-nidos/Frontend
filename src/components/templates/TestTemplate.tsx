import { LikertSurvey } from "@/components/organisms/LikertSurvey";
import { ErrorBoundary } from "../ErrorBoundary";

interface TestTemplateProps {
    data: any;
    pageTitle?: string;
}

export const TestTemplate = ({ data, pageTitle }: TestTemplateProps) => (
    <main className="container mx-auto py-12 p-10">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#FF8811]">
            {pageTitle}
        </h1>
        <ErrorBoundary>
            <LikertSurvey data={data} />
        </ErrorBoundary>

    </main>
);

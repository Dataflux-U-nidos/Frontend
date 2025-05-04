import { LikertSurvey } from "@/components/organisms/LikertSurvey";
import { ErrorBoundary } from "../ErrorBoundary";

interface TestTemplateProps {
    data: any;
}

export const TestTemplate = ({ data }: TestTemplateProps) => (
    <main className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#FF8811]">
            Test Psicométrico
        </h1>
        <ErrorBoundary>
            <LikertSurvey data={data} />
        </ErrorBoundary>

    </main>
);

import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import { formatDate } from "@/utils/formatDate";

interface ProjectPage {
  uid?: string;
  data: {
    title: string;
    body: Array<{ type: string; text: string }>;
  };
  last_publication_date?: string;
}

export default function ContentBody({ page }: { page: ProjectPage }) {
  const formattedDate = page.last_publication_date
    ? formatDate(page.last_publication_date)
    : "";
  return (
    <Bounded as="article">
      <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 px-4 py-10 md:px-8 md:py-20">
        <Heading as="h1">{page.data.title}</Heading>
        {formattedDate && (
          <p className="mt-8 border-b border-slate-600 text-xl font-medium text-slate-300">
            {formattedDate}
          </p>
        )}
        <div className="prose prose-lg prose-invert mt-12 w-full max-w-none md:mt-20">
          {page.data.body.map((paragraph, index) => (
            <p key={index}>{paragraph.text}</p>
          ))}
        </div>
      </div>
    </Bounded>
  );
}

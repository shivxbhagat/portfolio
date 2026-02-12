import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { createClient } from "@/data/client";
import ContentList from "./ContentList";

interface ContentIndexSlice {
  slice_type: string;
  primary: {
    heading: string;
    content_type: string;
    description?: Array<{ type: string; text: string }>;
  };
}

/**
 * Component for "ContentIndex" Slices.
 */
const ContentIndex = async ({
  slice,
}: {
  slice: ContentIndexSlice;
}): Promise<JSX.Element> => {
  const client = createClient();
  const projects = client.getAllByType("project");

  const items = projects;

  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation="default">
      <Heading size="xl" className="mb-8">
        {slice.primary.heading}
      </Heading>
      {slice.primary.description && (
        <div className="prose prose-xl prose-invert mb-10">
          {slice.primary.description.map((para, index) => (
            <p key={index}>{para.text}</p>
          ))}
        </div>
      )}
      <ContentList
        items={items}
        contentType="Projects"
        viewMoreText="View Project"
      />
    </Bounded>
  );
};

export default ContentIndex;

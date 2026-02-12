import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";

interface TextBlockSlice {
  slice_type: string;
  primary: {
    heading?: string;
    body: Array<{ type: string; text: string }>;
  };
}

/**
 * Component for "TextBlock" Slices.
 */
const TextBlock = ({ slice }: { slice: TextBlockSlice }): JSX.Element => {
  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation="default">
      {slice.primary.heading && (
        <Heading as="h2" size="lg" className="mb-8">
          {slice.primary.heading}
        </Heading>
      )}
      <div className="prose prose-lg prose-invert max-w-prose">
        {slice.primary.body.map((para, index) => (
          <p key={index}>{para.text}</p>
        ))}
      </div>
    </Bounded>
  );
};

export default TextBlock;

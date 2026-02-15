import Avatar from "@/components/Avatar";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";

interface BiographySlice {
	slice_type: string;
	primary: {
		heading: string;
		body: Array<{ type: string; text: string }>;
		button_text: string;
		button_link: string;
		avatar: string;
	};
}

/**
 * Component for "Biography" Slices.
 */
const Biography = ({ slice }: { slice: BiographySlice }): JSX.Element => {
	return (
		<Bounded
			data-slice-type={slice.slice_type}
			data-slice-variation="default"
		>
			<div className="grid gap-x-8 gap-y-6 md:grid-cols-[2fr,1fr]">
				<Heading size="xl" className="col-start-1 md:row-start-1">
					{slice.primary.heading}
				</Heading>

				<Avatar
					image={slice.primary.avatar}
					className="max-w-xs md:col-start-2 md:row-start-1 md:row-end-4"
				/>

				<div className="prose prose-xl prose-slate prose-invert col-start-1 md:row-start-2">
					{slice.primary.body.map((para, index) => (
						<p key={index}>{para.text}</p>
					))}
				</div>
				<Button
					linkField={slice.primary.button_link}
					label={slice.primary.button_text}
					target="_blank"
					className="col-start-1 md:row-start-3"
				/>
			</div>
		</Bounded>
	);
};

export default Biography;

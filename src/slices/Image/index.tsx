import Bounded from "@/components/Bounded";
import Image from "next/image";

interface ImageSlice {
	slice_type: string;
	primary: {
		image: {
			url: string;
			alt: string;
			width?: number;
			height?: number;
		};
	};
}

/**
 * Props for `Image`.
 */
export type ImageProps = { slice: ImageSlice };

/**
 * Component for "Image" Slices.
 */
const ImageSlice = ({ slice }: ImageProps): JSX.Element => {
	return (
		<Bounded>
			<Image
				src={slice.primary.image.url}
				alt={slice.primary.image.alt || ""}
				width={slice.primary.image.width || 1200}
				height={slice.primary.image.height || 800}
				className="not-prose my-10 h-full w-full rounded-md md:my-14 lg:my-16"
			/>
		</Bounded>
	);
};

export default ImageSlice;

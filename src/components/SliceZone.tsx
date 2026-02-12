import React from "react";

interface SliceZoneProps {
	slices: any[];
	components: Record<string, React.ComponentType<any>>;
}

export function SliceZone({ slices, components }: SliceZoneProps) {
	return (
		<>
			{slices.map((slice, index) => {
				const Component = components[slice.slice_type];
				if (!Component) {
					console.warn(
						`No component found for slice type: ${slice.slice_type}`,
					);
					return null;
				}
				return <Component key={slice.id || index} slice={slice} />;
			})}
		</>
	);
}

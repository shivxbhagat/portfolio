import React from "react";
import clsx from "clsx";

type BoundedProps = {
	as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
	className?: string;
	children: React.ReactNode;
	[key: string]: any;
};

const Bounded: React.FC<BoundedProps> = ({
	as,
	className,
	children,
	...restProps
}) => {
	const Comp = as || "section";
	return (
		<Comp
			className={clsx("px-4 py-10 md:px-6 md:py-14 lg:py-16", className)}
			{...restProps}
		>
			<div className="mx-auto w-full max-w-7xl">{children}</div>
		</Comp>
	);
};

export default Bounded;

import React from "react";
import clsx from "clsx";

type BoundedProps = {
	as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
	className?: string;
	children: React.ReactNode;
	[key: string]: any;
};

const Bounded = React.forwardRef<HTMLElement, BoundedProps>(
	({ as, className, children, ...restProps }, ref) => {
		const Comp: any = as || "section";
		return (
			<Comp
				ref={ref}
				className={clsx("px-4 py-10 md:px-6 md:py-14 lg:py-16", className)}
				{...restProps}
			>
				<div className="mx-auto w-full max-w-7xl">{children}</div>
			</Comp>
		);
	},
);

Bounded.displayName = "Bounded";

export default Bounded;

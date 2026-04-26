import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import MathView from "./MathView";

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		math: {
			insertMath: () => ReturnType;
		};
	}
}

export const Math = Node.create({
	name: "math",
	group: "inline",
	inline: true,
	atom: true,

	addAttributes() {
		return {
			latex: { default: "" },
		};
	},

	parseHTML() {
		return [{ tag: "span[data-math]" }];
	},

	renderHTML({ HTMLAttributes }) {
		return ["span", mergeAttributes(HTMLAttributes, { "data-math": "" })];
	},

	addCommands() {
		return {
			insertMath:
				() =>
				({ commands }) => {
					return commands.insertContent({ type: "math", attrs: { latex: "" } });
				},
		};
	},

	addNodeView() {
		return ReactNodeViewRenderer(MathView);
	},
});

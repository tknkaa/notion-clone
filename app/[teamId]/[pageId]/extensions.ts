import { Node, mergeAttributes, InputRule } from "@tiptap/core";
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

	addInputRules() {
		return [
			new InputRule({
				find: /\$([^$]+)\$$/,
				handler: ({ state, range, match }) => {
					const { tr } = state;
					const latex = match[1];
					tr.replaceWith(
						range.from,
						range.to,
						state.schema.nodes.math.create({ latex }),
					);
				},
			}),
		];
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

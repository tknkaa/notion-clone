"use client";
import { useState, useRef, useEffect } from "react";
import { NodeViewWrapper } from "@tiptap/react";
import type { NodeViewProps } from "@tiptap/react";
import { typst2tex } from "tex2typst";
import katex from "katex";

export default function MathView({ node, updateAttributes }: NodeViewProps) {
	const [editing, setEditing] = useState(!node.attrs.latex);
	const [draft, setDraft] = useState<string>(node.attrs.latex);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (editing) textareaRef.current?.focus();
	}, [editing]);

	const commit = () => {
		updateAttributes({ latex: draft });
		setEditing(false);
	};

	if (editing) {
		return (
			<NodeViewWrapper as="span">
				<textarea
					ref={textareaRef}
					value={draft}
					onChange={(e) => setDraft(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							commit();
						}
						if (e.key === "Escape") commit();
					}}
					onBlur={commit}
				/>
			</NodeViewWrapper>
		);
	}

	const html = katex.renderToString(typst2tex(node.attrs.latex || "square"), {
		throwOnError: false,
	});

	return (
		<NodeViewWrapper
			as="span"
			onMouseDown={(e: React.MouseEvent) => e.preventDefault()}
			onClick={() => setEditing(true)}
		>
			<span dangerouslySetInnerHTML={{ __html: html }} />
		</NodeViewWrapper>
	);
}

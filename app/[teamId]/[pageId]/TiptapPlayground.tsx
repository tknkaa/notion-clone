"use client";

import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";
import { Math } from "./extensions";

export function TiptapPlayground() {
	const editor = useEditor({
		extensions: [StarterKit, Math],
		content:
			"<h2>WYSIWYG Editor</h2><p>Type here and use the toolbar to format text.</p>",
		immediatelyRender: false,
	});

	if (!editor) {
		return null;
	}

	return (
		<div className="tiptap-editor w-full max-w-3xl overflow-hidden rounded-md border">
			<div className="flex flex-wrap gap-2 border-b p-2">
				<button
					className={`rounded-sm border px-2 py-1 text-sm ${
						editor.isActive("bold") ? "bg-black text-white" : ""
					}`}
					onClick={() => editor.chain().focus().toggleBold().run()}
					type="button"
				>
					Bold
				</button>
				<button
					className={`rounded-sm border px-2 py-1 text-sm ${
						editor.isActive("italic") ? "bg-black text-white" : ""
					}`}
					onClick={() => editor.chain().focus().toggleItalic().run()}
					type="button"
				>
					Italic
				</button>
				<button
					className={`rounded-sm border px-2 py-1 text-sm ${
						editor.isActive("heading", { level: 2 })
							? "bg-black text-white"
							: ""
					}`}
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 2 }).run()
					}
					type="button"
				>
					H2
				</button>
				<button
					className={`rounded-sm border px-2 py-1 text-sm ${
						editor.isActive("bulletList") ? "bg-black text-white" : ""
					}`}
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					type="button"
				>
					Bullet List
				</button>
				<button
					className={`rounded-sm border px-2 py-1 text-sm ${
						editor.isActive("bulletList") ? "bg-black text-white" : ""
					}`}
					onClick={() => editor.chain().focus().insertMath().run()}
					type="button"
				>
					Math
				</button>
			</div>
			<EditorContent editor={editor} />
		</div>
	);
}

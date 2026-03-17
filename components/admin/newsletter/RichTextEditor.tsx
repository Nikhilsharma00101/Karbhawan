"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';

import {
    Bold, Italic, Strikethrough, Underline as UnderlineIcon,
    Heading1, Heading2, Heading3,
    List, ListOrdered, Quote, Code,
    Image as ImageIcon, Link as LinkIcon, Unlink,
    Undo, Redo, PaintBucket, Type
} from 'lucide-react';
import { useCallback, useState } from 'react';

// Custom Toolbar Button Component
const ToolbarButton = ({ onClick, disabled = false, active = false, icon: Icon, title }: any) => (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        title={title}
        className={`p-1.5 rounded-lg flex items-center justify-center transition-colors ${active ? 'bg-indigo-100 text-indigo-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
        <Icon className="w-4 h-4" />
    </button>
);

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
    const [colorPickerOpen, setColorPickerOpen] = useState(false);
    const [highlightPickerOpen, setHighlightPickerOpen] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-indigo-600 underline',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'max-w-full rounded-lg border border-slate-200 mt-4 mb-4',
                },
            }),
            TextStyle,
            Color,
            Highlight.configure({ multicolor: true }),
        ],
        content: content,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base focus:outline-none min-h-[300px] max-w-none px-5 py-4',
            },
        },
    });

    const setLink = useCallback(() => {
        if (!editor) return;
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL:', previousUrl);
        // cancelled
        if (url === null) return;
        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
        // update link
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    const addImage = useCallback(() => {
        if (!editor) return;
        const url = window.prompt('Image URL:');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    if (!editor) {
        return <div className="min-h-[300px] flex items-center justify-center bg-slate-50 border border-slate-200 rounded-xl">Loading Editor...</div>;
    }

    const presetColors = ['#000000', '#EF4444', '#F97316', '#F59E0B', '#10B981', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899'];

    return (
        <div className="w-full flex-1 flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden focus-within:border-cta-blue focus-within:ring-4 focus-within:ring-blue-50 transition-all font-sans">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 p-2 border-b border-slate-200 bg-slate-50">
                <div className="flex items-center gap-1 pr-2 border-r border-slate-300">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        disabled={!editor.can().chain().focus().toggleBold().run()}
                        active={editor.isActive('bold')}
                        icon={Bold}
                        title="Bold"
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        disabled={!editor.can().chain().focus().toggleItalic().run()}
                        active={editor.isActive('italic')}
                        icon={Italic}
                        title="Italic"
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        active={editor.isActive('underline')}
                        icon={UnderlineIcon}
                        title="Underline"
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        disabled={!editor.can().chain().focus().toggleStrike().run()}
                        active={editor.isActive('strike')}
                        icon={Strikethrough}
                        title="Strikethrough"
                    />
                </div>

                <div className="flex items-center gap-1 px-2 border-r border-slate-300 relative">
                    <div className="relative">
                        <ToolbarButton
                            onClick={() => { setColorPickerOpen(!colorPickerOpen); setHighlightPickerOpen(false); }}
                            icon={Type}
                            title="Text Color"
                            active={colorPickerOpen}
                        />
                        {colorPickerOpen && (
                            <div className="absolute top-full left-0 mt-1 p-2 bg-white border border-slate-200 shadow-lg rounded-lg z-10 flex gap-1 w-[150px] flex-wrap">
                                {presetColors.map(color => (
                                    <button
                                        key={color}
                                        type="button"
                                        className="w-5 h-5 rounded-full border border-slate-200"
                                        style={{ backgroundColor: color }}
                                        onClick={() => {
                                            // @ts-ignore
                                            editor.chain().focus().setColor(color).run();
                                            setColorPickerOpen(false);
                                        }}
                                    />
                                ))}
                                <button
                                    type="button"
                                    className="w-full text-xs text-slate-500 hover:text-slate-900 mt-1"
                                    onClick={() => {
                                        // @ts-ignore
                                        editor.chain().focus().unsetColor().run();
                                        setColorPickerOpen(false);
                                    }}
                                >
                                    Reset
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-1 px-2 border-r border-slate-300">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        active={editor.isActive('heading', { level: 1 })}
                        icon={Heading1}
                        title="Heading 1"
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        active={editor.isActive('heading', { level: 2 })}
                        icon={Heading2}
                        title="Heading 2"
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        active={editor.isActive('heading', { level: 3 })}
                        icon={Heading3}
                        title="Heading 3"
                    />
                </div>

                <div className="flex items-center gap-1 px-2 border-r border-slate-300">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        active={editor.isActive('bulletList')}
                        icon={List}
                        title="Bullet List"
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        active={editor.isActive('orderedList')}
                        icon={ListOrdered}
                        title="Ordered List"
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        active={editor.isActive('blockquote')}
                        icon={Quote}
                        title="Quote"
                    />
                </div>

                <div className="flex items-center gap-1 px-2 border-r border-slate-300">
                    <ToolbarButton
                        onClick={setLink}
                        active={editor.isActive('link')}
                        icon={LinkIcon}
                        title="Add Link"
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().unsetLink().run()}
                        disabled={!editor.isActive('link')}
                        icon={Unlink}
                        title="Remove Link"
                    />
                    <ToolbarButton
                        onClick={addImage}
                        icon={ImageIcon}
                        title="Add Image"
                    />
                </div>

                <div className="flex items-center gap-1 pl-2">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().chain().focus().undo().run()}
                        icon={Undo}
                        title="Undo"
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().chain().focus().redo().run()}
                        icon={Redo}
                        title="Redo"
                    />
                </div>
            </div>

            {/* Content Area */}
            <div className="custom-scrollbar overflow-y-auto flex-1 cursor-text" onClick={() => editor.commands.focus()}>
                <EditorContent editor={editor} />
            </div>

            <style jsx global>{`
                .ProseMirror p {
                    margin: 0.5em 0;
                }
                .ProseMirror h1, .ProseMirror h2, .ProseMirror h3 {
                    margin-top: 1em;
                    margin-bottom: 0.5em;
                    font-weight: 700;
                    color: #0F172A; /* Match email template body text or adjust */
                }
                .ProseMirror h1 { font-size: 1.5em; }
                .ProseMirror h2 { font-size: 1.3em; }
                .ProseMirror h3 { font-size: 1.1em; }
                .ProseMirror ul {
                    list-style-type: disc;
                    padding-left: 1.5em;
                }
                .ProseMirror ol {
                    list-style-type: decimal;
                    padding-left: 1.5em;
                }
                .ProseMirror blockquote {
                    border-left: 3px solid #E2E8F0;
                    padding-left: 1rem;
                    margin-left: 0;
                    margin-right: 0;
                    color: #64748B;
                    font-style: italic;
                }
                .ProseMirror img {
                    display: block;
                    height: auto;
                    margin-left: auto;
                    margin-right: auto;
                }
                .ProseMirror a {
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
}

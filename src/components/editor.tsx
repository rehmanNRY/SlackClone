import Quill, { QuillOptions } from 'quill';
import { Delta, Op } from 'quill/core';
import React, { useRef, useEffect, MutableRefObject, useLayoutEffect, useState } from 'react'
import "quill/dist/quill.snow.css";
import { Button } from './ui/button';
import { PiTextAa } from 'react-icons/pi';
import { ImageIcon, Keyboard, Smile } from 'lucide-react';
import { MdSend } from 'react-icons/md';
import Hint from './hint';
import { cn } from '@/lib/utils';

type EditorValue = {
  image: File | null;
  body: string;
}

interface EditorProps {
  variant?: "create" | "update";
  onSubmit: ({ image, body }: EditorValue) => void;
  onCancel?: () => void;
  placeholder?: string;
  disabled?: boolean;
  innerRef?: MutableRefObject<Quill | null>;
  defaultValue?: Delta | Op[];
}

const Editor = ({
  onCancel,
  onSubmit,
  placeholder = "Write something...",
  defaultValue = [],
  disabled = false,
  innerRef,
  variant = "create",
}: EditorProps) => {
  const [text, setText] = useState("")
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);

  const submitRef = useRef(onSubmit);
  const placeholderRef = useRef(placeholder);
  const quillRef = useRef<Quill | null>(null);
  const defaultValueRef = useRef(defaultValue);
  const containerRef = useRef<HTMLDivElement>(null);
  const disabledRef = useRef(disabled);

  useLayoutEffect(() => {
    submitRef.current == onSubmit;
    placeholderRef.current = placeholder;
    defaultValueRef.current = defaultValue;
    disabledRef.current = disabled;
  })

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const editorContainer = container.appendChild(
      container.ownerDocument.createElement('div'),
    )

    const options: QuillOptions = {
      theme: 'snow',
      placeholder: placeholderRef.current,
      modules: {
        toolbar: [
          ["bold", "italic", "strike"],
          ["link"],
          [{ list: "ordered" }, { list: "bullet" }],
        ],
        keyboard: {
          bindings: {
            enter: {
              key: 'Enter',
              handler: () => {
                // TODO: Submit form
                return;
              }
            },
            shift_enter: {
              key: 'Enter',
              shiftKey: true,
              handler: () => {
                quill.insertText(quill.getSelection()?.index || 0, "\n");
              },
            },
          }
        },
      },
    };

    const quill = new Quill(editorContainer, options);
    quillRef.current = quill;
    quillRef.current.focus();

    if (innerRef) {
      innerRef.current = quill;
    }

    quill.setContents(defaultValueRef.current);
    setText(quill.getText())
    quill.on(Quill.events.TEXT_CHANGE, () => {
      setText(quill.getText())
    })

    return () => {
      quill.off(Quill.events.TEXT_CHANGE);
      if (container) {
        container.innerHTML = '';
      }
      if (quillRef.current) {
        quillRef.current = null;
      }
      if (innerRef) {
        innerRef.current = null;
      }
    }
  }, [innerRef])

  const toggleToolbar = () => {
    setIsToolbarVisible((current) => !current);
    const toolbarElement = containerRef.current?.querySelector('.ql-toolbar');

    if(toolbarElement) {
      toolbarElement.classList.toggle('hidden');
    }
  }

  const isEmpty = text.replace(/<(.|\n)*?>/g, "").trim().length === 0;

  return (
    <div className='flex flex-col'>
      <div className="flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white">
        <div ref={containerRef} className='h-full ql-custom' />
        <div className="flex px-2 pb-2 z-[5]">
          <Hint label={isToolbarVisible ? 'Hide formatting' : 'Show Formatting'} >
            <Button
              disabled={disabled}
              onClick={toggleToolbar}
              variant={"ghost"}
              size={"iconSm"}
            >
              <PiTextAa className='size-4' />
            </Button>
          </Hint>
          <Hint label='Emoji' >
            <Button
              disabled={disabled}
              onClick={() => { }}
              variant={"ghost"}
              size={"iconSm"}
            >
              <Smile className='size-4' />
            </Button>
          </Hint>
          {variant === "create" && (
            <Hint label='Image' >
              <Button
                disabled={disabled}
                onClick={() => { }}
                variant={"ghost"}
                size={"iconSm"}
              >
                <ImageIcon className='size-4' />
              </Button>
            </Hint>
          )}
          {variant === "update" && (
            <div className="ml-auto flex items-center gap-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => { }}
                disabled={isEmpty || disabled}
                >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => { }}
                disabled={disabled}
                className='bg-[#007a5a] hover:bg-[#007a5a]/80 text-white'
              >
                Save
              </Button>
            </div>
          )}
          {variant === "create" && (
            <Button
              disabled={isEmpty || disabled}
              onClick={() => { }}
              size={"iconSm"}
              className={cn(
                'ml-auto',
                isEmpty
                  ? 'bg-white hover:bg-white text-muted-foreground'
                  : 'bg-[#007a5a] hover:bg-[#007a5a]/80 text-white'
              )}
            >
              <MdSend />
            </Button>
          )}
        </div>
      </div>
      <div className='p-2 text-[10px] flex justify-end text-muted-foreground'>
        <p>
          <strong>Shift + Return</strong> to add a new line
        </p>
      </div>
    </div>
  )
}

export default Editor
import { useEffect, useMemo, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';

const toolbarOptions = [
  [{ font: [] }],
  [{ align: [] }],
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ color: [] }, { background: [] }],
  ['link', 'image'],
  ['clean'],
];

interface QuillEditorProps {
  form: any;
  name: string;
}

const QuillEditor = ({ form, name }: QuillEditorProps) => {
  const { setValue } = form;
  const { control } = form;
  const quillRef = useRef(null);
  const [ReactQuill, setReactQuill] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('react-quill').then((QuillModule) => {
        setReactQuill(() => QuillModule.default);
      });
    }
  }, []);

  // handle upload image and insert to editor
  const handleUploadImage = async () => {
    const quill = quillRef.current?.getEditor();

    if (quill) {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.click();

      input.onchange = async () => {
        const file = input.files[0];
        if (/^image\//.test(file.type)) {
        //   const res = await ...yourImageApi
          const res = {data:}
          const range = quill.getSelection(true);
          if (range) {
            quill.insertEmbed(range.index, 'image', res.data[0].url);
          } else {
            quill.clipboard.dangerouslyPasteHTML(
              quill.getLength(),
              `<img src="${res.data[0].url}" alt=""/>`
            );
          }
        }
      };
    }
  };

  // handle change editor
  const handleChange = (html: string) => {
    setValue(name, html);
  };

  const module = useMemo(
    () => ({
      toolbar: {
        container: toolbarOptions,
        handlers: {
          image: handleUploadImage,
        },
      },
    }),
    []
  );

  return (
    <Controller
      name={name || ''}
      control={control}
      render={() => {
        if (typeof window !== 'undefined' && ReactQuill) {
          const Quill = ReactQuill; 

          return (
            <Quill
              ref={quillRef}
              value={form.watch(name)}
              theme='snow'
              modules={module}
              onChange={handleChange}
              placeholder='Write something awesome...'
            />
          );
        }
        return null;
      }}
    />
  );
};

export default QuillEditor;

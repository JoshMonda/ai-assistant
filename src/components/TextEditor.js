import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import openaiAPI from '../helpers/openaiAPI';
import jsPDF from 'jspdf';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton} from 'react-share';
import { FacebookIcon, TwitterIcon, LinkedinIcon } from 'react-share';
import 'bootstrap/dist/css/bootstrap.min.css';

const TextEditor = ({ setSuggestions }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const savedContent = localStorage.getItem('savedContent');
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  const handleChange = (value) => {
    setContent(value);
  };

  const handleBlur = async (_, __, quill) => {
    const text = quill.getText().trim();
    if (text === '') return;

    const suggestions = await openaiAPI(text);
    setSuggestions(suggestions);
  };

  const handleSave = () => {
    localStorage.setItem('savedContent', content);
    alert('Content saved!');
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(content, 10, 10, { maxWidth: 180, align: 'justify' });
    doc.save('content.pdf');
  };
   const shareUrl = window.location.href;
   const shareText = content;

  return (
    <div>
      <ReactQuill value={content} onChange={handleChange} onBlur={handleBlur} />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleDownloadPDF}>Download PDF</button>
      <div>
        <FacebookShareButton url={shareUrl} title={shareText}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} title={shareText}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
         <LinkedinShareButton url={shareUrl} title={shareText}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </div>
    </div>
  );
};

export default TextEditor;

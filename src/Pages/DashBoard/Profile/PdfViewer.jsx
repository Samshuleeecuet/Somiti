import { useState } from 'react';
import { Document, Page } from 'react-pdf';
function PdfViewer({path}) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
    console.log(path)
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document file={path} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
    </div>
  );
}

export default PdfViewer;
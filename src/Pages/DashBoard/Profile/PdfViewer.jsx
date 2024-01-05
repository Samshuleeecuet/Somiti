import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import pdf from '../../../../server/UploadFiles/class-routine-1704464816927.pdf';
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
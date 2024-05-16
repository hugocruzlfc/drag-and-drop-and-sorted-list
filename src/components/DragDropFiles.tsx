import { useState, useRef, ChangeEvent, DragEvent } from "react";

const DragDropFiles = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files);
  };

  // send files to the server
  const handleUpload = () => {
    if (files) {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("Files", file);
      });
      console.log(Array.from(formData.getAll("Files")));
      // fetch(
      //   "link", {
      //     method: "POST",
      //     body: formData
      //   }
      // )
    }
  };

  if (files)
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px]  p-2 border-gray-500 border w-3/4 rounded">
        <ul>
          {Array.from(files).map((file, idx) => (
            <li key={idx}>
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="w-20 h-20"
              />
              <p>
                {file.name} - {file.size} bytes
              </p>
            </li>
          ))}
        </ul>
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            className="bg-red-500 text-white px-2 rounded"
            onClick={() => setFiles(null)}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white px-2 rounded"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      </div>
    );

  return (
    <>
      <div
        className="flex flex-col justify-center items-center min-h-[400px] border w-3/4 rounded
         border-gray-500 p-2"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <h1 className="text-2xl">Drag and Drop Files to Upload</h1>
        <h1>Or</h1>
        <input
          type="file"
          multiple
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setFiles(event.target.files)
          }
          hidden
          accept="image/png, image/jpeg"
          ref={inputRef}
        />
        <button
          className="bg-blue-500 text-white px-2 rounded"
          onClick={() => inputRef.current?.click()}
        >
          Select Files
        </button>
      </div>
    </>
  );
};

export default DragDropFiles;

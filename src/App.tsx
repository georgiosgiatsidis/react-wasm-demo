import { processImage } from '@/helpers/processImage';
import { Filter } from '@/types/Filter';
import { useState } from 'react';

function App() {
  const [image, setImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>(Filter.Grayscale);

  function handleFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setFilter(event.target.value as Filter);
  }

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    const file = files?.length ? files[0] : null;
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = async () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) {
        throw new Error('Failed to get 2D context');
      }

      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);

      const imageData = context.getImageData(0, 0, img.width, img.height);
      const data = imageData.data;
      const output = await processImage(data, img.width, img.height, filter);
      imageData.data.set(output);
      context.putImageData(imageData, 0, 0);
      setProcessedImage(canvas.toDataURL());
    };

    setImage(img.src);
  };

  return (
    <div className="min-h-screen bg-zinc-800 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4 text-white">WASM Image Processor</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="text-white mb-4 p-2 border border-gray-300 rounded-md"
      />
      <select
        value={filter}
        onChange={handleFilterChange}
        className="text-white mb-4 p-2 border border-gray-300 rounded-md"
      >
        {Object.entries(Filter).map(([filterName, filterValue]) => (
          <option key={filterValue} value={filterValue}>
            {filterName}
          </option>
        ))}
      </select>
      <div className="flex flex-col items-center">
        {image && (
          <img
            src={image}
            alt="Original"
            className="mb-4 max-w-full h-auto border border-gray-300 rounded-md"
          />
        )}
        {processedImage && (
          <img
            src={processedImage}
            alt="Processed"
            className="max-w-full h-auto border border-gray-300 rounded-md"
          />
        )}
      </div>
    </div>
  );
}

export default App;

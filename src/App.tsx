import { useEffect } from 'react';
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
    img.onload = () => {
      setImage(img.src);
    };
  };

  useEffect(() => {
    if (!image) return;

    const process = async () => {
      const img = new Image();
      img.src = image;
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
    };

    process();
  }, [image, filter]);

  return (
    <div className="min-h-screen bg-zinc-800 flex flex-col items-center p-4">
      <div className="flex items-center mb-4 gap-3">
        <img src="/js_skg.svg" width="100" />
        <h1 className="text-3xl font-bold text-white">
          WASM Image Processor Demo
        </h1>
      </div>
      <div className="flex gap-3">
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
      </div>
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

import React, { useState } from 'react';
import { Camera, Image, Plus, X } from 'lucide-react';
import orderService from '../../services/order.service';
import { useDispatch } from 'react-redux';
import { order } from '../../reducers/order.reducer';

const EWastePickupForm = ({ onSubmit }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [instructions, setInstructions] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const dispatch = useDispatch();

  const handleItemSelect = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const uploadImage = async (file) => {
    setIsUploading(true);
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'ggnbgs4v');
    data.append('cloud_name', 'dkmdeg6fc');

    try {
      const response = await orderService.cloudinaryUpload(data);
      setImageUrl(response.data.secure_url);
      console.log(response.data.secure_url);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadImage(file);
    }
  };

  const handleSubmit = () => {
    onSubmit({ selectedItems, instructions, imageUrl });
    dispatch(order({ description: instructions, imageUrl, tags: selectedItems }));
  };

  return (
    <div className='flex flex-col items-center justify-center max-w-3xl mx-auto mt-10 mb-6'>
      <h2 className='text-2xl font-bold text-white mb-6 text-center'>
        Hari yang tepat untuk membersihkan limbah elektronik!
      </h2>
      <div className='bg-white rounded-lg shadow-md overflow-hidden w-full'>
        <div className='p-4'>
          <h3 className='text-xl text-[#332F9E] mb-4'>
            Punya perangkat lama yang tak terpakai? Kami siap menjemputnya!
          </h3>

          <div className='mb-4'>
            <h3 className='font-semibold text-gray-800 mb-2'>
              Barang apa yang perlu kami ambil:
            </h3>
            <div className='flex flex-wrap gap-2'>
              {['Laptop', 'PC', 'Mobile Phone', 'CPU', 'Monitor'].map(
                (item) => (
                  <button
                    key={item}
                    className={`px-3 py-1 rounded-full flex items-center ${
                      selectedItems.includes(item)
                        ? 'bg-[#332F9E] text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                    onClick={() => handleItemSelect(item)}
                  >
                    {item}
                    {selectedItems.includes(item) && (
                      <X size={16} className='ml-1' />
                    )}
                  </button>
                )
              )}
              <button className='px-3 py-1 rounded-full bg-gray-200 text-gray-700'>
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className='flex gap-4 mb-4'>
            <label className='flex-1 bg-[#332F9E] text-white py-2 rounded flex items-center justify-center cursor-pointer'>
              <Camera className='mr-2' />
              Ambil foto
              <input
                type='file'
                accept='image/*'
                capture='environment'
                onChange={handleImageUpload}
                className='hidden'
              />
            </label>
            <label className='flex-1 bg-[#332F9E] text-white py-2 rounded flex items-center justify-center cursor-pointer'>
              <Image className='mr-2' />
              Pilih dari Galeri
              <input
                type='file'
                accept='image/*'
                onChange={handleImageUpload}
                className='hidden'
              />
            </label>
          </div>

          {isUploading && <p className='text-gray-800'>Uploading image...</p>}
          {imageUrl && (
            <div className='mb-4'>
              <img src={imageUrl} alt='Uploaded e-waste' className='w-full rounded' />
            </div>
          )}

          <div className='mb-4'>
            <label htmlFor='instructions' className='block mb-2 font-semibold text-gray-800'>
              Tambahkan instruksi agar kurir mudah menemukan lokasimu!
            </label>
            <textarea
              id='instructions'
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded text-gray-800'
              rows='3'
            />
          </div>

          <button
            onClick={handleSubmit}
            className='w-full bg-[#332F9E] text-white py-2 rounded font-semibold'
            disabled={isUploading}
          >
            Lanjut
          </button>
        </div>
      </div>
    </div>
  );
};

export default EWastePickupForm;
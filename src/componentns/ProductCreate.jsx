// src/components/ProductCreate.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const ProductCreate = () => {
  const [formData, setFormData] = useState({
    name: '',
    variant: '',
    price: '',
    originalPrice: '',
    category: 'sunglasses',
    colors: ['#000000'],
    rating: '',
    reviews: '',
    isNew: false,
    badge: '',
  });
  const [images, setImages] = useState([{ id: Date.now(), file: null }]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleColorChange = (e, index) => {
    const newColors = [...formData.colors];
    newColors[index] = e.target.value;
    setFormData((prev) => ({ ...prev, colors: newColors }));
  };

  const addColorField = () => {
    if (formData.colors.length < 5) {
      setFormData((prev) => ({ ...prev, colors: [...prev.colors, '#000000'] }));
    }
  };

  const handleImageChange = (e, index) => {
    const newImages = [...images];
    newImages[index] = { ...newImages[index], file: e.target.files[0] };
    setImages(newImages);
  };

  const addImageField = () => {
    if (images.length < 10) {
      setImages((prev) => [...prev, { id: Date.now(), file: null }]);
    }
  };

  const removeImageField = (id) => {
    if (images.length > 1) {
      setImages((prev) => prev.filter((img) => img.id !== id));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate required fields
    const requiredFields = ['name', 'variant', 'price', 'category'];
    const missingFields = requiredFields.filter((field) => !formData[field].trim());
    if (missingFields.length > 0) {
      setError(`Заполните обязательные поля: ${missingFields.join(', ')}`);
      return;
    }
    if (!formData.colors.length || formData.colors.every((c) => !c.trim())) {
      setError('Укажите хотя бы один цвет');
      return;
    }

    const validImages = images.filter((img) => img.file);
    if (validImages.length < 2 || validImages.length > 10) {
      setError('Количество изображений должно быть от 2 до 10');
      return;
    }

    const data = {
      ...formData,
      price: parseInt(formData.price) || 0,
      originalPrice: formData.originalPrice ? parseInt(formData.originalPrice) : undefined,
      rating: parseFloat(formData.rating) || 0,
      reviews: parseInt(formData.reviews) || 0,
      colors: formData.colors.filter((color) => color && color.trim() !== ''),
    };

    const formDataToSend = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === 'colors') {
        formDataToSend.append(key, JSON.stringify(data[key])); // Ensure colors is a JSON string
      } else if (key !== 'images') { // Exclude images from this loop
        formDataToSend.append(key, data[key]);
      }
    });
    validImages.forEach((img, index) => {
      formDataToSend.append('images', img.file); // Append each image file
    });

    // Debug: Log FormData contents
    console.log('FormData contents:', [...formDataToSend.entries()]);

    try {
      const response = await axios.post('https://backend-production-79eb.up.railway.app/api/products', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Продукт успешно создан!');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Ошибка при создании продукта');
      console.error('Error Response:', err.response?.data || err.message);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-light text-gray-900 mb-6">Создать новый продукт</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-light mb-2">Название</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-light mb-2">Вариант</label>
            <input
              type="text"
              name="variant"
              value={formData.variant}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-light mb-2">Цена</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-light mb-2">Оригинальная цена</label>
            <input
              type="number"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-light mb-2">Категория</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            >
              <option value="sunglasses">Солнцезащитные</option>
              <option value="optical">Оптические</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-light mb-2">Цвета (до 5)</label>
            {formData.colors.map((color, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => handleColorChange(e, index)}
                  className="w-12 h-12 border border-gray-300 rounded mr-2"
                />
                <input
                  type="text"
                  value={color}
                  onChange={(e) => handleColorChange(e, index)}
                  className="flex-1 border border-gray-300 rounded px-2 py-1"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addColorField}
              className="mt-2 bg-gray-900 text-white py-2 px-4 rounded font-light hover:bg-gray-800 transition-colors duration-300"
              disabled={formData.colors.length >= 5}
            >
              Добавить цвет
            </button>
          </div>
          <div>
            <label className="block text-gray-700 font-light mb-2">Рейтинг</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              step="0.1"
              min="0"
              max="5"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-light mb-2">Отзывы</label>
            <input
              type="number"
              name="reviews"
              value={formData.reviews}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-light mb-2">Новый</label>
            <input
              type="checkbox"
              name="isNew"
              checked={formData.isNew}
              onChange={handleChange}
              className="mr-2 leading-tight"
            />
            <span className="text-gray-700">Отметить как новый</span>
          </div>
          <div>
            <label className="block text-gray-700 font-light mb-2">Значок</label>
            <input
              type="text"
              name="badge"
              value={formData.badge}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Например, Новинка"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-light mb-2">Изображения (2-10)</label>
            {images.map((img, index) => (
              <div key={img.id} className="flex items-center mb-2">
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e, index)}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  accept="image/jpeg,image/jpg,image/png"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeImageField(img.id)}
                    className="ml-2 bg-red-500 text-white py-1 px-2 rounded font-light hover:bg-red-600 transition-colors duration-300"
                  >
                    Удалить
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addImageField}
              className="mt-2 bg-gray-900 text-white py-2 px-4 rounded font-light hover:bg-gray-800 transition-colors duration-300"
              disabled={images.length >= 10}
            >
              Добавить фото
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded font-light tracking-wide uppercase text-sm hover:bg-gray-800 transition-colors duration-300"
            disabled={images.filter((img) => img.file).length < 2 || images.filter((img) => img.file).length > 10}
          >
            Создать продукт
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductCreate;
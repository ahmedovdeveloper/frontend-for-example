// import React, { useState, useEffect, useRef } from 'react';

// const SunglassesLanding = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [isDragging, setIsDragging] = useState(false);
//     const [startX, setStartX] = useState(0);
//     const [scrollLeft, setScrollLeft] = useState(0);
//     const scrollContainerRef = useRef(null);

//     const API_BASE_URL = 'http://localhost:3001/api';

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);

//                 const response = await fetch(`${API_BASE_URL}/products`);

//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }

//                 const data = await response.json();
//                 setProducts(data);
//             } catch (error) {
//                 console.error('Error loading products:', error);
//                 setError(error.message);

//                 // Fallback to mock data if API fails
//                 const mockProducts = [
//                     {
//                         _id: '1',
//                         name: 'H5 HENDRIX',
//                         variant: 'BLACK/BROWN',
//                         price: 139.00,
//                         originalPrice: 149.00,
//                         colors: ['#4a3f2a'],
//                         images: ['hendrix.jpg']
//                     },
//                     {
//                         _id: '2',
//                         name: 'H1 ROLAND',
//                         variant: 'CRYSTAL',
//                         price: 139.00,
//                         originalPrice: 149.00,
//                         colors: ['#f0f0f0'],
//                         images: ['roland.jpg']
//                     },
//                     {
//                         _id: '3',
//                         name: 'H3 HAMPTON',
//                         variant: 'BLACK/BLUE',
//                         price: 139.00,
//                         originalPrice: 149.00,
//                         colors: ['#1a1a2e'],
//                         images: ['hampton.jpg']
//                     }
//                 ];
//                 setProducts(mockProducts);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProducts();
//     }, []);

//     const addToCart = (product) => {
//         alert(`${product.name} добавлен в корзину!`);
//     };

//     // Mouse drag handlers
//     const handleMouseDown = (e) => {
//         if (!scrollContainerRef.current) return;
//         setIsDragging(true);
//         setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
//         setScrollLeft(scrollContainerRef.current.scrollLeft);
//         scrollContainerRef.current.style.cursor = 'grabbing';
//     };

//     const handleMouseMove = (e) => {
//         if (!isDragging || !scrollContainerRef.current) return;
//         e.preventDefault();
//         const x = e.pageX - scrollContainerRef.current.offsetLeft;
//         const walk = (x - startX) * 2;
//         scrollContainerRef.current.scrollLeft = scrollLeft - walk;
//     };

//     const handleMouseUp = () => {
//         setIsDragging(false);
//         if (scrollContainerRef.current) {
//             scrollContainerRef.current.style.cursor = 'grab';
//         }
//     };

//     const handleMouseLeave = () => {
//         setIsDragging(false);
//         if (scrollContainerRef.current) {
//             scrollContainerRef.current.style.cursor = 'grab';
//         }
//     };

//     // Scroll buttons
//     const scrollLeftBtn = () => {
//         if (scrollContainerRef.current) {
//             scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
//         }
//     };

//     const scrollRightBtn = () => {
//         if (scrollContainerRef.current) {
//             scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
//         }
//     };

//     const renderSunglassesImage = (product, index) => {
//         // Use real image if available, otherwise fallback to SVG
//         const firstImage = product.images && product.images.length > 0 ? product.images[0] : null;
//         console.log(firstImage)
//         if (firstImage) {
//             return (
//                 <img
//                     src={`${API_BASE_URL}/uploads/${firstImage}`}
//                     alt={`${product.name} - ${product.variant}`}
//                     className="w-24 h-24 object-contain"
//                 />
//             );
//         }

//         // Enhanced SVG fallback design
//         const getSunglassesDesign = (name, variant, index) => {
//             const designs = {
//                 'HENDRIX': (
//                     <div className="w-24 h-20 relative">
//                         <div className="absolute inset-0 flex items-center justify-center">
//                             <div className="w-20 h-12 border-2 border-amber-700 rounded-full bg-gradient-to-b from-amber-200 to-amber-400 shadow-lg">
//                                 <div className="flex items-center justify-center h-full px-1">
//                                     <div className="w-8 h-8 bg-amber-900 rounded-full mx-0.5"></div>
//                                     <div className="w-8 h-8 bg-amber-900 rounded-full mx-0.5"></div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-1 bg-amber-700 rounded"></div>
//                     </div>
//                 ),
//                 'ROLAND': (
//                     <div className="w-24 h-20 relative">
//                         <div className="absolute inset-0 flex items-center justify-center">
//                             <div className="w-20 h-12 border-2 border-gray-300 rounded-lg bg-gradient-to-b from-white to-gray-50 shadow-lg">
//                                 <div className="flex items-center justify-center h-full px-1">
//                                     <div className="w-8 h-8 bg-gray-400 rounded-sm mx-0.5 opacity-70"></div>
//                                     <div className="w-8 h-8 bg-gray-400 rounded-sm mx-0.5 opacity-70"></div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-1 bg-gray-400"></div>
//                     </div>
//                 ),
//                 'HAMPTON': (
//                     <div className="w-24 h-20 relative">
//                         <div className="absolute inset-0 flex items-center justify-center">
//                             <div className="w-20 h-12 border-2 border-gray-800 rounded-lg bg-gradient-to-b from-gray-100 to-gray-300 shadow-lg">
//                                 <div className="flex items-center justify-center h-full px-1">
//                                     <div className="w-8 h-8 bg-gray-800 rounded-sm mx-0.5"></div>
//                                     <div className="w-8 h-8 bg-gray-800 rounded-sm mx-0.5"></div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-1 bg-gray-800"></div>
//                     </div>
//                 ),
//             };

//             const modelName = name.split(' ')[1] || 'HAMPTON'; // Default to HAMPTON if no match
//             return designs[modelName] || designs['HAMPTON'];
//         };

//         return getSunglassesDesign(product.name, product.variant, index);
//     };

//     return (
//         <div className="h-screen flex flex-col bg-gray-100">
//             {/* Video Background Hero Section - Full Height */}
//             <div className="flex-1 relative overflow-hidden">
//                 <video
//                     className="absolute inset-0 w-full h-full object-cover"
//                     autoPlay
//                     muted
//                     loop
//                     playsInline
//                 >
//                     <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
//                 </video>

//                 <div className="absolute inset-0 flex items-center justify-center">
//                     <div className="relative w-full h-full bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200">
//                         <div className="absolute inset-0 flex items-center justify-center">
//                             <div className="relative">
//                                 <div className="relative">
//                                     <div className="w-80 h-80 relative">
//                                         <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-56 h-32">
//                                             <div className="w-full h-full bg-amber-800 rounded-t-full"></div>
//                                             <div className="absolute top-2 left-4 w-8 h-8 bg-amber-700 rounded-full"></div>
//                                             <div className="absolute top-4 right-6 w-6 h-6 bg-amber-900 rounded-full"></div>
//                                             <div className="absolute top-1 left-1/2 w-10 h-10 bg-amber-600 rounded-full"></div>
//                                         </div>

//                                         <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-40 h-48 bg-gradient-to-b from-amber-100 to-amber-200 rounded-full relative">
//                                             <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
//                                                 <div className="w-32 h-12 bg-black rounded-full flex items-center justify-center shadow-lg">
//                                                     <div className="flex space-x-1">
//                                                         <div className="w-12 h-8 bg-gray-900 rounded-full border border-gray-700"></div>
//                                                         <div className="w-12 h-8 bg-gray-900 rounded-full border border-gray-700"></div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-3 h-4 bg-amber-300 rounded-full"></div>
//                                             <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-amber-300 rounded-full"></div>
//                                         </div>

//                                         <div className="absolute top-24 left-8 w-8 h-16 bg-amber-200 rounded-full transform rotate-12"></div>
//                                         <div className="absolute top-24 right-8 w-8 h-16 bg-amber-200 rounded-full transform -rotate-12"></div>
//                                         <div className="absolute top-56 left-1/2 transform -translate-x-1/2 w-72 h-40 bg-gray-900 rounded-t-3xl"></div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="absolute inset-0 bg-black bg-opacity-20"></div>
//             </div>

//             {/* Products Strip Container */}
//             <div className="bg-white h-40 flex-shrink-0 border-t border-gray-200 relative">
//                 <button
//                     onClick={scrollLeftBtn}
//                     className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-300 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 flex items-center justify-center"
//                 >
//                     <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                     </svg>
//                 </button>

//                 <button
//                     onClick={scrollRightBtn}
//                     className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-300 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 flex items-center justify-center"
//                 >
//                     <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                     </svg>
//                 </button>

//                 <div
//                     ref={scrollContainerRef}
//                     className="h-full overflow-x-auto overflow-y-hidden scrollbar-hide cursor-grab select-none px-12"
//                     style={{
//                         scrollbarWidth: 'none',
//                         msOverflowStyle: 'none',
//                     }}
//                     onMouseDown={handleMouseDown}
//                     onMouseMove={handleMouseMove}
//                     onMouseUp={handleMouseUp}
//                     onMouseLeave={handleMouseLeave}
//                 >
//                     <div className="flex h-full justify-center items-center">
//                         {products.map((product, index) => (
//                             <div
//                                 key={product._id}
//                                 className="flex-shrink-0 w-80 h-32 bg-white border border-gray-200 rounded-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 mx-2 relative overflow-hidden"
//                                 style={{ userSelect: 'none' }}
//                             >
//                                 <div className="h-full p-4 flex items-center justify-between">
//                                     {/* Left side - Product Info */}
//                                     <div className="flex-1 pr-2">
//                                         <h3 className="font-bold text-xl text-gray-900 mb-1 tracking-wide">
//                                             {product.name}
//                                         </h3>
//                                         <p className="text-sm text-gray-600 mb-2 uppercase">
//                                             {product.variant}
//                                         </p>
//                                         <div className="flex items-center space-x-2">
//                                             <p className="text-lg font-semibold text-gray-900">
//                                                 ${product.price.toFixed(2)}
//                                             </p>
//                                             {product.originalPrice && product.originalPrice !== product.price && (
//                                                 <p className="text-sm text-gray-500 line-through">
//                                                     ${product.originalPrice.toFixed(2)}
//                                                 </p>
//                                             )}
//                                         </div>
//                                         {product.badge && (
//                                             <span className="inline-block text-xs bg-blue-500 text-white px-2 py-1 rounded-full mt-1">
//                                                 {product.badge.toUpperCase()}
//                                             </span>
//                                         )}
//                                     </div>

//                                     {/* Center - Product Image */}
//                                     <div className="flex-1 flex justify-center items-center px-2">
//                                         <img
//                                             src={`http://localhost:3001/uploads/${product.images[0] || 'placeholder.svg'}`}
//                                             alt={`${product.name} - ${product.variant}`}
//                                             className="w-24 h-24 object-contain"
//                                         />
//                                     </div>

//                                     {/* Right side - Add Button */}
//                                     <div className="flex justify-center items-center">
//                                         <button
//                                             onClick={(e) => {
//                                                 e.stopPropagation();
//                                                 addToCart(product);
//                                             }}
//                                             className="w-10 h-10 border-2 border-gray-400 rounded-full flex items-center justify-center hover:border-black hover:bg-black hover:text-white transition-all duration-300 text-gray-600"
//                                         >
//                                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                                             </svg>
//                                         </button>
//                                     </div>
//                                 </div>

//                                 {/* Card bottom border accent */}
//                                 <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200"></div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 <style jsx>{`
//           .scrollbar-hide::-webkit-scrollbar {
//             display: none;
//           }
//         `}</style>
//             </div>

//             {loading && (
//                 <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
//                     <div className="flex flex-col items-center">
//                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4"></div>
//                         <p className="text-gray-600">Загружаем продукты...</p>
//                     </div>
//                 </div>
//             )}

//             {error && !loading && products.length === 0 && (
//                 <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50">
//                     <div className="flex items-center">
//                         <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                         <div>
//                             <p className="font-semibold">Ошибка загрузки</p>
//                             <p className="text-sm">Используются тестовые данные</p>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default SunglassesLanding;
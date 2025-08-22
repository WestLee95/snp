import knife from "./assets/knife.png";
import food from "./assets/food.png";
import fork from "./assets/fork.png";
import { useState, useEffect } from 'react';

export default function InteractiveMenu() {
  // State to store the menu items
  const [mainCourse, setMainCourse] = useState('');
  const [dessert, setDessert] = useState('');
  
  // State to track if items have been submitted
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Load saved data when component mounts
  useEffect(() => {
    const savedMainCourse = localStorage.getItem('mainCourse');
    const savedDessert = localStorage.getItem('dessert');
    const savedSubmitted = localStorage.getItem('isSubmitted') === 'true';
    
    if (savedMainCourse) setMainCourse(savedMainCourse);
    if (savedDessert) setDessert(savedDessert);
    if (savedSubmitted) setIsSubmitted(savedSubmitted);
  }, []);

  // Handle form submission
  const handleSubmit = () => {
    if (mainCourse.trim() && dessert.trim()) {
      // Save to localStorage for persistence
      localStorage.setItem('mainCourse', mainCourse);
      localStorage.setItem('dessert', dessert);
      localStorage.setItem('isSubmitted', 'true');
      setIsSubmitted(true);
    }
  };

  // Handle reset (optional - you can remove this if you don't want reset functionality)
  const handleReset = () => {
    localStorage.removeItem('mainCourse');
    localStorage.removeItem('dessert');
    localStorage.removeItem('isSubmitted');
    setMainCourse('');
    setDessert('');
    setIsSubmitted(false);
  };

  return (
    <section className="bg-orange-100 mx-auto flex flex-col items-center justify-center w-full h-[650px] relative">
      <div className="absolute inset-0 h-full w-[200px] bg-orange-200 left-1/2 transform -translate-x-1/2"></div>
      <h3 className="absolute top-20 left-1/2 transform -translate-x-1/2 text-2xl font-bold z-20">MENU</h3>
      
      <div className="relative z-30 flex justify-center items-center gap-[512px] h-[300px]">
        {/* Main Course Section */}
        <div className="flex flex-col justify-center items-center gap-4">
          <h4 className="text-lg font-semibold">Main Course</h4>
          {!isSubmitted ? (
            <input 
              type="text" 
              value={mainCourse}
              onChange={(e) => setMainCourse(e.target.value)}
              placeholder="Enter main course..."
              className="w-[250px] h-[50px] bg-orange-200 rounded-full px-4 text-center focus:outline-none focus:ring-2 focus:ring-orange-400 z-40" 
            />
          ) : (
            <div className="w-[250px] h-[50px] bg-orange-300 rounded-full flex items-center justify-center font-medium text-gray-800">
              {mainCourse}
            </div>
          )}
        </div>

      {/* Food Images Section */}
        <div className="absolute z-10 flex justify-center items-center gap-4">
          <img className="w-[100px] scale-550" src={knife} alt="" />

          <img className="w-[200px] scale-450" src={food} alt="" />

          <img className="w-[100px] scale-550" src={fork} alt="" />
        </div>

        {/* Dessert Section */}
        <div className="flex flex-col justify-center items-center gap-4">
          <h4 className="text-lg font-semibold">Dessert</h4>
          {!isSubmitted ? (
            <input 
              type="text" 
              value={dessert}
              onChange={(e) => setDessert(e.target.value)}
              placeholder="Enter dessert..."
              className="w-[250px] h-[50px] bg-orange-200 rounded-full px-4 text-center focus:outline-none focus:ring-2 focus:ring-orange-400 z-40" 
            />
          ) : (
            <div className="w-[250px] h-[50px] bg-orange-300 rounded-full flex items-center justify-center font-medium text-gray-800">
              {dessert}
            </div>
          )}
        </div>
      </div>

      {/* Submit/Reset Buttons */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-4 z-30">
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!mainCourse.trim() || !dessert.trim()}
            className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Save Menu
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
          >
            Edit Menu
          </button>
        )}
      </div>
    </section>
  );
}

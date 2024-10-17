import React from 'react';

const Courses = () => {
  const coursesData = [
    {
      "_id": "67054fc6dc0ae74d8ec353a2",
      "name": "React for Beginners",
      "description": "Learn the basics of React.js and build dynamic web applications.",
      "categories": ["Web Development", "JavaScript", "Frontend"],
      "price": 49.99,
      "thumbnailUrl": "https://example.com/react-image.jpg",
      "tags": ["React", "JavaScript", "Web Development"],
      "level": "Beginner",
      "badges": ["React Beginner"],
      "totalLectures": 12,
      "totalDuration": 360, // minutes
    },
    {
      "_id": "67055129dc0ae74d8ec353a4",
      "name": "Python for Beginners",
      "description": "Get started with Python and develop a strong foundation in programming.",
      "categories": ["Programming", "Python", "Backend"],
      "price": 59.99,
      "thumbnailUrl": "https://example.com/python-image.jpg",
      "tags": ["Python", "Backend", "Programming"],
      "level": "Beginner",
      "badges": ["Python Beginner"],
      "totalLectures": 10,
      "totalDuration": 300, // minutes
    },
    {
      "_id": "67054fc6dc0ae74d8ec353a2",
      "name": "React for Beginners",
      "description": "Learn the basics of React.js and build dynamic web applications.",
      "categories": ["Web Development", "JavaScript", "Frontend"],
      "price": 49.99,
      "thumbnailUrl": "https://example.com/react-image.jpg",
      "tags": ["React", "JavaScript", "Web Development"],
      "level": "Beginner",
      "badges": ["React Beginner"],
      "totalLectures": 12,
      "totalDuration": 360, // minutes
    },
    {
      "_id": "67055129dc0ae74d8ec353a4",
      "name": "Python for Beginners",
      "description": "Get started with Python and develop a strong foundation in programming.",
      "categories": ["Programming", "Python", "Backend"],
      "price": 59.99,
      "thumbnailUrl": "https://example.com/python-image.jpg",
      "tags": ["Python", "Backend", "Programming"],
      "level": "Beginner",
      "badges": ["Python Beginner"],
      "totalLectures": 10,
      "totalDuration": 300, // minutes
    },
    {
      "_id": "67054fc6dc0ae74d8ec353a2",
      "name": "React for Beginners",
      "description": "Learn the basics of React.js and build dynamic web applications.",
      "categories": ["Web Development", "JavaScript", "Frontend"],
      "price": 49.99,
      "thumbnailUrl": "https://example.com/react-image.jpg",
      "tags": ["React", "JavaScript", "Web Development"],
      "level": "Beginner",
      "badges": ["React Beginner"],
      "totalLectures": 12,
      "totalDuration": 360, // minutes
    },
    {
      "_id": "67055129dc0ae74d8ec353a4",
      "name": "Python for Beginners",
      "description": "Get started with Python and develop a strong foundation in programming.",
      "categories": ["Programming", "Python", "Backend"],
      "price": 59.99,
      "thumbnailUrl": "https://example.com/python-image.jpg",
      "tags": ["Python", "Backend", "Programming"],
      "level": "Beginner",
      "badges": ["Python Beginner"],
      "totalLectures": 10,
      "totalDuration": 300, // minutes
    },
    {
      "_id": "67054fc6dc0ae74d8ec353a2",
      "name": "React for Beginners",
      "description": "Learn the basics of React.js and build dynamic web applications.",
      "categories": ["Web Development", "JavaScript", "Frontend"],
      "price": 49.99,
      "thumbnailUrl": "https://example.com/react-image.jpg",
      "tags": ["React", "JavaScript", "Web Development"],
      "level": "Beginner",
      "badges": ["React Beginner"],
      "totalLectures": 12,
      "totalDuration": 360, // minutes
    },
    {
      "_id": "67055129dc0ae74d8ec353a4",
      "name": "Python for Beginners",
      "description": "Get started with Python and develop a strong foundation in programming.",
      "categories": ["Programming", "Python", "Backend"],
      "price": 59.99,
      "thumbnailUrl": "https://example.com/python-image.jpg",
      "tags": ["Python", "Backend", "Programming"],
      "level": "Beginner",
      "badges": ["Python Beginner"],
      "totalLectures": 10,
      "totalDuration": 300, // minutes
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-white text-center mt-8 mb-12">Available Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {coursesData.map((course) => (
          <div
            key={course._id}
            className="bg-gray-800 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={course.thumbnailUrl}
              alt={course.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-white">{course.name}</h2>
              <p className="text-gray-400 mt-2">{course.description}</p>
              
              <div className="mt-3 flex flex-wrap gap-2">
                {course.tags.map((tag, index) => (
                  <span key={index} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-teal-400">${course.price}</span>
                <span className="text-sm text-gray-400">{course.level}</span>
              </div>

              <div className="mt-4 text-sm text-gray-500">
                <p>{course.totalLectures} Lectures • {Math.floor(course.totalDuration / 60)}h {course.totalDuration % 60}m</p>
              </div>

              <div className="mt-2 flex items-center gap-2">
                {course.badges.map((badge, index) => (
                  <span key={index} className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">
                    {badge}
                  </span>
                ))}
              </div>

              <button className="mt-6 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
                View Course
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;

import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import BadgeImg from "../../Client/Badges/BadgeImg";

const CourseListItem = ({ course }) => {
  const { auth } = useContext(AuthContext);

  return (
    <div className="flex items-center bg-white shadow-lg rounded-lg p-4 mb-4 hover:shadow-xl transition-shadow">
      {/* Thumbnail */}
      <div className="w-60 h-28 flex-shrink-0">
        <Link to={auth ? `/courses/${course?._id}` : `/login`}>
          <img
            src={course.thumbnailUrl}
            alt={course.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </Link>
      </div>


    </div>
  );
};

export default CourseListItem;

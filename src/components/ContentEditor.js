"use client";

import { useState } from "react";

export default function ContentEditor({ slug, initialData }) {
  const [formData, setFormData] = useState(initialData);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleSave = async () => {
    const updatedData = { ...formData };

    if (selectedImage) {
      updatedData.image = selectedImage;
    }

    await updateContent(slug, updatedData);
    alert("Content updated successfully!");
  };

  return (
    <div className="w-full px-6 sm:px-14 max-w-screen-lg mx-auto">
      <div className="w-full flex flex-col mt-8 p-4 sm:p-6 border rounded-md shadow-md bg-primary-200 dark:bg-gray-700 text-primary-50 overflow-x-auto">
        <h2 className="text-xl text-center font-semibold mb-4 capitalize break-words">
          Edit {slug}
        </h2>
        {initialData.coverHeader}
      </div>
    </div>
  );
}

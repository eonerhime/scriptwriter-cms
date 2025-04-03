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
    <div className="max-w-xl md:max-w-4xl w-full mx-auto h-auto">
      <div className="w-full flex flex-col mt-8 p-6 border rounded-md shadow-md bg-primary-200 dark:bg-gray-700 text-primary-50">
        <h2 className="text-xl text-center font-semibold mb-4 capitalize">
          Edit {slug}
        </h2>
        {initialData.coverHeader}
      </div>
    </div>
  );
}

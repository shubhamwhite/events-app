import React from 'react';
import { Save } from 'lucide-react';

const FooterSection = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Footer Management</h2>
        <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
          <Save size={20} />
          Save Changes
        </button>
      </div>
      
      <div className="grid gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-semibold mb-2">Company Information</h3>
          <textarea
            className="w-full p-2 border rounded mb-4"
            rows={2}
            placeholder="Enter company description"
          ></textarea>
          
          <h3 className="font-semibold mb-2">Contact Information</h3>
          <div className="grid gap-2">
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Email address"
            />
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Phone number"
            />
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Address"
            />
          </div>
        </div>
        
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-semibold mb-2">Social Media Links</h3>
          <div className="grid gap-2">
            <input
              type="url"
              className="w-full p-2 border rounded"
              placeholder="Facebook URL"
            />
            <input
              type="url"
              className="w-full p-2 border rounded"
              placeholder="Twitter URL"
            />
            <input
              type="url"
              className="w-full p-2 border rounded"
              placeholder="Instagram URL"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterSection;
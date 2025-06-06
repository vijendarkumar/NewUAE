import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../Component/Admin/AdminLayout';
import HomePage from '../Component/Admin/HomePage';
import StoryInsert from '../Component/Admin/StoryInsert';
import StoryTable from '../Component/Admin/StoryTable';

const Admin = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<HomePage />} />
        <Route path="story-insert" element={<StoryInsert />} />
        <Route path="story-table" element={<StoryTable />} />
      </Route>
    </Routes>
  );
};

export default Admin;

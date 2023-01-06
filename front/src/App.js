
import { Route, Routes, useParams } from 'react-router-dom';
import Registration from './Components/Pages/Registration/Registration';
import Login from './Components/Pages/Login/Login';
import { useState } from 'react';
import state from './State';
import Dashboard from './Components/Pages/Admin/Dashboard/Dashboard';
import Shop from './Components/Pages/Admin/Shop/Shop';
import CategoryWidgets from './Components/Widgets/CategoryWidgets/CategoryWidgets';
import MainPageShop from './Components/Pages/Shop/MainPageShop/MainPageShop';
import Contact from './Components/Pages/Contact/Contact';
import logo from './images/logo_header.svg';
import Profile from './Components/Pages/Admin/Profile/Profile';
import ProfileAvatarEdit from './Components/Pages/Admin/ProfileAvatarEdit/ProfileAvatarEdit';
import ProtectedRoute from './Components/ProtectedRoute';
import Field from './Field';
import AppealChat from './Components/Pages/AppealChat/AppealChat';



function App() {

  let [stateApp, setStateApp] = useState(state);

  
  return (
      <Routes>
        <Route path="/" element={<Login stateApp={stateApp} setStateApp={setStateApp} />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/contact" element={<Contact stateApp={stateApp} setStateApp={setStateApp} logo={logo} field={Field}/>} />
        <Route path="/appeal/:appealId" element={<AppealChat stateApp={stateApp} setStateApp={setStateApp}/>} />
        {/* обертка для защищенных 
        от неавторизованных пользователей роутов */}
        <Route element={<ProtectedRoute stateApp={stateApp} setStateApp={setStateApp} />}>
          <Route path="/admin" element={<Dashboard stateApp={stateApp} setStateApp={setStateApp}/>}/>
          <Route path="/admin/shop/:shopId" element={<Shop stateApp={stateApp} setStateApp={setStateApp}/>} />
          <Route path="/admin/shop/:shopId/category" element={<CategoryWidgets stateApp={stateApp} setStateApp={setStateApp}/>} />
          <Route path="/admin/shop/:shopId/product" element={<CategoryWidgets stateApp={stateApp} setStateApp={setStateApp}/>} />
          <Route path="/shop/:shopHash" element={<MainPageShop stateApp={stateApp} setStateApp={setStateApp}/>} />
          <Route path="/admin/profile" element={<Profile stateApp={stateApp} setStateApp={setStateApp}/>}/>
          <Route path="/admin/profile/avatar-edit" element={<ProfileAvatarEdit stateApp={stateApp} setStateApp={setStateApp}/>}/>
        </Route>
      </Routes>
  );
}

export default App;

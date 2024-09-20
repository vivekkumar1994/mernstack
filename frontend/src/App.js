
import './App.css';
import UsersTable from './User';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserForm from './useForm';
import BlogList from './BlogList';
import BlogForm from './BlogForm';


function App() {
  return (
    <div className="App">
    <UsersTable/>
    <UserForm/>

    <Routes>
                    <Route path="/" element={<BlogList />} />
                    <Route path="/create" element={<BlogForm />} />
                    <Route path="/edit/:id" element={<BlogForm />} />
                </Routes>
    </div>
  );
}

export default App;

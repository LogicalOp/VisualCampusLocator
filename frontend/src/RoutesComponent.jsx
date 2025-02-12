import { Routes, Route } from 'react-router-dom';
import {
    Home,
    VPR,
} from './pages';

const RoutesComponent = () => (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/vpr' element={<VPR />} />
    </Routes>
);

export default RoutesComponent;
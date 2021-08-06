import Home from './Home/Home'
import Createmap from './Createmap/Createmap'
import Error from './Error/Error'
import Adventure from './Adventure/Adventure';

export const views = [
    { name: "Home", path: "/", Component: Home },
    { name: "Createmap", path: "/create", Component: Createmap },
    { name: "Adventure", path: "/adventure", Component: Adventure },
    { name: "Error", path: "/**", Component: Error },
];

export default views;
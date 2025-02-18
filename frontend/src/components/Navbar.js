// import React, { useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
// import { AuthContext } from "../context/AuthContext";

// const Navbar = () => {
//   const { user, setUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     navigate("/");
//   };

//   return (
//     <AppBar position="static" sx={{ backgroundColor: "#1976d2", padding: "8px 0" }}>
//       <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 3 }}>
//         {/* Left: Logo */}
//         <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//           Online Quiz System
//         </Typography>

//         {/* Middle: Navigation Links */}
//         {user && (
//           <Box sx={{ display: "flex", gap: 2 }}>
//             <Button color="inherit" component={Link} to="/dashboard">
//               Dashboard
//             </Button>
//             {user.isAdmin && (
//               <Button color="inherit" component={Link} to="/admin">
//                 Admin Panel
//               </Button>
//             )}
//           </Box>
//         )}

//         {/* Right: Auth Buttons */}
//         <Box>
//           {user ? (
//             <Button color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>
//               Logout
//             </Button>
//           ) : (
//             <Button color="inherit" component={Link} to="/" sx={{ ml: 2 }}>
//               Login
//             </Button>
//           )}
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2", padding: "8px 0" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 3 }}>
        {/* Left: App Title */}
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Online Quiz System
        </Typography>

        {/* Middle: Navigation Links */}
        {user && (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button color="inherit" component={Link} to="/dashboard">
              Dashboard
            </Button>
            {user.isAdmin && (
              <Button color="inherit" component={Link} to="/admin">
                Admin Panel
              </Button>
            )}
          </Box>
        )}

        {/* Right: Auth Buttons */}
        <Box>
          {user ? (
            <Button color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/" sx={{ ml: 2 }}>
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

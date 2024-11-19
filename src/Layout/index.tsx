import { ReactNode } from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      sx={{
        backgroundColor: "#10141F",
        display: "flex",
        flexDirection: {
          xs: "column", // column on small screens (mobile)
          lg: "row",    // row on large screens (desktop)
        },
        color: "white",
        padding: 3,
        gap: 3,
        height: "100vh", // Full viewport height
      }}
    >
      {/* Sidebar component */}
      <Sidebar />
      
      {/* Main content area with scrollable content */}
      <Box
        sx={{
          width: "100%",  // Make sure the main area takes the full width
          overflowY: "auto", // Allow vertical scrolling for the content area
          padding: 2,  // Add padding for the content (optional)
        }}
      >
        {children}  {/* Render children passed to the Layout component */}
      </Box>
    </Box>
  );
};

export default Layout;

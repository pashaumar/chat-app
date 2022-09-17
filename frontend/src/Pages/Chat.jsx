import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/layout";
import Sidebar from "../components/Miscellaneous/Sidebar";
import MyChats from "../components/Chats/MyChats";
import ChatBox from "../components/Chats/ChatBox";

const Chat = () => {
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <Sidebar />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        p="10px"
        height="91.5vh"
      >
        {user && <MyChats />}

        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default Chat;

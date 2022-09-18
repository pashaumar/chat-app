import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SingleChat from "./SingleChat";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      display={{
        base: selectedChat ? "flex" : "none",
        md: "flex",
      }}
      w={{ base: "100%", md: "68%" }}
      borderWidth="1px"
      bg="white"
      borderRadius={"lg"}
      flexDir="column"
      p={2}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;

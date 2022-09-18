import { Box, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { ChatState } from "../../Context/ChatProvider";
import { getSender, getSenderFull } from "../../config/ChatLogic";
import ProfileModal from "../Miscellaneous/ProfileModal";
import UpdateGroupChatModal from "../Miscellaneous/UpdateGroupChatModal";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily={"Work sans"}
            display="flex"
            justifyContent={{ base: "space-between" }}
          >
            <IconButton
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
              display={{ base: "flex", md: "none" }}
            />
            {selectedChat.isGroupChat ? (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </>
            ) : (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            )}
          </Text>
          <Box
            display="flex"
            flexDir={"column"}
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius={"lg"}
            overflowY="hidden"
          ></Box>
        </>
      ) : (
        <Box
          h="100%"
          display="flex"
          alignItems={"center"}
          justifyContent="center"
          width="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;

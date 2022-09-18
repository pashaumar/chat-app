import React, { useState, useEffect } from "react";
import {
  useDisclosure,
  Button,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  useToast,
  FormControl,
  Input,
  Box,
} from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
import UserListItem from "../User/UserListItem";
import UserBadgeItem from "../User/UserBadgeItem";
import axios from "axios";

const GroupChatModel = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [chatName, setChatName] = useState("");
  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const { user, chats, setChats } = ChatState();

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(search);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  const handleSearch = async (search) => {
    if (!search) {
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (err) {
      setLoading(false);
      toast({
        title: "Error Occurred",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleSubmit = async () => {
    if (!chatName || !selectedUsers.length) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/chat/group",
        {
          name: chatName,
          users: JSON.stringify(selectedUsers.map((user) => user._id)),
        },
        config
      );

      setChats((prev) => [data, ...prev]);
      onClose();
      toast({
        title: "New Group Chat created",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    } catch (err) {
      toast({
        title: "Failed to create chat!",
        description: err.response.data,
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handleGroup = (userToAdd) => {
    if (
      selectedUsers.find((selectedUser) => selectedUser._id === userToAdd._id)
    ) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setSelectedUsers((prev) => [...prev, userToAdd]);
  };

  const handleDelete = (userId) => {
    setSelectedUsers((prev) => prev.filter((user) => user._id !== userId));
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display={"flex"}
            justifyContent="center"
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} alignItems="center" flexDir={"column"}>
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users eg: John, Jane"
                mb={1}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </FormControl>
            <Box display="flex" w="100%" flexWrap="wrap">
              {selectedUsers.map((user) => (
                <UserBadgeItem
                  key={user._id}
                  user={user}
                  handleClick={() => handleDelete(user._id)}
                />
              ))}
            </Box>
            {loading ? (
              <div>loading...</div>
            ) : (
              searchResult?.length > 0 &&
              searchResult
                ?.slice(0, 4)
                ?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleClick={() => handleGroup(user)}
                  />
                ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModel;

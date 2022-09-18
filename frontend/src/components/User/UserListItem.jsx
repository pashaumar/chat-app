import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";

const UserListItem = ({ handleClick, user }) => {
  return (
    <div style={{ width: "100%" }}>
      <Box
        onClick={handleClick}
        cursor="pointer"
        bg="#E8E8E8"
        _hover={{
          background: "#32B2AC",
          color: "white",
        }}
        w="100%"
        display="flex"
        alignItems={"center"}
        color="black"
        px={3}
        py={2}
        mb={2}
        borderRadius="lg"
      >
        <Avatar
          mr={2}
          size="sm"
          cursor="pointer"
          name={user.name}
          src={user.pic}
        />
        <Box>
          <Text>{user.name}</Text>
          <Text fontSize={"xs"}>
            <b>Email : </b>
            {user.email}
          </Text>
        </Box>
      </Box>
    </div>
  );
};

export default UserListItem;

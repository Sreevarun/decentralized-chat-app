// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Messenger {
    struct User {
        string name;
        string mail;
        bytes32 passwd;
    }

    struct Chat {
        string frnd;
        string message;
    }

    bool public isLoggedIn = false;
    string public loggedInUserName;
    string[] public usernames;
    mapping(string => User) public users;
    mapping(string => Chat[]) public chats;

    function createUser(
        string memory username,
        string memory email,
        string memory password
    ) public returns (User memory) {
        require(
            (users[username].passwd == ""),
            "User with username already found"
        );
        require(!isLoggedIn, "Logout from account");
        users[username] = User(
            username,
            email,
            keccak256(abi.encodePacked(password))
        );
        usernames.push(username);
        return users[username];
    }

    function loginUser(string memory username, string memory password)
        public
        returns (User memory)
    {
        require(
            (users[username].passwd != ""),
            "User with username not found"
        );
        require(!isLoggedIn, "Logout from account");
        require(
            keccak256(abi.encodePacked(password)) == users[username].passwd,
            "password/username wrong"
        );
        isLoggedIn =
            keccak256(abi.encodePacked(password)) == users[username].passwd;
        loggedInUserName = username;
        return users[username];
    }

    function logOut() public {
        require(isLoggedIn, "Login into account");
        isLoggedIn = false;
        loggedInUserName = "";
    }

    function sendMessage(string memory friend, string memory message) public {
        require(isLoggedIn, "please Login/signup to message");
        chats[loggedInUserName].push(Chat(friend, message));
        chats[friend].push(Chat(loggedInUserName, message));
    }

    function getAllMessages() public view returns (Chat[] memory) {
        return chats[loggedInUserName];
    }

    function getAllUsers() public view returns (string[] memory) {
        return usernames;
    }
}

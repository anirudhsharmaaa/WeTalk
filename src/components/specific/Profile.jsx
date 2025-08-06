import React from "react";
import { Avatar, Stack, Typography } from "@mui/material";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import moment from "moment";
import { transformImage } from "../../lib/features";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { color } from "framer-motion";

const Profile = ({ user }) => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        src={transformImage(user?.avatar?.url)}
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />
      <ProfileCard heading={"Bio"} text={user?.bio} />
      <ProfileCard
        heading={"Username"}
        text={user?.username}
        Icon={<UserNameIcon />}
      />
      <ProfileCard heading={"Name"} text={user?.name} Icon={<FaceIcon />} />
      <ProfileCard
        heading={"Joined"}
        text={moment(user?.createdAt).fromNow()}
        Icon={<CalendarIcon />}
      />
      <Stack
        spacing={1}
        width="100%"
        alignItems="center"
        justifyContent="center"
        sx={{ paddingTop: "2rem" }}
      >
      <hr style={{ width: "120%", borderTop: "1px solid white", marginBottom: "0.8rem" }} />
      <Typography
        sx={{
          color: "white",
          fontSize: "small",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          paddingLeft: "2rem",
       }}
      >
      developed by Anirudh Sharma
     <a
      href="https://www.linkedin.com/in/anirudhsharmaaa" // Replace with your LinkedIn profile
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "inherit", display: "flex" }}
    >
      <LinkedInIcon />
    </a>
  </Typography>
</Stack>

    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    direction={"row"}
    alignItems={"center"}
    spacing={"1rem"}
    color={"white"}
    textAlign={"center"}
  >
    {Icon && Icon}

    <Stack>
      <Typography variant="body1">{text}</Typography>
      <Typography color={"gray"} variant="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;
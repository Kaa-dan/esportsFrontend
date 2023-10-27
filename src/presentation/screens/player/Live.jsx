import { useEffect, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDeleteLiveMutation } from "../../../application/slice/player/playerApiSlice";
export default function Live() {
  const { user } = useSelector((state) => state.auth);
  const [deleteLiveApi] = useDeleteLiveMutation();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const roomId = queryParams.get("id");
  const role =
    user.role === "player"
      ? ZegoUIKitPrebuilt.Host
      : ZegoUIKitPrebuilt.Audience;

  const userLeaveHandler = (users) => {};

  const hostLeaveHandler = async () => {
    if (role == ZegoUIKitPrebuilt.Host) {
      await deleteLiveApi({ room_id: roomId });
      navigate("/go-live");
    } else {
      navigate("/live-corner");
    }
  };
  const joinRoomHandler = () => {
    // console.log("makriiii")
    // window.location.reload();
  };

  const myMeeting = async (element) => {
    const appID = Number(import.meta.env.VITE_API_ZEGOCLOUD_APPID);
    console.log(appID)
    const serverSecret = import.meta.env.VITE_API_ZEGOCLOUD_SERVER_SECRET;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      user._id,
      user.name
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      // showRemoveUserButton: roomId === user._id,
      turnOnMicrophoneWhenJoining:
        role == ZegoUIKitPrebuilt.Host ? true : false,
      turnOnCameraWhenJoining: role == ZegoUIKitPrebuilt.Host ? true : false,
      showMyCameraToggleButton: role == ZegoUIKitPrebuilt.Host ? true : false,
      showMyMicrophoneToggleButton:
        role == ZegoUIKitPrebuilt.Host ? true : false,
      showUserList: role == ZegoUIKitPrebuilt.Host ? true : false,
      showRemoveUserButton: role == ZegoUIKitPrebuilt.Host ? true : false,
      showScreenSharingButton: role == ZegoUIKitPrebuilt.Host ? true : false,
      showPreJoinView: false,
      showLayoutButton: false,
      showLeavingView: true,

      onLeaveRoom: () => {
        hostLeaveHandler();
      },
      onUserLeave: () => {
        userLeaveHandler();
      },
      onJoinRoom: () => {
        joinRoomHandler();
      },
      sharedLinks: [
        {
          name: "Personal link",
          url: `http://localhost4000/live/${user.id}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        config: {
          role: role,
          // liveStreamingMode: ZegoUIKitPrebuilt.LiveStreamingMode.LiveStreaming,
        },
      },
    });
  };
  useEffect(() => {
    myMeeting();
  });

  return (
    <>
      <div
        style={{
          height: "85vh",
          width: "80vw",
          marginTop: "75px",
          marginLeft: -23,
        }}
        ref={myMeeting}
      />
    </>
  );
}

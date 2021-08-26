import React, { useRef, useEffect } from "react";
import { Box } from "@chakra-ui/layout";
import { Center } from "@chakra-ui/react";

const MediaPlayer = (props) => {
    const container = useRef(null);
    useEffect(() => {
        var _a;
        if (!container.current)
            return;
        (_a = props.videoTrack) === null || _a === void 0 ? void 0 : _a.play(container.current);
        return () => {
            var _a;
            (_a = props.videoTrack) === null || _a === void 0 ? void 0 : _a.stop();
        };
    }, [container, props.videoTrack]);
    useEffect(() => {
        var _a;
        (_a = props.audioTrack) === null || _a === void 0 ? void 0 : _a.play();
        return () => {
            var _a;
            (_a = props.audioTrack) === null || _a === void 0 ? void 0 : _a.stop();
        };
    }, [props.audioTrack]);
    return(
       
           <Box ref={container} className="video-player" w={props.width ? props.width : "320px"} h={props.height ? props.height : "240px"} bg='raven_red' borderRadius="8px" alignSelf="center" margin="auto 0px"></Box>
      
    )
    return (React.createElement("div", { ref: container, className: "video-player", style: { width: "320px", height: "240px" } }));
};
export default MediaPlayer;
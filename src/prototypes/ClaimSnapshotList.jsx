import {useState, useRef} from 'react';
import { Box, Stack } from '@mui/material';
import ClaimSnapshot from './ClaimSnapshot.jsx';


function ClaimSnapshotList(props) {
    const {
        theme,
        payload,
        paperIndex,
        setPaperIndex,
    } = props;

    const parentRef = useRef(null);

    return (
        <div style={{
            padding: "20px",
            height: `calc(90vh + 40px)`,
            overflow: "auto",
        }} ref={parentRef}>
            <Stack spacing={2}>
                {payload['paper-titles'].map((subclaim, index) => {
                    return (
                        <Box key={"claim-snapshot" + index}>
                            <ClaimSnapshot
                                parentRef={parentRef}
                                theme={theme}
                                claim={subclaim}
                                isCurrent={index === paperIndex}
                                setPaperIndex={setPaperIndex}
                                index={index}
                            />
                        </Box>
                    );
                })}
            </Stack>
        </div>
    );
}

export default ClaimSnapshotList;
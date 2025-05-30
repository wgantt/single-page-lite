import { useState, useEffect } from 'react';
import { Tooltip, Box, Stack, Switch } from '@mui/material';
import { styled, Chip, Checkbox, Divider, FormControlLabel, Typography } from '@mui/material';
import Contrasting from './Contrasting';
import { EmphCard, NormalCard } from '../components/Card';
import { LabeledSlider } from '../components/Slider';
import { animated, useSpring } from '@react-spring/web';


function ClaimAnnotation(props) {
    const {
        theme,
        payload,
        relevance,
        setRelevance,
        sourceNotMakeSense,
        setSourceNotMakeSense,
        wrongDecontextualized,
        setWrongDecontextualized,
        paperIndex,
        setPaperIndex,
        notsure,
        setNotsure,
    } = props;

    // We'll only do the first, so that with the new
    // data format we'll do snippet selection for each
    // of the claim

    const [decontextualized, setDecontextualized] = useState(false);
    const [metadataDisplay, setMetadataDisplay] = useState(false);

    const [displayMetaSpring, apiDisplayMeta] = useSpring(() => ({
        maxHeight: metadataDisplay ? "500px" : "0px",
        paddingTop: metadataDisplay ? "20px" : "0px",
        paddingBottom: metadataDisplay ? "20px" : "0px",
        config: {
            duration: 100,
        },
    }));

    const evFormat = (num) => {
        return "R = " + num;
    }

    const evidential_markers = [
        {
            value: 0,
            label: <div className={"TopLabel"}>Fully Refuted</div>,
        },
        {
            value: 5000,
            label: <div className={"BottomLabel"}>Neither</div>,
        },
        {
            value: 10000,
            label: <div className={"TopLabel"}>Fully Supported</div>,
        },
    ];

    return (
        <Box>
            <EmphCard sx={{
                margin: "20px"
            }}>
                <Box>
                    <Box>
                        <Typography variant='prompt' component="span">
                            <i>How relevant is the paper to assessing the feasibility of the claim?</i>
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant='highlightPrompt'>
                            Claim:&nbsp;
                        </Typography>
                        <Typography variant='prompt' component="span">
                            {payload["claim"]}
                        </Typography>
                    </Box>
                    <Box sx={{
                        textAlign: "center",
                        alignItems: "center"
                    }}>
                        <LabeledSlider
                            setter={setRelevance}
                            value={relevance}
                            valueLabelFormat={evFormat}
                            scale={(v) => v}
                            sx={{
                                width: "80%",
                                '& .MuiSlider-markLabel': {
                                fontSize: "15px",
                                },
                            }}
                        />
                    </Box>
                </Box>
            </EmphCard>
            <NormalCard sx={{
                margin: "20px"
            }}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                }}>
                    {/* <Box sx={{
                        order: 1
                    }}>
                        <FormControlLabel label={<Chip label="D" />}
                            control={
                                <Switch
                                    checked={decontextualized}
                                    onChange={(e) => {
                                        setDecontextualized(e.target.checked);
                                    }}
                                />
                            }
                        />
                    </Box> */}
                    <Box sx={{
                        order: 2
                    }}>
                        <FormControlLabel label={<Chip label="More Info" />}
                            control={
                                <Switch
                                    checked={metadataDisplay}
                                    onChange={(e) => {
                                        setMetadataDisplay(e.target.checked);
                                        apiDisplayMeta.start({
                                            paddingTop: e.target.checked ? "20px" : "0px",
                                            paddingBottom: e.target.checked ? "20px" : "0px",
                                            maxHeight: e.target.checked ? "500px" : "0px",
                                        });
                                    }}
                                />
                            }
                        />
                    </Box>
                </Box>
                {/* <Box sx={{
                }}>
                    <FormControlLabel label={"Bad Source"}
                        control={
                            <Checkbox checked={sourceNotMakeSense}
                                onChange={(e) => setSourceNotMakeSense(e.target.checked)}
                                />
                        }
                    />
                    <FormControlLabel label={"Bad Decontextualization"}
                        control={
                            <Checkbox checked={wrongDecontextualized}
                                onChange={(e) => setWrongDecontextualized(e.target.checked)}
                            />
                        }
                    />
                    <FormControlLabel label={"I'm Uncertain"}
                        control={
                            <Checkbox checked={notsure}
                                onChange={(e) => setNotsure(e.target.checked)}
                            />
                        }
                    />

                </Box> */}
              <Box sx={{
                }}>
                    <Typography variant='highlightPrompt' component="span">
                        Title:&nbsp;
                    </Typography>
                    <Typography variant='prompt' component="span">
                        <a href={payload['paper-links'][paperIndex]} target="_blank">{payload['paper-titles'][paperIndex]}</a>
                    </Typography>
                        {/* <Box>
                            <Typography variant='highlightPrompt' component='span'>
                                Link:&nbsp;
                            </Typography>
                            <Typography variant='prompt' component='span'>
                                {payload["paper-links"][paperIndex]}
                            </Typography>
                        </Box> */}
                        <Box>
                            <Typography variant='highlightPrompt' component='span'>
                                Abstract:&nbsp;
                            </Typography>
                            <Typography variant='prompt' component="span">
                                {payload["paper-abstracts"][paperIndex]}
                            </Typography>
                        </Box>
                </Box>
                <Divider sx={{
                    margin: "10px",
                    display: metadataDisplay ? "block" : "none",
                }}/>
                 <animated.div style={{
                    backgroundColor: theme.palette['card-bg-emph'].main,
                    borderRadius: "10px",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    overflow: metadataDisplay ? "auto" : "hidden",
                    ...displayMetaSpring
                }}>
                    <Stack direction="column" spacing={1}>
                       <Box>
                            <Typography variant='highlightPrompt' component="span">
                                Introduction:&nbsp;
                            </Typography>
                            <Typography variant='prompt' component="span">
                                {payload["paper-intro-texts"][paperIndex]}
                            </Typography>
                       </Box>
                    </Stack>
                </animated.div>
 
            </NormalCard>
        </Box>
    );
}

export default ClaimAnnotation;
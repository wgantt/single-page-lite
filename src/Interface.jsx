import { useState, useEffect } from 'react';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
// import CssBaseline from '@mui/material/CssBaseline';
// import Divider from '@mui/material/Divider';
// import Typography from '@mui/material/Typography';
import { Button, Box, Checkbox, CssBaseline, Divider, FormControlLabel, TextField, Typography } from '@mui/material';
import { AppBar, Grid, Toolbar } from '@mui/material';
import { EmphCard } from './components/Card';
// import SentenceSelection from './prototypes/SentenceSelection';
import ClaimAnnotation from './prototypes/ClaimAnnotation';
import ClaimSnapshotList from './prototypes/ClaimSnapshotList';
import { LabeledSlider } from './components/Slider';


function Interface(props) {

    const {
        theme,
        payload,
    } = props;

    const [cantAssessClaim, setcantAssessClaim] = useState(false);

    const [wrongDecontextualized, setWrongDecontextualized] = useState(
        new Array(payload['paper-titles'].length).fill(false)
    );
    // const [highlightThreshold, setHighlightThreshold] = useState(0.5);
    const [notsure, setNotsure] = useState(
        new Array(payload['paper-titles'].length).fill(false)
    );
    const [relevance, setRelevance] = useState(
        new Array(payload['paper-titles'].length).fill(0)
    );

    const [feasibility, setFeasibility] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    const setIndexFactory = (setter, old_value, index) => {
        return (value) => {
            const new_value = [...old_value];
            new_value[index] = value;
            setter(new_value);
        }
    };

    const feasibilityFormat = (num) => {
        return "F = " + num;
    }

    const feasibilityMarkers = [
        {
          value: -2,
          label: <div className={"BottomLabel"}>Completely Infeasible</div>,
        },
        {
          value: -1,
          label: <div className={"TopLabel"}>Somewhat Infeasible</div>,
        },
        {
          value: 0,
          label: <div className={"BottomLabel"}>No Evidence</div>,
        },
        {
          value: 1,
          label: <div className={"TopLabel"}>Somewhat Feasible</div>,
        },
        {
          value: 2,
          label: <div className={"BottomLabel"}>Completely Feasible</div>
        }
      ];
    return (
        <Grid container spacing={1}>
            <Grid item xs={2}>
                <ClaimSnapshotList
                    theme={theme}
                    payload={payload}
                    paperIndex={currentIndex}
                    setPaperIndex={setCurrentIndex}
                >
                </ClaimSnapshotList>
            </Grid>
            <Grid item xs={6}>
                <input type='hidden' name='relevance' value={relevance} />
                <input type='hidden' name='cantAssessClaim' value={cantAssessClaim} />
                <input type='hidden' name='feasibility' value={feasibility} />
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}>
                    <Box sx={{
                        maxHeight: `calc(90vh + 60px)`,
                        overflow: "auto",
                        order: 1,
                    }}>
                        <ClaimAnnotation 
                            theme={theme}
                            payload={payload}
                            relevance={relevance[currentIndex]}
                            setRelevance={setIndexFactory(setRelevance, relevance, currentIndex)}
                            feasibility={feasibility}
                            setFeasibility={setFeasibility}
                            wrongDecontextualized={wrongDecontextualized[currentIndex]}
                            setWrongDecontextualized={setIndexFactory(setWrongDecontextualized, wrongDecontextualized, currentIndex)}
                            notsure={notsure[currentIndex]}
                            setNotsure={setIndexFactory(setNotsure, notsure, currentIndex)}
                            paperIndex={currentIndex}
                            setPaperIndex={setCurrentIndex}
                        />
                        <Box sx={{
                            width: "100%",
                            padding: "20px",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            flexWrap: "wrap",
                        }}>
                            <Box sx={{
                                order: 1
                            }}>
                                <Button variant="contained" color="primary" disabled={
                                    currentIndex == 0
                                } onClick={() => {
                                    if (currentIndex > 0) {
                                        setCurrentIndex(currentIndex - 1);
                                    }
                                }}>
                                    {<Typography color={theme.palette.white.main}>PREV</Typography>}
                                </Button>
                            </Box>
                            <Box sx={{
                                order: 2
                            }}>
                                <Button type="submit" variant="contained" color="primary">
                                    {<Typography color={theme.palette.white.main}>Submit</Typography>}
                                </Button>
                            </Box>
                            <Box sx={{
                                order: 3
                            }}>
                                <Button variant="contained" color="primary" disabled={
                                    currentIndex == payload['paper-titles'].length - 1
                                } onClick={() => {
                                    if (currentIndex < payload['paper-titles'].length - 1) {
                                        setCurrentIndex(currentIndex + 1);
                                    }
                                }}>
                                    {<Typography color={theme.palette.white.main}>NEXT</Typography>}
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{
                        paddingTop: "20px",
                        order: 2,
                    }}>
                        <Divider orientation="vertical" sx={{
                            height: `calc(90vh + 40px)`,
                        }} />
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={4}>
                <EmphCard sx={{
                    margin: "10px"
                }}>
                    <Box>
                        <Box>
                            <Typography variant='prompt' component="span">
                                How <b>feasible</b> does the claim seem to you?
                            </Typography>
                        </Box>
                        <Box sx={{
                            textAlign: "center",
                            alignItems: "center"
                        }}>
                            <LabeledSlider
                                setter={setFeasibility}
                                value={feasibility}
                                valueLabelFormat={feasibilityFormat}
                                min={-2}
                                max={2}
                                marks={feasibilityMarkers}
                                scale={(v) => v}
                                sx={{
                                    width: "80%",
                                    '& .MuiSlider-markLabel': {
                                    fontSize: "15px",
                                    },
                                }}
                            />
                        </Box>
                        <Box sx={{
                        }}>
                            <FormControlLabel label="I can't assess this claim"
                                control={
                                    <Checkbox checked={cantAssessClaim}
                                        onChange={(e) => setcantAssessClaim(e.target.checked)}
                                        />
                                }
                            />
                        </Box>
                    </Box>
                </EmphCard>
                <TextField id="missing-info" name="missingInfo" variant="outlined" helperText="Use a bulletted ('-') list to describe any info essential for assessing the claim that is missing from the papers" placeholder="- item 1&#13;&#10;- item 2&#13;&#10;- ..." fullWidth multiline minRows={3}/>
           </Grid>
       </Grid>
    );

}

export default Interface;
import { useState, useEffect } from 'react';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
// import CssBaseline from '@mui/material/CssBaseline';
// import Divider from '@mui/material/Divider';
// import Typography from '@mui/material/Typography';
import { Button, Box, CssBaseline, Divider, TextField, Typography } from '@mui/material';
import { AppBar, Grid, Toolbar } from '@mui/material';
import { NormalCard } from './components/Card';
// import SentenceSelection from './prototypes/SentenceSelection';
import ClaimAnnotation from './prototypes/ClaimAnnotation';
import ClaimSnapshotList from './prototypes/ClaimSnapshotList';


function Interface(props) {

    const {
        theme,
        payload,
    } = props;

    const [sourceNotMakeSense, setSourceNotMakeSense] = useState(false);
    // const [sentSelectIndices, setSentSelectIndices] = useState(
    //     new Array(payload['paper-titles'].length).fill(null).map(
    //         () => new Array(payload['source-text'].length).fill(false)
    //     )
    // );
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
    const [currentIndex, setCurrentIndex] = useState(0);

    const setIndexFactory = (setter, old_value, index) => {
        return (value) => {
            const new_value = [...old_value];
            new_value[index] = value;
            setter(new_value);
        }
    };

    // useEffect(() => {
    //     setSentSelectIndices(
    //         new Array(payload['paper-titles'].length).fill(null).map(
    //             () => new Array(payload['source-text'].length).fill(false)
    //         )
    //     );
    //     setWrongDecontextualized(
    //         new Array(payload['paper-titles'].length).fill(false)
    //     );
    // }, [payload]);

    return (
        <Grid container spacing={1}>
            {/* <Grid item xs={4}>
                <SentenceSelection
                    sentSelectIndices={sentSelectIndices[currentIndex]}
                    setSentSelectIndices={setIndexFactory(setSentSelectIndices, sentSelectIndices, currentIndex)}
                    // highlighting={payload['highlighted-weights']}
                    // threshold={highlightThreshold}
                    payload={payload}
                    theme={theme}
                />
                <input type="hidden" name="sentSelectIndices" value={JSON.stringify(sentSelectIndices)} />
                <input type="hidden" name="sourceNotMakeSense" value={sourceNotMakeSense} />
                <input type="hidden" name="wrongDecontextualized" value={wrongDecontextualized} />
                <input type='hidden' name='notsure' value={notsure} />
            </Grid> */}
            <Grid item xs={2}>
                <ClaimSnapshotList
                    theme={theme}
                    payload={payload}
                    paperIndex={currentIndex}
                    setPaperIndex={setCurrentIndex}
                >
                </ClaimSnapshotList>
            </Grid>
            <Grid item xs={8}>
                <input type='hidden' name='relevance' value={relevance} />
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
                            sourceNotMakeSense={sourceNotMakeSense}
                            setSourceNotMakeSense={setSourceNotMakeSense}
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
            <Grid item xs={2}>
                <TextField id="missing-info" name="missing info" variant="outlined" helperText="Use a bulletted ('-') list to describe any info essential for assessing the claim that is missing from the papers" placeholder="- item 1&#13;&#10;- item 2&#13;&#10;- ..." fullWidth multiline minRows={3}/>
           </Grid>
       </Grid>
    );

}

export default Interface;
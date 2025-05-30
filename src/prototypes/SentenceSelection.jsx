import { NormalCard } from '../components/Card';
import SentenceElement from './SentenceElement';
import { Box, Button, IconButton, Snackbar } from '@mui/material';

function SentenceSelection(props) {

    const {
        sentSelectIndices,
        setSentSelectIndices,
        payload,
        theme,
    } = props;

    const getSetForIndex = (index) => {
        const setForIndex = (value) => {
            const newIndices = [...sentSelectIndices];
            newIndices[index] = value;
            setSentSelectIndices(newIndices);
        }

        return setForIndex;
    }
    const [snackOpen, setSnackOpen] = React.useState(false);
    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={() => setSnackOpen(false)}>
                DISMISS
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={(event, reason) => setSnackOpen(false)}
            >
                {/* <CloseIcon fontSize="small" /> */}
                X
            </IconButton>
            </React.Fragment>
      );


    return (
        <NormalCard sx={{
            margin: "20px",
        }}>
            <Snackbar
                open={snackOpen}
                autoHideDuration={6000}
                message={"You can only select 3 sentences."}
                onClose={(event, reason) => {}}
                action={action}
            />
            <Box sx={{
                maxHeight: "90vh",
                overflow: "auto",
            }}>
                {payload['source-text'].map((sentence, index) => {
                    return (<SentenceElement 
                        sentence={sentence}
                        index={index}
                        key={"sentence-" + index}
                        setSentSelect={getSetForIndex(index)}
                        sentSelect={sentSelectIndices[index]}
                        disableFurtherSelection={sentSelectIndices.filter((value) => value).length >= 3}
                        setSnackOpen={setSnackOpen}
                        theme={theme}
                    />);
                })}
            </Box>
        </NormalCard>
    )
}

export default SentenceSelection;
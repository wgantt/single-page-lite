
import { useState, useEffect } from 'react';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import { lightPalette } from './components/theme';
import Interface from './Interface';
import { EmphCard } from './components/Card';
import { useSpring, animated } from '@react-spring/web';


const lightTheme = createTheme({
        ...lightPalette,
        typography: {
        prevRead: {
            fontWeight: 'normal',
            color: "lightgrey",
            lineHeight: 2.0,
        },
        reading: {
            fontWeight: 'bold',
            color: lightPalette.palette.black.main,
            lineHeight: 2.0,
        },
        prompt: {
            color: lightPalette.palette.black.main,
            lineHeight: 2.0,
        },
        italicPrompt: {
            color: lightPalette.palette.black.main,
            lineHeight: 2.0,
            fontStyle: 'italic',
            textDecoration: 'underline',
        },
        highlightPrompt: {
            color: lightPalette.palette.black.main,
            lineHeight: 2.0,
            fontWeight: 'bold',
        },
        question: {
            fontWeight: 'bold',
            color: lightPalette.palette.black.main,
            lineHeight: 2.0,
        },
        answer: {
            fontWeight: 'bold',
            color: lightPalette.palette.black.main,
            lineHeight: 2.0,
        },
        progress: {
            fontSize: 12,
        },
        buttonText: {
            color: lightPalette.palette.white.main,
        }
    }
});


const App = () => {
    const theme = lightTheme;
    // const payloads = {
    //     "claim-id": "unique-claim-id",
    //     "claim": "A bold scientific claim!",
    //     "paper-titles": ["First Paper", "Second Paper", "Third Paper"],
    //     "paper-links": ["https://www.nytimes.com", "https://www.cnn.com", "https://www.bbc.com"],
    //     "paper-abstracts": [
    //         "Abstract for First Paper",
    //         "Abstract for Second Paper",
    //         "Abstract for Third Paper"
    //     ],
    //     "paper-intro-texts": ["Introduction section for First Paper", "Introduction section for Second Paper", "Introduction section for Third Paper"],
    //     "source-text": ["Search\nImages\nMaps\nPlay\nYouTube\nNews\nGmail\nDrive\nMore\n\u00bb\nSign in\nBooks\nTry the new Google Books\nCheck out the new look and enjoy easier access to your favorite features\nTry it now\nNo thanks\nTry the new Google Books\nTry the new Google Books\nMy library\nHelp\nAdvanced Book Search\nBuy eBook - $14.74\nGet this book in print\nAmazon.com\nBarnes&Noble.com\nBooks-A-Million\nIndieBound\nFind in a library\nAll sellers\n\u00bb\nThe Vanished Imam: Musa al Sadr and the Shia of Lebanon\nBy Fouad Ajami\nAbout this book\nTerms of Service\nPages displayed by permission of\nCornell University Press\n.", "Copyright\n.", "Pages\nRestricted Page\nYou have reached your viewing limit for this book (\nwhy?", ")."],
    // };

    const [payloads, setPayloads] = useState(null);

    useEffect(() => {
      setPayloads(
        JSON.parse(document.getElementById("payload-read").textContent)
      );
    }, []); 

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {payloads && <Interface payload={payloads} theme={theme} />}
        </ThemeProvider>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
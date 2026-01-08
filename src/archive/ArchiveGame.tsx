import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Puzzle from "../components/Puzzle";

const ArchiveGame = () => {
    const { puzzleNumber } = useParams();
    const number = puzzleNumber ? parseInt(puzzleNumber, 10) : 0;

    useEffect(() => {
        const setVh = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        window.addEventListener('load', setVh);
        setTimeout(setVh, 100);
        setVh();

        let resizeTimeout: number;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = window.setTimeout(setVh, 150);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('load', setVh);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            <div className="app">
                <Puzzle puzzleNumber={number} />
            </div>
        </div>
    );
};

export default ArchiveGame;
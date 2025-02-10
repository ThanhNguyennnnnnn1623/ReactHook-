import { useState, useEffect } from "react";


const CountDown = (props) => {
    const [count, setCount] = useState(10);
    

    useEffect(() => {
        if (props.submitFinish) {
            return;
        }
        if (count === 0) {
            props.onTimeUp();
            return;
        }
        const timer = setInterval(() => {
            setCount(count - 1);
        }, 1000);

        // giai doan cleanup
        // Sau khi cac cau lenh phia tren chay xong
        // truoc khi toi lan render tiep theo ta co can lam gi khong
        // timer1 -> do something -> timer2 -> do something -> timer3 
        return () => {
            clearInterval(timer);
        }
        // setTimeout(() => {
        //     clearInterval(timer);
        // }, 1000);
    }, [count]);

    const toHHMMSS = (secs) => {
        const sec_num = parseInt(secs, 10)
        const hours = Math.floor(sec_num / 3600)
        const minutes = Math.floor(sec_num / 60) % 60
        const seconds = sec_num % 60

        return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v, i) => v !== "00" || i > 0)
            .join(":")
    }

    return (
        <div className="countdown-container">
            {toHHMMSS(count)}
        </div>
    )
}
export default CountDown;
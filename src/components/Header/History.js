import { useEffect, useState } from "react";
import { getHistory } from "../../Service/apiService";



const History = (props) => {

    const [dataHistory, setDataHistory] = useState([]);

    useEffect(() => {
        fetchHistory()
    }, []);

    console.log('dataHistory', dataHistory);

    const fetchHistory = async () => {
        let data = await getHistory();
        if (data && data.EC === 0) {
            data.DT.data.sort((a, b) => a - b).reverse()
            setDataHistory(data.DT.data);
        }
    };

    const formatter = new Intl.DateTimeFormat('en-GB', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: 'numeric', minute: '2-digit', second: '2-digit',
        hourCycle: 'h12',
    });

    // const sortDescending = () => {
    //     const sortDescDataHistory = [...dataHistory]
    //     sortDescDataHistory.sort((a, b) => a - b).reverse()
    //     setDataHistory(sortDescDataHistory)
    // }

    return (
        <div>
            <h1>History</h1>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Quiz Name</th>
                        <th>Total Question</th>
                        <th>Total Correct</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataHistory && dataHistory.length > 0
                            ?
                            dataHistory.map((item, index) => {
                                return (
                                        <tr key={`history-${index}`}>
                                            <td>{item.id}</td>
                                            <td>{item.quizHistory.name}</td>
                                            <td>{item.total_questions}</td>
                                            <td>{item.total_correct}</td>
                                            <td>{formatter.format(new Date(item.createdAt))}</td>
                                        </tr>
                                )
                            })
                            :
                            <tr>
                                <td colSpan="5">No data</td>
                            </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export default History;
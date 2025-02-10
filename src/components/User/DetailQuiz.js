import { useEffect, useState } from "react";
import { useParams, useLocation, NavLink } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../Service/apiService";
import _ from 'lodash';
import './DetailQuiz.scss';
import Question from "./Question";
import ModalResult from "./ModalResult";
import RightContent from "./Content/RightContent";
import Breadcrumb from 'react-bootstrap/Breadcrumb';


const DetailQuiz = (props) => {
    const params = useParams();
    const location = useLocation();
    const quizId = params.id;

    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);

    const [isShowModalResult, setIsShowModalResult] = useState(false);
    const [dataModalResult, setDataModalResult] = useState({});

    const [submitFinish, setSubmitFinish] = useState(false);
    const [isShowAnswer, setIsShowAnswer] = useState(false);


    useEffect(() => {
        fetchQuestions();
    }, [quizId])

    const fetchQuestions = async () => {
        const res = await getDataQuiz(quizId);
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                .groupBy('id')
                .map((value, key) => {

                    let answers = [];
                    let questionDescription, image = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        item.answers.isSelected = false;
                        item.answers.isCorrect = false;
                        answers.push(item.answers)
                    })
                    answers = _.orderBy(answers, ['id'], ['asc']);
                    return {
                        questionId: key,
                        questionDescription,
                        image,
                        answers
                    }
                })
                .value();
            setDataQuiz(data);
        }
    }

    const handlePrev = () => {
        if (index - 1 < 0) {
            return;
        }
        setIndex(index - 1)
    }

    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1) {
            setIndex(index + 1)
        }
    }

    const handleCheckBox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(item => +item.questionId === +questionId);
        if (question && question.answers) {
            question.answers = question.answers.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            })
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId);
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }

    }

    const handleFinishQuiz = async () => {
        let payload = {
            quizId: +quizId,
            answers: []
        };
        let answers = [];

        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(question => {
                let questionId = question.questionId;
                let userAnswerId = [];

                question.answers.forEach(a => {
                    if (a.isSelected) {
                        userAnswerId.push(a.id)
                    }
                })

                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })
        }
        payload.answers = answers;
        //submit api
        let res = await postSubmitQuiz(payload);
        console.log('>>> check res submit quiz: ', res)
        if (res && res.EC === 0) {
            setSubmitFinish(true);
            
            setDataModalResult({
                countCorrect: res.DT.countCorrect,
                countTotal: res.DT.countTotal,
                quizData: res.DT.quizData
            })
            setIsShowModalResult(true);

            if (res.DT && res.DT.quizData.length > 0) {
                let dataQuizClone = _.cloneDeep(dataQuiz);
                let a = res.DT.quizData;
                for (let q of a) {
                    for (let i = 0; i < dataQuizClone.length; i++) {
                        if (+dataQuizClone[i].questionId === +q.questionId) {
                            let newAnswers = [];
                            for (let j = 0; j < dataQuizClone[i].answers.length; j++) {
                                let s = q.systemAnswers.find(item => +item.id === +dataQuizClone[i].answers[j].id);
                                if (s) {
                                    dataQuizClone[i].answers[j].isCorrect = true;
                                }
                                newAnswers.push(dataQuizClone[i].answers[j]);
                            }
                            dataQuizClone[i].answers = newAnswers;
                        }
                    }
                }
                setDataQuiz(dataQuizClone);
            }
        }
        else {
            alert('somethings wrongs...')
        }
    }

    console.log("dataQuiz ", dataQuiz);
    console.log("dataModalResult ", dataModalResult);



    return (
        <>
            <Breadcrumb className="quiz-detail-new-header">
                <Breadcrumb.Item>
                    <NavLink to="/">Home</NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item >
                    <NavLink to="/users">Users</NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Detail Quiz</Breadcrumb.Item>
            </Breadcrumb>
            <div className="detail-quiz-container">
                <div className="left-content">
                    <div className="title">
                        Quiz {quizId}: {location?.state?.quizTitle}
                    </div>
                    <hr />
                    <div className="q-body">
                        <img />
                    </div>
                    <div className="q-content">
                        <Question
                            index={index}
                            handleCheckBox={handleCheckBox}
                            isShowAnswer={isShowAnswer}
                            submitFinish={submitFinish}
                            data={
                                dataQuiz && dataQuiz.length > 0
                                    ?
                                    dataQuiz[index]
                                    :
                                    []
                            }
                        />
                    </div>
                    <div className="footer">
                        <button className="btn btn-secondary"
                            onClick={() => handlePrev()}
                        >Prev</button>
                        <button className="btn btn-primary"
                            onClick={() => handleNext()}
                        >Next</button>
                        <button className="btn btn-success"
                            onClick={() => handleFinishQuiz()}
                            disabled={submitFinish}
                        >Finish</button>
                    </div>
                </div>
                <div className="right-content">
                    <RightContent
                        dataQuiz={dataQuiz}
                        handleFinishQuiz={handleFinishQuiz}
                        setIndex={setIndex}
                        submitFinish={submitFinish}
                    />
                </div>
                <ModalResult
                    show={isShowModalResult}
                    setShow={setIsShowModalResult}
                    dataModalResult={dataModalResult}
                    setIsShowAnswer={setIsShowAnswer}
                />
            </div>
        </>
    )
}
export default DetailQuiz;
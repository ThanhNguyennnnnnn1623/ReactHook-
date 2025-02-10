import _ from 'lodash';
import { useState } from 'react';
import Lightbox from "react-awesome-lightbox";
import { FaCheck } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

const Question = (props) => {
    const { data, index } = props;

    const [isPreviewImage, setIsPreviewImage] = useState(false);

    if (_.isEmpty(data)) {
        return (
            <></>
        )
    }

    const handleHandleCheckBox = (event, aId, qId) => {
        props.handleCheckBox(aId, qId)
    }
    return (
        <>
            {
                data.image ?
                    <div className='q-image'>
                        <img
                            style={{ cursor: 'pointer' }}
                            src={`data:image/jpeg;base64,${data.image}`}
                            onClick={() => setIsPreviewImage(true)}
                        />
                        {
                            isPreviewImage === true &&
                            <Lightbox
                                image={`data:image/jpeg;base64,${data.image}`}
                                title={"Question Image"}
                                onClose={() => setIsPreviewImage(false)}
                            ></Lightbox>
                        }
                    </div>
                    :
                    <div className='q-image'>

                    </div>
            }
            <div className="question">Question {index + 1}: {data.questionDescription}?</div>
            <div className="answer">
                {data.answers && data.answers.length > 0 &&
                    data.answers.map((a, index) => {
                        return (
                            <div key={`answer-${index}`} className="a-child">
                                <div className="form-check" >
                                    <input className="form-check-input"
                                        type="checkbox"
                                        checked={a.isSelected}
                                        onChange={(event) => handleHandleCheckBox(event, a.id, data.questionId)}
                                        disabled={props.submitFinish}
                                    />
                                    <label className="form-check-label" >
                                        {a.description}
                                    </label>
                                    {props.isShowAnswer === true &&
                                        <>
                                            {a.isSelected === true && a.isCorrect === false
                                                && <IoIosClose style={{ color: 'red', fontSize: '32px' }} />}
                                            {
                                                a.isCorrect === true
                                                && <FaCheck style={{ color: 'green' }} />
                                            }
                                        </>
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
export default Question;
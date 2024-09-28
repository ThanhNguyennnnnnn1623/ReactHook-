import { useState } from 'react';
import Select from 'react-select';
import './Questions.scss';
import { FiPlusCircle } from "react-icons/fi";
import { FiMinusCircle } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { RiImageAddLine } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';

const Questions = (props) => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [selectedQuiz, setSelectedQuiz] = useState([]);

    const [questions, setQuestion] = useState(
        [
            {
                id: uuidv4(),
                description: 'questions 1',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: 'answer 1',
                        isCorrect: false
                    },
                    {
                        id: uuidv4(),
                        description: 'answer2',
                        isCorrect: false
                    },
                ]
            },
            {
                id: uuidv4(),
                description: 'question 2',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: 'answer 1',
                        isCorrect: false
                    },
                    {
                        id: uuidv4(),
                        description: 'answer 2',
                        isCorrect: false
                    },
                ]
            }
        ]
    )

    return (
        <div className="questions-container">
            <div className="title">
                Manage Questions
            </div>
            <div className="add-new-questions">
                <div className='col-6 form-group'>
                    <label className='mb-2'>Selected Quiz</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                    />
                </div>
                <div className='mt-3 mb-2'>
                    Add Questions:
                </div>
                {
                    questions && questions.length > 0 &&
                    questions.map((questions, index) => {
                        return (
                            <div key={questions.id} className='q-main mb-4'>
                                <div className='questions-content'>
                                    <div className="form-floating description">
                                        <input type="text" className="form-control" placeholder="name@example.com" />
                                        <label>Questions {index + 1}'s description</label>
                                    </div>
                                    <div className='group-upload'>
                                        <label id=''><RiImageAddLine className='label-up' /></label>
                                        <input type='file' hidden />
                                        <span>0 file is uploaded</span>
                                    </div>
                                    <div className='btn-add'>
                                        <span>
                                            <FiPlusCircle className='icon-add' />
                                        </span>
                                        <span>
                                            <FiMinusCircle className='icon-remove' />
                                        </span>
                                    </div>
                                </div>
                                <div className='answer-content'>
                                    <input
                                        className='form-check-input isCorrect'
                                        type='checkbox'
                                    />
                                    <div className="form-floating answer-name">
                                        <input type="text" className="form-control" placeholder="name@example.com" />
                                        <label>Answer 1</label>
                                    </div>
                                    <div className='btn-group'>
                                        <span>
                                            <FaPlus className='icon-add' />
                                        </span>
                                        <span>
                                            <FaMinus className='icon-remove' />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}
export default Questions
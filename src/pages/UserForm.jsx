import { useEffect, useState } from 'react'
import { questions, calculate_risk_score, calculate_risk_category } from '../data/questions'
import { Link, useNavigate } from 'react-router-dom'


export default function UserForm() {

    const navigate = useNavigate()

    const [answers, setAnswers] = useState({
        1: 1,
        2: 1,
        3: 1,
        4: 1,
        5: 1,
        6: 1,
        7: 1,
        8: 1,
        9: 1,
        10: 1
    })

    const [risk_score, setRiskScore] = useState({
        risk_score: 0,
        risk_category: ""
    })


    useEffect(() => {
        const risk_score = calculate_risk_score(answers)
        const risk_category = calculate_risk_category(risk_score)
        setRiskScore({ risk_score: risk_score, risk_category: risk_category })
    }, [])

    function handleSubmit(e) {
        setAnswers({ ...answers, [e.target.name]: parseInt(e.target.value) })
        const risk_score = calculate_risk_score(answers)
        const risk_category = calculate_risk_category(risk_score)
        setRiskScore({ risk_score: risk_score, risk_category: risk_category })
    }

    const optimizePage = () => {
        localStorage.setItem('risk_score', JSON.stringify(risk_score))
        navigate('/optimize')
    }


    return (
        <>
            <div className='px-2 my-4'>
                <div className='px-4'>

                    <h1 className="text-3xl font-bold mb-4">Investment Risk Assessment</h1>
                    <p className="text-lg mb-4">Please answer the following questions to assess your risk tolerance.</p>
                </div>
                <div className='p-4'>
                    {
                        Object.keys(questions).map((index) => {
                            return (
                                <div key={index} className="mb-4 bg-base-300 p-4 rounded">
                                    <h2 className="text-lg font-bold mb-2">{questions[index]["question"]}</h2>
                                    <div className=''>
                                        {
                                            questions[index]["options"].map((option, option_index) => {
                                                return (
                                                    <div key={option_index} className="mb-2">
                                                        <input type="radio" id={`${index}_${option_index}`} name={index} value={option_index + 1} checked={answers[index] == option_index + 1}
                                                            onChange={handleSubmit}
                                                        />
                                                        <label htmlFor={`${index}_${option_index}`} className="ml-2">{option}</label>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }


                    <div className="mt-4">
                        <h2 className="text-xl font-bold mb-2">Risk Score</h2>
                        <p className="mb-2">Your risk score is: {risk_score.risk_score}</p>
                        <p>Your risk category is: {risk_score.risk_category}</p>
                    </div>


                </div>


                <button to="/optimize" className="my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3 " onClick={optimizePage}>Next ></button>
            </div>
        </>
    )
}
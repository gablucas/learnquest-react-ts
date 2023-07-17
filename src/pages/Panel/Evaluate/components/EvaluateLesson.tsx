import React from 'react';
import Styles from '../../Panel.module.css';
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from '../../../../GlobalContext';
import { LessonStudent } from '../../../../types/Lessons';
import useData from '../../../../hooks/useData';

const EvaluateLesson = () => {
  const { data } = React.useContext(GlobalContext);
  const { id } = useParams();
  const { evaluateLesson } = useData();
  const [teste, setTeste] = React.useState<LessonStudent>();
  const navigate = useNavigate();

  const lessonToEvaluate = data.evaluate.find((lesson) => lesson.evaluateID === id);
  const lessonInfo = data.lessons.find((lesson) => lesson.id === lessonToEvaluate?.id);
  const userInfo =  data.users.find((user) => user.id === lessonToEvaluate?.student);
  
  React.useEffect(() => {
    if (lessonToEvaluate) {
      setTeste({id: lessonToEvaluate.id, answers: [...lessonToEvaluate.answers]})
    }
  }, [lessonToEvaluate])


  function handleEvaluate(index: number, isCorrect: boolean): void {

    if (teste && lessonInfo) {
      setTeste({...teste, answers: teste.answers.map((answer, indexMap) => {
        if (indexMap === index) {
          return {...answer, isCorrect, xp: isCorrect ? lessonInfo.questions[index].xp : 0}
        }

        return answer;
      })})
    }
  }
  
  function handleDoneEvaluate(): void {
    if (teste?.answers.every((answer) => answer.isCorrect !== undefined) && userInfo && id) {
      evaluateLesson(userInfo.id, id, teste);
      navigate('/painel/avaliar');
    }
  }


  if (lessonToEvaluate && lessonInfo && userInfo)
  return (
    <div className={Styles.evaluatelesson}>
      <h1>{lessonInfo.title}</h1>
      <h2>Avaliação feita por: {userInfo?.name} - {data.groups.find((group) => group.students.some((student) => student === userInfo.id))?.name}</h2>

      <div>
        {lessonInfo.questions.map((question, index) => (
          <div key={question.id} className={`${Styles.question_wrapper} ${teste?.answers[index].isCorrect === true ? Styles.correct : teste?.answers[index].isCorrect === false ? Styles.wrong : ' '}`}>

            <div>
              <span>Questão {index + 1}</span>
              <span>{question.question}</span>
            </div>

            <div>
              <span>Reposta do aluno</span>
              <span>{lessonToEvaluate.answers[index].value}</span>
            </div>

            <div>
              <span>Sua resposta</span>
              <span>{question.answer}</span>
            </div>

            <div className={Styles.buttons}>
              <button onClick={() => handleEvaluate(index, true)}>Correto</button>
              <button onClick={() => handleEvaluate(index, false)}>Errado</button>
            </div>
          </div>
        ))}
      </div>

      <button className={Styles.btn_donevaluate} onClick={handleDoneEvaluate}>Finalizar avaliação</button>

    </div>
  )
}

export default EvaluateLesson;
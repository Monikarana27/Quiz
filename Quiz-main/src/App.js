import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import QuizOptions from "./pages/QuizOptions";
//quizzes
import Quiz1 from "./pages/verbal_reasoning/Quiz";
import Quiz2 from "./pages/numerical/Quiz"
import Quiz3 from "./pages/situational_judgement/Quiz"
import Quiz4 from "./pages/deduction/Quiz"
import Quiz5 from "./pages/Big5/Quiz"
import Quiz6 from "./pages/stroop_test/Quiz"
import Quiz7 from "./pages/MBTI/Quiz"



function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={ <QuizOptions/>} />
        <Route path="/quiz/verbal_reasoning" element={<Quiz1/>} />
        <Route path="/quiz/numerical" element={<Quiz2/>}/>
        <Route path="/quiz/situational_judgement" element={<Quiz3/>}/>
        <Route path="/quiz/deduction" element={<Quiz4/>}/>
        <Route path="/quiz/big5" element={<Quiz5/>}/>
        <Route path="/quiz/stroop" element={<Quiz6/>}/>
        <Route path="/quiz/mbti" element={<Quiz7/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
